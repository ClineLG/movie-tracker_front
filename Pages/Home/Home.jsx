import "./home.css";
import axios from "axios";
import { useState, useEffect } from "react";
import movies from "../../movie.json";
import category from "../../categories.json";
import MovieCard from "../../Components/MovieCard/MovieCard";
import { Link, useNavigate } from "react-router-dom";
import img from "../../src/assets/img/hero.jpg";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

const Home = ({ pageFunc }) => {
  const navigate = useNavigate();

  return (
    <section className="home">
      <div className="hero">
        <img src={img} />
        <div>
          <p>
            Retrouvez vos films facilement, gérez vos collections et ne perdez
            plus jamais de vue ce que vous vouliez regarder.
          </p>
          <Link to="/signup" state={{ from: "/" }} className="button">
            Créer mon compte
          </Link>
        </div>
      </div>
      <div className="container">
        <div className="genre">
          <h1>Envie d'un genre en particulier?</h1>

          <div className="genres-container">
            {category.genres.map((cat) => {
              return (
                cat.id !== 0 && (
                  <div
                    key={cat.id}
                    onClick={() => {
                      pageFunc(1);

                      navigate(`/all/${cat.id}`);
                    }}
                  >
                    <p className="genrep">{cat.name}</p>
                  </div>
                )
              );
            })}
          </div>
        </div>
        <h1>Les films Populaires</h1>
        <MovieCard content={"pop"} />
        <div
          onClick={() => {
            pageFunc(1);

            navigate(`/all/pop`);
          }}
          className="buttonall"
        >
          Voir tous les films populaire
        </div>

        <h1>Les films à l'affiche</h1>
        <MovieCard content={"playing"} />

        <div
          onClick={() => {
            pageFunc(1);

            navigate(`/all/playing`);
          }}
          className="buttonall"
        >
          Voir tous les films à l'affiche
        </div>
        <h1>Les prochaines sorties</h1>
        <MovieCard content={"upComing"} />
        <div
          onClick={() => {
            pageFunc(1);

            navigate(`/all/upComing`);
          }}
          className="buttonall"
        >
          Voir tous les films bientot en salle
        </div>
      </div>
    </section>
  );
};

export default Home;
