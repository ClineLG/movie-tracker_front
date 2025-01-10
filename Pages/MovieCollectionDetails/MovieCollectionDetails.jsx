import { useState, useEffect } from "react";
import "./movieCollectionDetails.css";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { FaTrashAlt } from "react-icons/fa";
import { MdOutlineEdit } from "react-icons/md";

const MovieCollectionDetails = ({ user }) => {
  const [errorMessage, setErrorMessage] = useState("");
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [edit, setEdit] = useState(false);
  const [userEdit, setUserEdit] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/user/collection/details/${id}`,
          {
            headers: {
              Authorization: "Bearer " + user.token,
            },
          }
        );
        console.log(response.data);
        setData(response.data);
        const obj = {
          asset: response.data.result.asset,
          comment: response.data.result.comment,
        };
        setEdit(obj);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setErrorMessage("Une erreur est survenue veuillez");
      }
    };
    fetchData();
  }, [user]);

  const handleDelete = async (index) => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/user/collection/details/${index}`,
        {
          headers: {
            Authorization: "Bearer " + user.token,
          },
        }
      );
      navigate("/myMovies");
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  return !user ? (
    <div className="loading">Unauthorized</div>
  ) : isLoading ? (
    <div className="loading">Loading</div>
  ) : (
    <section>
      <div className="container">
        <form onSubmit={(e) => handleSubmit(e)}>
          <h1>Rangé dans : </h1>
          <input
            type="text"
            value={edit.asset}
            onChange={(e) => {
              if (edit) {
                const obj = { ...edit, asset: e.target.value };
                setEdit(obj);
              } else {
                null;
              }
            }}
          />
          <div>
            <h1> {data.result.movie.title}</h1>
            <FaTrashAlt
              onClick={() => {
                handleDelete(data.index);
              }}
            />
            <MdOutlineEdit
              onClick={() => {
                setEdit(true);
              }}
            />
            {data.result.movie.original_title !== data.result.movie.title && (
              <p>{data.result.movie.original_title}</p>
            )}
            {data.result.movie.tagline && <p>{data.result.movie.tagline}</p>}
            <img src={data.result.movie.poster} alt={data.result.movie.title} />
            <div>
              {data.result.movie.genres.map((genre) => {
                return <p key={genre.id}>{genre.name}</p>;
              })}
            </div>
            <p>Sortie le {data.result.movie.release_date}</p>
            <div>
              <p>Produit par</p>
              {data.result.movie.production_companies.map((prod) => {
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
            <p>{data.result.movie.overview}</p>
            {data.result.movie.runtime !== 0 && (
              <p>durée : {data.result.movie.runtime}min</p>
            )}
            <div>
              {data.result.movie.budgete !== 0 && (
                <p>budget pour le film : {data.result.movie.budget}＄</p>
              )}
              {data.result.movie.revenue !== 0 && (
                <p>recette du film : {data.result.movie.revenue} ＄</p>
              )}
            </div>
            {data.result.comment ? (
              <input
                type="text"
                value={!edit ? data.result.comment : edit.comment}
              />
            ) : (
              <textarea
                type="text"
                value={!edit ? "ajouter un commentaire ?" : edit.comment}
                onChange={(e) => {
                  if (edit) {
                    const obj = { ...edit, comment: e.target.comment };
                    setEdit(obj);
                  } else {
                    null;
                  }
                }}
              />
            )}
            {edit && <button>Editer</button>}
          </div>
        </form>
      </div>
    </section>
  );
};

export default MovieCollectionDetails;
