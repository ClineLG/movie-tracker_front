import "./movieDetailsCard.css";
const MovieDetailsCard = ({ data }) => {
  const {
    budget,
    genres,
    origin_title,
    overview,
    poster_path,
    production_companies,

    release_date,
    revenue,
    runtime,
  } = data;
  console.log(production_companies);
  return (
    <div>
      <h1>{data.belongs_to_collection.name}</h1>
      <p>{origin_title}</p>
      <img
        src={"https://image.tmdb.org/t/p/w500" + poster_path}
        alt={data.belongs_to_collection.name}
      />
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
        <p>recette du film : {revenue} ＄</p>
      </div>
    </div>
  );
};

export default MovieDetailsCard;
