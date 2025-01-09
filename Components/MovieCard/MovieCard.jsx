import { Link } from "react-router-dom";
import axios from "axios";
import "./movieCard.css";
import { useEffect, useState } from "react";

const MovieCard = ({ content }) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchdata = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/movies/${content}/?page=${
            content === "playing" ? 2 : 1
          }`
        );
        setData(response.data.results);
        console.log(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchdata();
  }, []);
  return isLoading ? (
    <div className="loading">Loading</div>
  ) : (
    <div className="movies-container">
      {data.map((movie, index) => {
        return (
          <Link to={`/details/${movie.id}`} className="MovieCard" key={index}>
            <img src={"https://image.tmdb.org/t/p/w500" + movie.poster_path} />
            <h2>{movie.title}</h2>
          </Link>
        );
      })}
    </div>
  );
};

export default MovieCard;
