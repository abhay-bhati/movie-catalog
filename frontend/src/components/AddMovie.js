import React, { useState } from "react";
import "../styles/AddMovie.css";

function AddMovie() {
  let thumbUrl;
  let vidUrl;
  const [name, setName] = useState("");
  const [year, setYear] = useState("");
  const [lang, setLang] = useState("");
  const [nameIsValid, setNameIsValid] = useState(false);
  const [yearIsValid, setYearIsValid] = useState(false);
  const [langIsValid, setLangIsValid] = useState(false);
  const [thumbnailSelected, setThumbnailSelected] = useState("");
  const [videoSelected, setVideoSelected] = useState("");
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [videoUrl, setVideoUrl] = useState("");

  const nameChangeHandler = (event) => {
    console.log(event.target.value);
    setName(event.target.value);
    if (event.target.value.length > 0) {
      setNameIsValid(true);
    } else {
      setNameIsValid(false);
    }
  };

  const yearChangeHandler = (event) => {
    console.log(event.target.value);
    setYear(event.target.value);
    const re = /^([0-9]{4})$/;
    if (re.test(event.target.value)) {
      setYearIsValid(true);
    } else {
      setYearIsValid(false);
    }
  };

  const langChangeHandler = (event) => {
    console.log(event.target.value);
    setLang(event.target.value);
    if (event.target.value.length > 2) {
      setLangIsValid(true);
    } else {
      setLangIsValid(false);
    }
  };

  const thumbnailUpload = (event) => {
    setThumbnailSelected(event.target.files[0]);
    console.log(event.target.files[0]);
  };

  const videoUpload = (event) => {
    console.log(event.target.files[0]);
    setVideoSelected(event.target.files[0]);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const imageformData = new FormData();
    imageformData.append("file", thumbnailSelected);
    imageformData.append("upload_preset", "mka3qi9s");
    imageformData.append("folder", "thumbnail");
    const videoformData = new FormData();
    videoformData.append("file", videoSelected);
    videoformData.append("upload_preset", "mka3qi9s");
    videoformData.append("folder", "videofile");
    console.log("submit");
    fetch("https://api.cloudinary.com/v1_1/dzhx3xd61/image/upload", {
      method: "POST",
      body: imageformData,
    })
      .then((res) => {
        console.log("1");
        res
          .json()
          .then((data) => {
            console.log(data);
            setThumbnailUrl(data.url);
            thumbUrl = data.url;
            return fetch(
              "https://api.cloudinary.com/v1_1/dzhx3xd61/video/upload",
              {
                method: "POST",
                body: videoformData,
              }
            );
          })
          .then((res) => {
            console.log("2");
            res
              .json()
              .then((data) => {
                console.log(data);
                setVideoUrl(data.url);
                vidUrl = data.url;
                return fetch("http://localhost:8000/api/movie", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    name: name,
                    year: year,
                    language: lang,
                    thumbnail: thumbUrl,
                    video: vidUrl,
                  }),
                });
              })
              .then((res) => {
                console.log("3");
                res.json().then((data) => {
                  console.log("hererhere");
                  console.log(data);
                });
              })
              .catch((err) => {
                console.log("3 error");
                console.log(err);
              });
          })
          .catch((err) => {
            console.log("2 error");
            console.log(err);
          });
      })
      .catch((err) => {
        console.log("1 error");
        console.log(err);
      });
  };
  return (
    <div className="addmovie">
      <form className="addmovieform">
        <div>
          <label htmlFor="name">Movie Name :</label>
          <input type="text" name="name" onChange={nameChangeHandler} />
        </div>
        <div>
          <label htmlFor="year">Year of Release :</label>
          <input type="text" name="year" onChange={yearChangeHandler} />
        </div>
        <div>
          <label htmlFor="language">Language :</label>
          <input type="text" name="language" onChange={langChangeHandler} />
        </div>
        <div>
          <label htmlFor="thumbnail">Add Thumbnail :</label>
          <input type="file" name="thumbnail" onChange={thumbnailUpload} />
        </div>
        <div>
          <label htmlFor="video">Upload Video :</label>
          <input type="file" name="video" onChange={videoUpload} />
        </div>
        <div className="addmovieform__btn">
          <button type="submit" onClick={submitHandler}>
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddMovie;
