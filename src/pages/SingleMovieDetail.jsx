import React from "react";
import { API_KEY } from "../contants";
import axios from "axios";
import { useLoaderData } from "react-router-dom";
import styles from "./SingleMovieDetail.module.css";

export async function loader(args) {
  const imdbID = args.params.imdbId;
  const URL = `https://www.omdbapi.com/?i=${imdbID}&plot=full&apiKey=${API_KEY}`;
  try {
    const response = await axios.get(URL);
    console.log(response);
    return { singleMovie: response.data, isError: null, error: "" };
  } catch (error) {
    const errorMessage =
      error.message || error.response.data.Error || "Something went wrong";
    console.error(errorMessage);
    return { singleMovie: null, isError: true, error: errorMessage };
  }
}

function SingleMovieDetail() {
  const { singleMovie, isError, error } = useLoaderData();
  console.log(singleMovie);
  if (singleMovie && singleMovie.Response === "False") {
    return <h1>{singleMovie.Error}</h1>;
  }
  if (isError) {
    return <h1>{error}</h1>;
  }
  return (
    <div className={`container ${styles.movieDetail}`}>
      <div className={styles.infoOnLeft}>
        <h2>{singleMovie.Title}</h2>
        <img src={singleMovie.Poster} alt={singleMovie.Title} />

        <p className={styles.infoPara}>
          <span className={styles.key}>Release Date </span>
          <span className={styles.value}>{singleMovie.Released}</span>
        </p>
        <p className={styles.infoPara}>
          <span className={styles.key}> Genre </span>
          <span className={styles.value}> {singleMovie.Genre}</span>
        </p>
        <p className={styles.infoPara}>
          <span className={styles.key}>Runtime </span>
          <span className={styles.value}> {singleMovie.Runtime}</span>
        </p>
        <p className={styles.infoPara}>
          <span className={styles.key}>Language </span>
          <span className={styles.value}>{singleMovie.Language}</span>
        </p>

        <p className={styles.infoPara}>
          <span className={styles.key}>Awards </span>
          <span className={styles.value}> {singleMovie.Awards}</span>
        </p>
      </div>
      <div className={styles.infoOnright}>
        <div className='plot'>
          <div className={styles.bigInfo}>
            <h3>Plot</h3>
            <p>{singleMovie.Plot}</p>
          </div>
          <div className={styles.bigInfo}>
            <h3>Actors</h3>
            <p>{singleMovie.Actors}</p>
          </div>
          <div className={styles.bigInfo}>
            <h3>Country</h3>
            <p>{singleMovie.Country}</p>
          </div>
          <h2>More Info</h2>
          <p className={styles.infoPara}>
            <span className={styles.key}>Director </span>
            <span className={styles.value}>{singleMovie.Director}</span>
          </p>
          <p className={styles.infoPara}>
            <span className={styles.key}>imdb Rating </span>
            <span className={styles.value}>{singleMovie.imdbRating}</span>
          </p>
          <p className={styles.infoPara}>
            <span className={styles.key}>imdb Votes </span>
            <span className={styles.value}>{singleMovie.imdbVotes}</span>
          </p>
          <p className={styles.infoPara}>
            <span className={styles.key}>Boxoffice </span>
            <span className={styles.value}>{singleMovie.BoxOffice}</span>
          </p>
          <p className={styles.infoPara}>
            <span className={styles.key}>Metascore</span>
            <span className={styles.value}>{singleMovie.Metascore}</span>
          </p>
          <p className={styles.infoPara}>
            <span className={styles.key}>Rated</span>
            <span className={styles.value}>{singleMovie.Rated}</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SingleMovieDetail;
