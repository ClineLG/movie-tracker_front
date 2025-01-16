import { useState, useEffect } from "react";
import "./movieCollectionDetails.css";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { FaTrashAlt } from "react-icons/fa";
import { MdOutlineEdit } from "react-icons/md";

const MovieCollectionDetails = ({ user, add, setAdd, pageFunc }) => {
  const [errorMessage, setErrorMessage] = useState("");
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [editLoading, setEditLoading] = useState(false);
  const [edit, setEdit] = useState(false);
  const [userEdit, setUserEdit] = useState({ asset: "", comment: "" });
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
        `hhttps://site--moviestracker--dm4qbjsg7dww.code.run/user/collection/details/${index}`,
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
    <div className="loader"></div>
  ) : (
    <section>
      <div className="container my-movie">
        <form onSubmit={(e) => handleSubmit(e, data.index)}>
          <div className="top">
            <h1 className="collect">
              Rangé dans <span> {data.result.asset}</span>
            </h1>

            <div className="edit-buttons">
              <MdOutlineEdit
                className="ed"
                onClick={() => {
                  setEdit(!edit);
                }}
              />
              <FaTrashAlt
                className="ed"
                onClick={() => {
                  handleDelete(data.index);
                }}
              />
            </div>
          </div>
          {edit && (
            <div className="edit">
              <div>
                <label htmlFor="asset">Déplacer vers : </label>
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
                    Nouvelle collection
                  </option>
                </select>
              </div>

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
          <div className="carddetails">
            <h1> {data.result.movie.title}</h1>
            {data.result.movie.original_title !== data.result.movie.title && (
              <p className="center">{data.result.movie.original_title}</p>
            )}
            {data.result.movie.tagline && (
              <p className="tagline">{data.result.movie.tagline}</p>
            )}
            <img src={data.result.movie.poster} alt={data.result.movie.title} />
            <div className="genre">
              {data.result.movie.genres.map((genre) => {
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
              <span>Sortie : </span> {data.result.movie.release_date}
            </p>
            <span className="left">Produit par :</span>
            <div className="flex">
              {data.result.movie.production_companies.map((prod) => {
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
            {data.result.movie.overview && (
              <>
                <span className="left">Synopsis :</span>
                <p>{data.result.movie.overview}</p>
              </>
            )}

            <div className="left endLine">
              {data.result.movie.runtime !== "0" && (
                <p>durée : {data.result.movie.runtime}min</p>
              )}

              {data.result.movie.budget !== "0" && (
                <p>budget : {data.result.movie.budget}＄</p>
              )}
              {data.result.movie.revenue !== "0" && (
                <p>recette : {data.result.movie.revenue} ＄</p>
              )}
            </div>

            {data.result.comment ? (
              !edit ? (
                <div className="left com">
                  <span>Mon commentaire :</span>
                  <p>{data.result.comment}</p>
                </div>
              ) : (
                <div className="left com">
                  <span>Mon commentaire :</span>
                  <textarea
                    type="text"
                    placeholder="Ajouter un commentaire"
                    value={userEdit.comment}
                    onChange={(e) => {
                      const obj = { ...userEdit, comment: e.target.value };
                      setUserEdit(obj);
                    }}
                  />
                </div>
              )
            ) : (
              !data.result.comment &&
              edit && (
                <div className="left com">
                  <span>Mon commentaire :</span>
                  <textarea
                    type="text"
                    placeholder="Ajouter un commentaire"
                    value={userEdit.comment}
                    onChange={(e) => {
                      const obj = { ...userEdit, comment: e.target.value };
                      setUserEdit(obj);
                    }}
                  />
                </div>
              )
            )}
            {edit && (
              <button
                className="buttonall"
                disabled={editLoading ? true : false}
              >
                Editer
              </button>
            )}
          </div>
        </form>
      </div>
    </section>
  );
};

export default MovieCollectionDetails;
