import React, { useEffect, useState } from "react";
import SingleMovie from "./SingleMovie";
import "../styles/Movies.css";
import ReactPaginate from "react-paginate";

function Movies() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [pageNumber, setPageNumber] = useState(0);
  const [pageCount, setPageCount] = useState("");
  const moviesPerPage = 8;
  const pagesVisited = pageNumber * moviesPerPage;

  useEffect(() => {
    fetch("http://localhost:8000/api/movie")
      .then((res) => {
        res.json().then((data) => {
          console.log("data movies");
          console.log(data);

          setMovies(data);
          setPageCount(Math.ceil(movies.length / moviesPerPage));
          setIsLoading(false);
        });
      })
      .catch((err) => console.log(err));
  }, [pageCount, pageNumber]);

  // const pageCount = Math.ceil(movies, moviesPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  console.log(pageCount);
  return (
    <>
      {isLoading && (
        <p style={{ textAlign: "center", marginTop: "30px" }}>Loading...</p>
      )}
      {!isLoading && (
        <div className="movies">
          {movies
            .slice(pagesVisited, pagesVisited + moviesPerPage)
            .map((element) => (
              <SingleMovie key={element._id} movie={element} />
            ))}
        </div>
      )}
      {!isLoading && (
        <ReactPaginate
          nextLabel="Next"
          previousLabel="Prev"
          pageCount={pageCount}
          onPageChange={changePage}
          containerClassName="paginationBtns"
          nextClassName="nextBtn"
          previousClassName="prevBtn"
          previousLinkClassName="prevPaginationBtn"
          nextLinkClassName="nextPaginationBtn"
          disabledClassName="paginationDisabled"
          activeClassName="paginationActive"
        />
      )}
    </>
  );
}

export default Movies;
