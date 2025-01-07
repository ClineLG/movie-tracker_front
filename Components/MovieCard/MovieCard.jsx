import { Link } from "react-router-dom";
import "./movieCard.css";

const MovieCard = ({ data }) => {
  return (
    <div className="movies-container">
      {data.map((movie, index) => {
        return (
          <Link
            to="/details"
            state={{ from: movie.id }}
            className="MovieCard"
            key={index}
          >
            <img src={"https://image.tmdb.org/t/p/w500" + movie.poster_path} />
            <h2>{movie.title}</h2>
          </Link>
        );
      })}
    </div>
  );
};

export default MovieCard;
