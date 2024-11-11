//axios package: for sending HTTP request from front-end to backend
const axios = require("axios");
const HttpError = require("../models/http-error");

const API_KEYS = process.env.GOOGLE_API_KEY;

async function getCoordsForAddress(address) {
  //encodeURIComponent() will encode input into URL friendly format
  const response = await axios.get(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
      address
    )}&key=${API_KEYS}`
  );

  const data = response.data;

  if (!data || data.status === "ZERO_RESULTS") {
    const error = new HttpError(
      "Could not find a location for the specified address",
      422
    );

    throw error;
  }

  const coordinates = data.results[0].geometry.location;

  return coordinates;
}

module.exports = getCoordsForAddress;
