const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const movieSchema = Schema({
  name: {
    type: String,
    require: true,
  },
  year: {
    type: String,
    required: true,
  },
  language: {
    type: String,
    required: true,
  },
  thumbnail: {
    type: String,
  },
  video: {
    type: String,
  },
});

module.exports = mongoose.model("Movie", movieSchema);
