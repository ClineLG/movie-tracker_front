import { useLocation } from "react-router-dom";
import "./allMovies.css";
import { useEffect, useState } from "react";
import axios from "axios";
import AllMoviesComponent from "../../Components/AllmoviesComponent/AllMoviesComponent";

const Allmovies = () => {
  const location = useLocation();
  const { from } = location.state;
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);
  const [page, setPage] = useState(1);

  console.log(from);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/movies/${from}/?page=${page}`
        );
        console.log(response.data);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [page]);

  return isLoading ? (
    <div className="loading">Loading</div>
  ) : (
    <section>
      <div>
        <h1>
          Les films{" "}
          {from === "pop"
            ? "Populaires"
            : from === "upComing"
            ? "Bientôt en Salle"
            : "A l'affiche"}
        </h1>
        <AllMoviesComponent data={data} />
      </div>
    </section>
  );
};

export default Allmovies;
