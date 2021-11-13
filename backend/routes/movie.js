const express = require("express");
const router = express.Router();
const Movie = require("../model/Movie");

router.post("/", (req, res) => {
  console.log(req.body);
  console.log(req.body.year);
  const year = new Date(req.body.year).getFullYear();
  console.log(year);
  console.log("yuuddhhdhdhd");
  console.log(typeof year);
  const newMovie = new Movie({
    name: req.body.name,
    language: req.body.language,
    year: year,
    thumbnail: req.body.thumbnail,
    video: req.body.video,
  });
  console.log(newMovie);
  newMovie.save().then((movie) => {
    console.log(movie);
    res.json({ movie: movie });
  });
});

router.get("/", (req, res) => {
  console.log("get /");
  Movie.find().then((movies) => {
    if (!movies) {
      console.log("no movies found");
      return res.json({ nomovies: "no movies found" });
    }
    res.json(movies);
  });
});

module.exports = router;
