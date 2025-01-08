import "./movieDetailsCard.css";
const MovieDetailsCard = ({ data }) => {
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
  } = data;
  console.log(production_companies);
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
      <p>réalisé le {release_date}</p>
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
      <p>durée : {runtime}min</p>
      <div>
        <p>budget pour le film : {budget} ＄</p>
        {revenue !== 0 && <p>recette du film : {revenue} ＄</p>}
      </div>
    </div>
  );
};

export default MovieDetailsCard;
