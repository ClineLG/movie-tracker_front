import "./allMoviesComponent.css";
import whatIsTheCategory from "../../utils/whatIsTheCategory";
import { Link } from "react-router-dom";
const AllMoviesComponent = ({ data }) => {
  return (
    <div>
      {data.results.map((movie) => {
        return (
          <Link
            to="/details"
            state={{ from: movie.id }}
            className="MovieCard"
            key={movie.id}
          >
            <img src={"https://image.tmdb.org/t/p/w500" + movie.poster_path} />
            <h2>{movie.title}</h2>
            <div>
              {movie.genre_ids.map((category) => {
                return <p key={category}>{whatIsTheCategory(category)}</p>;
              })}
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default AllMoviesComponent;
