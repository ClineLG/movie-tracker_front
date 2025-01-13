import "./modal-connection.css";
import { Link } from "react-router-dom";
const ModalConnection = ({ setModalConnectionVisible, dataMovie }) => {
  console.log("DB", dataMovie);
  return (
    <section className="modal">
      <div className="modalContent">
        <button
          onClick={() => {
            setModalConnectionVisible(false);
          }}
          className="button"
        >
          X
        </button>
        <div className="co">
          <p>Vous devez être connecté pour ajouter ce film à vos collections</p>

          <div>
            <Link
              className="buttonall"
              to="/signup"
              state={{ from: `/details/${dataMovie.id}` }}
            >
              S'inscrire
            </Link>
            <Link
              className="buttonall"
              to="/login"
              state={{ from: `/details/${dataMovie.id}` }}
            >
              Se connecter
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ModalConnection;
