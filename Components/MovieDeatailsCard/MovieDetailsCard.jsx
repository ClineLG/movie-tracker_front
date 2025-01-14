import "./movieDetailsCard.css";
import UserContext from "../../Context/UserContext";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
const MovieDetailsCard = ({ data }) => {
  const { setDataMovie, pageFunc } = useContext(UserContext);
  const navigate = useNavigate();
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
    <div className="carddetails">
      <h1> {title}</h1>
      {original_title !== title && <p className="center">{original_title}</p>}
      {tagline && <p className="tagline">{tagline}</p>}
      <img src={"https://image.tmdb.org/t/p/w500" + poster_path} alt={title} />
      <div className="genre">
        {genres.map((genre) => {
          return (
            <div
              key={genre.id}
              onClick={() => {
                pageFunc(1);
                navigate(`/all/${genre.id}`);
              }}
            >
              <p className="genrep">{genre.name}</p>
            </div>
          );
        })}
      </div>
      <p className="sortie">
        <span>Sortie :</span> {release_date}
      </p>
      <span className="left">Produit par : </span>
      <div className="flex">
        {production_companies.map((prod) => {
          return (
            <div key={prod.name} className="prod">
              {prod.logo_path && (
                <img
                  src={"https://image.tmdb.org/t/p/w500" + prod.logo_path}
                  alt={prod.name}
                />
              )}

              <p>{prod.name}</p>
            </div>
          );
        })}
      </div>
      {overview && (
        <>
          <span className="left">Synopsis :</span>
          <p>{overview}</p>
        </>
      )}

      <div className="left endLine">
        {runtime !== 0 && (
          <p>
            <span>durée : </span>
            {runtime}min
          </p>
        )}
        {budget !== 0 && (
          <p>
            <span>budget : </span>
            {budget} ＄
          </p>
        )}
        {revenue !== 0 && (
          <p>
            <span>recette : </span>
            {revenue} ＄
          </p>
        )}
      </div>
    </div>
  );
};

export default MovieDetailsCard;
