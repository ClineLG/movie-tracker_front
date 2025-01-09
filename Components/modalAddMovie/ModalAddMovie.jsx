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

  const [asset, setAsset] = useState("A regarder plus tard");
  const [comment, setComment] = useState("");
  const [AddIsLoading, setAddIsLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [done, setDone] = useState(false);
  const [assetCol, setAssetCol] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/user/favAsset",
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
      setIsLoading(true);
      const response = await axios.put(
        `http://localhost:3000/user/addMovie`,
        { movie: dataMovie, comment: comment, asset: asset },
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
    <div className="loading">Loading</div>
  ) : (
    <section className="modal">
      <div className="modalContent">
        <button
          onClick={() => {
            setModalAddVisible(false);
          }}
        >
          ferme la
        </button>
        {done ? (
          <div>
            <p>Ajouté avec succés à vos collections !</p>
            <Link to={"/collections"}>Voir mes Collections</Link>
          </div>
        ) : (
          <form
            onSubmit={(event) => {
              handleSubmit(event);
            }}
          >
            <div>
              <label htmlFor="asset">Mettre de coté dans un dossier : </label>
              <select
                name="asset"
                value={asset}
                onChange={(event) => {
                  setAsset(event.target.value);
                }}
              >
                {assetCol.map((asset, index) => {
                  return (
                    <option value={asset} key={index}>
                      {asset}
                    </option>
                  );
                })}
              </select>
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
            </div>

            <div>
              <label htmlFor="comment">
                Un commentaire à relire plus tard ?
              </label>
              <input
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
            <button disabled={AddIsLoading ? true : false}>
              Enregistrer dans mes collections
            </button>
          </form>
        )}
      </div>
    </section>
  );
};

export default ModalAddMovie;
