import { useState, useEffect } from "react";
import "./movieCollectionDetails.css";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { FaTrashAlt } from "react-icons/fa";
import { MdOutlineEdit } from "react-icons/md";

const MovieCollectionDetails = ({ user, add, setAdd }) => {
  const [errorMessage, setErrorMessage] = useState("");
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [editLoading, setEditLoading] = useState(false);
  const [edit, setEdit] = useState(false);
  const [userEdit, setUserEdit] = useState(null);
  const [asset, setAsset] = useState(null);
  const [addCol, setAddCol] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  const handleSubmit = async (e, index) => {
    e.preventDefault();
    setEditLoading(true);
    try {
      const response = await axios.put(
        `http://localhost:3000/user/collection/details/${index}`,
        { asset: userEdit.asset, comment: userEdit.comment },
        {
          headers: {
            Authorization: "Bearer " + user.token,
          },
        }
      );
      console.log("SubmitResponse", response.data);
      setEdit(false);
      setEditLoading(false);
    } catch (error) {
      console.log(error);
      setEditLoading(false);
    }
  };

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
        const response2 = await axios.get(
          "http://localhost:3000/user/favAsset",
          {
            headers: {
              Authorization: "Bearer " + user.token,
            },
          }
        );
        setAsset(response2.data);
        setAdd(!add);
        console.log("Response1", response.data);
        setData(response.data);
        const obj = {
          asset: response.data.result.asset,
          comment: response.data.result.comment,
        };
        setUserEdit(obj);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setErrorMessage("Une erreur est survenue veuillez");
      }
    };
    fetchData();
  }, [user, edit]);

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

  return !user ? (
    <div className="loading">Unauthorized</div>
  ) : isLoading ? (
    <div className="loading">Loading</div>
  ) : (
    <section>
      <div className="container">
        <form onSubmit={(e) => handleSubmit(e, data.index)}>
          <h1>Rangé dans : </h1>
          {!edit ? (
            <span>{data.result.asset}</span>
          ) : (
            <div>
              <label htmlFor="asset">Mettre de coté dans un dossier : </label>
              <select
                name="asset"
                value={!addCol ? userEdit.asset : "ajouter une collection"}
                onChange={(event) => {
                  if (event.target.value === "ajouter une collection") {
                    setAddCol(true);
                    const obj = { ...userEdit, asset: "" };
                    setUserEdit(obj);
                  } else {
                    const obj = { ...userEdit, asset: event.target.value };
                    setUserEdit(obj);
                  }
                }}
              >
                {asset.map((asset, index) => {
                  return (
                    <option value={asset} key={index}>
                      {asset}
                    </option>
                  );
                })}
                <option value={"ajouter une collection"} key={"+"}>
                  Ajouter une Collection
                </option>
              </select>
              {addCol && (
                <input
                  type="text"
                  name="asset"
                  id="asset"
                  placeholder="ma nouvelle collection"
                  onChange={(event) => {
                    const obj = { ...userEdit, asset: event.target.value };
                    setUserEdit(obj);
                  }}
                  value={userEdit.asset}
                />
              )}
            </div>
          )}

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
              !edit ? (
                <div>
                  <p>Mon commentaire :</p>
                  <p>{data.result.comment}</p>
                </div>
              ) : (
                <textarea
                  type="text"
                  placeholder="Ajouter un commentaire"
                  value={userEdit.comment}
                  onChange={(e) => {
                    const obj = { ...edit, comment: e.target.value };
                    setUserEdit(obj);
                  }}
                />
              )
            ) : (
              !data.result.comment &&
              edit && (
                <textarea
                  type="text"
                  placeholder="Ajouter un commentaire"
                  value={userEdit.comment}
                  onChange={(e) => {
                    const obj = { ...edit, comment: e.target.value };
                    setUserEdit(obj);
                  }}
                />
              )
            )}
            {edit && (
              <button disabled={editLoading ? true : false}>Editer</button>
            )}
          </div>
        </form>
      </div>
    </section>
  );
};

export default MovieCollectionDetails;
