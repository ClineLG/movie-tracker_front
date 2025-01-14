import { useParams } from "react-router-dom";
import MovieDetailsCard from "../../Components/MovieDeatailsCard/MovieDetailsCard";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import "./movieDetails.css";
import UserContext from "../../Context/UserContext";
const MovieDetails = ({ setModalAddVisible, setModalConnectionVisible }) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const { id } = useParams();
  const { user } = useContext(UserContext);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://site--backend-movie-tracker--29w4cq6k8fjr.code.run/movies/${id}`
        );

        console.log(response.data);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return isLoading ? (
    <div className="loader"></div>
  ) : (
    <section className="details">
      <div className="container">
        <button
          onClick={() => {
            user ? setModalAddVisible(true) : setModalConnectionVisible(true);
          }}
          className="buttonall"
        >
          Ajouter à une collection
        </button>
        <MovieDetailsCard data={data} />
      </div>
    </section>
  );
};

export default MovieDetails;
