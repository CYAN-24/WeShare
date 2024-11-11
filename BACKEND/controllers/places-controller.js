const HttpError = require("../models/http-error");
const { v4: uuidv4 } = require("uuid");
const { validationResult } = require("express-validator");
const getCoordsForAddress = require("../util/location");
const Place = require("../models/place");
const User = require("../models/user");
const { default: mongoose } = require("mongoose");

// to unlink file
const fs = require("fs");

const getPlaceById = async (req, res, next) => {
  const placeId = req.params.pid;
  //   const place = DUMMY_PLACES.find((p) => p.id === placeId);

  let place;

  try {
    place = await Place.findById(placeId);
  } catch (err) {
    const error = new HttpError(
      // error display if our get request have some probs(if we have missing info)
      "Something went wrong, could not find a place.",
      500
    );
    return next(error);
  }

  if (!place) {
    //in case request is fine but we just dont have our place then second error is shown
    // return res
    //   .status(404)
    //   .json({ message: "Could not find a place for the provided id." });
    const error = new HttpError(
      "Could not find a place for the provided id.",
      404
    );
    return next(error);
  }

  // to turn place object into a normal JS object
  res.json({ place: place.toObject({ getters: true }) });
};

// router.get("/user/:uid", placesControllers.getPlacesByUserId);
const getPlacesByUserId = async (req, res, next) => {
  const userId = req.params.uid;

  //   const places = DUMMY_PLACES.filter((p) => p.creator === userId);
  let userWithPlaces;

  try {
    // for 'find()' w/o args it wont return a promise unless use 'find().exec()'
    // places = await Place.find({ creator: userId });
    userWithPlaces = await User.findById(userId).populate("places");
  } catch (err) {
    const error = new HttpError(
      "Fetching places failed, please try again later",
      500
    );
    return next(error);
  }

  // !places || places.length === 0
  if (!userWithPlaces || userWithPlaces.places.length === 0) {
    // use next for asynchronous while throw not synchronous code
    // code after next will still execute if no "return"
    return next(
      new HttpError("Could not find a places for the provided user id.", 404)
    );
  }

  res.json({
    places: userWithPlaces.places.map((p) => p.toObject({ getters: true })),
  });
};

const createPlace = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // for async code, throw will not work properly in Express, use next instead
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }

  const { title, description, address } = req.body;

  let coordinates;

  try {
    coordinates = await getCoordsForAddress(address);
  } catch (error) {
    return next(error);
  }

  const createdPlace = new Place({
    title,
    description,
    location: coordinates,
    image: req.file.path,
    address,
    creator: req.userData.userId,
  });

  let user;

  try {
    user = await User.findById(req.userData.userId);
  } catch (err) {
    const error = new HttpError("Creating place failed, please try again", 500);
    return next(error);
  }

  if (!user) {
    const error = new HttpError("Could not find user for provided id", 404);
    return next(error);
  }

  // Two things to do if user exist:
  // 1. save the createdPlace in places
  // 2. save the createdPlace in user
  try {
    // if need to do multiple operations, if any of them fails we want to undo all ops
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await createdPlace.save({ session: sess });
    // only add createdPlaceId
    user.places.push(createdPlace);
    await user.save({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    // error occurs when database server is down / data validation fails
    const error = new HttpError("Creating place failed, please try again", 500);
    return next(error);
  }

  // status 201 means sth created successfully in server
  res.status(201).json({ place: createdPlace });
};

const updatePlace = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new HttpError(
      "Invalid inputs passed, please check your data.",
      422
    );
    return next(error);
  }

  const placeId = req.params.pid;
  const { title, description } = req.body;

  //   const updatedPlace = { ...DUMMY_PLACES.find((p) => p.id === placeId) };
  //   const placeIndex = DUMMY_PLACES.findIndex((p) => p.id === placeId);
  let place;

  try {
    place = await Place.findById(placeId);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not update place",
      500
    );
    return next(error);
  }

  // Although frontend wont provide edit & delete button for unauthorized users
  // user still able to operate using Postman, thats why following code is needed
  // place.creator returns obj, thus need to convert to String
  if (place.creator.toString() !== req.userData.userId) {
    const error = new HttpError("You are not allowed to edit this place.", 401);
    return next(error);
  }

  place.title = title;
  place.description = description;

  try {
    await place.save();
  } catch (err) {
    return next(error(("Couldn't save place!", 500)));
  }

  res.status(200).json({ place: place.toObject({ getters: true }) });
};

const deletePlace = async (req, res, next) => {
  const placeId = req.params.pid;

  let place;

  try {
    // population is to access content of different collection
    place = await Place.findById(placeId).populate("creator");
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not delete place",
      500
    );
    return next(error);
  }

  if (!place) {
    const error = new HttpError("Could not find place for this id.", 404);
    return next(error);
  }

  if (place.creator.id !== req.userData.userId) {
    const error = new HttpError(
      "You are not allowed to delete this place.",
      401
    );
    return next(error);
  }

  const imagePath = place.image;

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await place.deleteOne({ session: sess });
    place.creator.places.pull(place.id);
    await place.creator.save({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not delete place",
      500
    );
    return next(error);
  }

  fs.unlink(imagePath, (err) => {});

  res.status(200).json({ message: "Deleted place." });
};

exports.getPlaceById = getPlaceById;
exports.getPlacesByUserId = getPlacesByUserId;
exports.createPlace = createPlace;
exports.updatePlace = updatePlace;
exports.deletePlace = deletePlace;
