import "./allMoviesComponent.css";
import { Link } from "react-router-dom";
const AllMoviesComponent = ({ data }) => {
  return (
    <div className="wrap">
      {data.results.map((movie) => {
        return (
          <Link
            to={`/details/${movie.id}`}
            className="MovieCard"
            key={movie.id}
          >
            <img src={"https://image.tmdb.org/t/p/w500" + movie.poster_path} />
            <h2>{movie.title}</h2>
          </Link>
        );
      })}
    </div>
  );
};

export default AllMoviesComponent;
