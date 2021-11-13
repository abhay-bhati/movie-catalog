import React from "react";
import "../styles/SingleMovie.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";

function SingleMovie(props) {
  const thumbnailClickHandler = () => {
    console.log("clicked");
    window.location.href = props.movie.video;
  };
  return (
    <div className="singlemovie" onClick={thumbnailClickHandler}>
      <img src={props.movie.thumbnail} />
      <FontAwesomeIcon icon={faPlay} className="singlemovie__playbtn" />
      <div className="singlemovie__info">
        <div className="singlemovie__title">
          {props.movie.name}, {props.movie.year}
        </div>
        <div className="singlemovie__lang">{props.movie.language}</div>
      </div>
    </div>
  );
}

export default SingleMovie;
