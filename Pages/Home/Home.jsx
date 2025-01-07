import "./home.css";
import axios from "axios";
import { useState, useEffect } from "react";
import movies from "../../movie.json";
import MovieCard from "../../Components/MovieCard/MovieCard";
import { Link } from "react-router-dom";
const Home = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  useEffect(() => {
    const fetchdata = async () => {
      setData(movies);
      setIsLoading(false);
      // try {
      //   const response = await axios.get(
      //     `http://localhost:3000/movies/?page=${page}`
      //   );
      //   setData(response.data);
      //   console.log(response.data);
      //   setIsLoading(false);
      // } catch (error) {
      //   console.log(error);
      // }
    };
    fetchdata();
  }, [page]);

  return isLoading ? (
    <div className="loading">Loading</div>
  ) : (
    <section>
      <div className="container">
        <div>
          <p>
            chercher un film, le garder en memoire, gérer ses films, ne perdez
            plus de temps
          </p>
          <button>Register</button>
        </div>
        <div>
          <h1>envie d'un genre en particulier?</h1>
          {/* map genres/fonction tab */}
        </div>
        <h1>Les films Populaires</h1>
        <MovieCard data={data.results} />
        <Link to={"/all"} state={{ from: "pop" }}>
          Voir tous les films populaire
        </Link>
        <h1>Les films à l'affich</h1>
        <MovieCard data={data.results} />
        <Link to={"/all"} state={{ from: "playing" }}>
          Voir tous les films à l'affiche
        </Link>
        <h1>Les prochaines sorties</h1>
        <MovieCard data={data.results} />
        <Link to={"/all"} state={{ from: "upComing" }}>
          Voir tous les films à l'affiche
        </Link>
      </div>
    </section>
  );
};

export default Home;
