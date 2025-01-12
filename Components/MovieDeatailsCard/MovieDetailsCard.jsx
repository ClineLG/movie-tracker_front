import "./movieDetailsCard.css";
import UserContext from "../../Context/UserContext";
import { useContext, useEffect } from "react";
const MovieDetailsCard = ({ data }) => {
  const { setDataMovie } = useContext(UserContext);

  const {
    budget,
    genres,
    original_title,
    overview,
    poster_path,
    production_companies,
    title,
    release_date,
    tagline,
    revenue,
    runtime,
    id,
  } = data;

  useEffect(() => {
    const obj = {
      budget: budget,
      genres: genres,
      original_title: original_title,
      overview: overview,
      poster: "https://image.tmdb.org/t/p/w500" + poster_path,
      production_companies: production_companies,
      title: title,
      release_date: release_date,
      revenue: revenue,
      tagline: tagline,
      runtime: runtime,
      id: id,
    };
    setDataMovie(obj);
  }, []);

  return (
    <div>
      <h1> {title}</h1>

      {original_title !== title && <p>{original_title}</p>}
      {tagline && <p>{tagline}</p>}
      <img src={"https://image.tmdb.org/t/p/w500" + poster_path} alt={title} />
      <div>
        {genres.map((genre) => {
          return <p key={genre.id}>{genre.name}</p>;
        })}
      </div>
      <p>Sortie le {release_date}</p>
      <div>
        <p>Produit par</p>
        {production_companies.map((prod) => {
          return (
            <div key={prod.name}>
              <img
                src={"https://image.tmdb.org/t/p/w500" + prod.logo_path}
                alt={prod.name}
              />
              <span>{prod.name}</span>
            </div>
          );
        })}
      </div>

      <p>{overview}</p>
      {runtime !== 0 && <p>durée : {runtime}min</p>}
      <div>
        {budget !== 0 && <p>budget pour le film : {budget} ＄</p>}
        {revenue !== 0 && <p>recette du film : {revenue} ＄</p>}
      </div>
    </div>
  );
};

export default MovieDetailsCard;
