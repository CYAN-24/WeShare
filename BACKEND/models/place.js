const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const placeSchema = new Schema({
  // id not needed because it will created automatically by MongoDB when we store a document
  title: { type: String, required: true },
  description: { type: String, required: true },
  location: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
  },
  image: { type: String, required: true },
  address: { type: String, required: true },
  creator: { type: mongoose.Types.ObjectId, required: true, ref: "User" },
});

// first arg: Name of this file with capital letter, singular
// places will be the collection name
module.exports = mongoose.model("Place", placeSchema);
