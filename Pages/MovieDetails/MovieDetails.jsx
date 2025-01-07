import { useLocation } from "react-router-dom";
import MovieDetailsCard from "../../Components/MovieDeatailsCard/MovieDetailsCard";
import { useEffect, useState } from "react";
import axios from "axios";
import "./movieDetails.css";
import movie from "../../exempleMovie.json";
const MovieDetails = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  const { from } = location.state;
  //   console.log(from);
  useEffect(() => {
    const fetchData = async () => {
      setData(movie);
      setIsLoading(false);
      //   try {
      //     const response = await axios.get(
      //       `http://localhost:3000/movies/${from}`
      //     );

      //     console.log(response.data);
      //     setData(response.data);
      //     setIsLoading(false);
      //   } catch (error) {
      //     console.log(error);
      //   }
    };
    fetchData();
  }, []);

  return isLoading ? (
    <div className="loading">Loading</div>
  ) : (
    <section>
      <div className="container">
        {console.log(data)}
        <MovieDetailsCard data={data} />
      </div>
    </section>
  );
};

export default MovieDetails;
