import "./home.css";
import axios from "axios";
import { useState, useEffect } from "react";
import movies from "../../movie.json";
import category from "../../categories.json";
import MovieCard from "../../Components/MovieCard/MovieCard";
import { Link, useNavigate } from "react-router-dom";
const Home = () => {
  const navigate = useNavigate();

  return (
    <section className="home">
      <div className="container">
        <div className="hero">
          <p>
            chercher un film, le garder en memoire, gérer ses films, ne perdez
            plus de temps
          </p>
          <Link to="/signup" state={{ from: "/" }}>
            Register
          </Link>
        </div>
        <div>
          <h1>envie d'un genre en particulier?</h1>
          <div>
            {category.genres.map((cat) => {
              return (
                cat.id !== 0 && (
                  <Link to={`/all/${cat.id}`} key={cat.id}>
                    {cat.name}{" "}
                  </Link>
                )
              );
            })}
          </div>
        </div>
        <h1>Les films Populaires</h1>
        <MovieCard content={"pop"} />
        <Link to={"/all/pop"}>Voir tous les films populaire</Link>
        <h1>
          Les films à l'affich
          {}
        </h1>
        <MovieCard content={"playing"} />
        <Link to={"/all/playing"}>Voir tous les films à l'affiche</Link>
        <h1>Les prochaines sorties</h1>
        <MovieCard content={"upComing"} />
        <Link to={"/all/upComing"}>Voir tous les films bientot en salle</Link>
      </div>
    </section>
  );
};

export default Home;
