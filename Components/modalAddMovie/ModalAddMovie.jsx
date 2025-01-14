import "./modal-add.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
const ModalAddMovie = ({
  setModalAddVisible,
  dataMovie,
  user,
  add,
  setAdd,
}) => {
  console.log("dataMovie", dataMovie);

  const [asset, setAsset] = useState("");
  const [comment, setComment] = useState("");
  const [AddIsLoading, setAddIsLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [done, setDone] = useState(false);
  const [assetCol, setAssetCol] = useState(null);
  const [addCol, setAddCol] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://site--backend-movie-tracker--29w4cq6k8fjr.code.run/user/favAsset",
          {
            headers: {
              Authorization: "Bearer " + user.token,
            },
          }
        );
        setAssetCol(response.data);
        setAdd(!add);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      let assettoSend = "";
      if (!asset) {
        assettoSend = assetCol[0];
      } else {
        assettoSend = asset;
      }
      setIsLoading(true);
      const response = await axios.put(
        `https://site--backend-movie-tracker--29w4cq6k8fjr.code.run/user/addMovie`,
        { movie: dataMovie, comment: comment, asset: assettoSend },
        {
          headers: {
            Authorization: "Bearer " + user.token,
          },
        }
      );
      console.log(response.data);
      setIsLoading(false);
      setDone(true);
    } catch (error) {
      setErrorMessage("une erreure est survenue veuillez réessayer");
      console.log(error);
    }
  };
  return isLoading ? (
    <div className="loader"></div>
  ) : (
    <section className="modal">
      <div className="modalContent">
        <button
          onClick={() => {
            setModalAddVisible(false);
          }}
          className="button"
        >
          X
        </button>
        {done ? (
          <div className="result">
            <p className="center">Ajouté avec succés à vos collections !</p>
            <Link to={"/myMovies"} className="buttonall">
              Voir mes Collections
            </Link>
          </div>
        ) : (
          <form
            onSubmit={(event) => {
              handleSubmit(event);
            }}
          >
            <div className="modal-collection">
              <label htmlFor="asset">Ajouter à une collection : </label>
              <select
                name="asset"
                value={!addCol ? asset : "ajouter une collection"}
                onChange={(event) => {
                  if (event.target.value === "ajouter une collection") {
                    setAddCol(true);
                    setAsset("");
                  } else {
                    console.log("coucou", asset, event.target.value);
                    setAsset(event.target.value);
                  }
                }}
              >
                {assetCol.map((asset, index) => {
                  return (
                    <option value={asset} key={index}>
                      {asset}
                    </option>
                  );
                })}
                <option value={"ajouter une collection"} key={"+"}>
                  nouvelle collection
                </option>
              </select>
              {addCol && (
                <input
                  type="text"
                  name="asset"
                  id="asset"
                  placeholder="A regarder plus tard"
                  onChange={(event) => {
                    setAsset(event.target.value);
                  }}
                  value={asset}
                />
              )}
            </div>

            <div>
              <label htmlFor="comment">
                Un commentaire à relire plus tard ?
              </label>
              <textarea
                type="text"
                name="comment"
                id="comment"
                placeholder="Film génial, scenario extra, méga explosions..."
                onChange={(event) => {
                  setComment(event.target.value);
                }}
                value={comment}
              />
            </div>
            {errorMessage && <p>{errorMessage}</p>}
            {AddIsLoading && <div className="loader"></div>}
            <button
              disabled={AddIsLoading ? true : false}
              className="buttonall"
            >
              Enregistrer dans mes collections
            </button>
          </form>
        )}
      </div>
    </section>
  );
};

export default ModalAddMovie;
