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
        >
          fermer
        </button>
        <p>Vous devez être connecté pour ajoiuter ce film à vos collections</p>
        <Link to="/signup" state={{ from: `/details/${dataMovie.id}` }}>
          S'inscrire
        </Link>
        <Link to="/login" state={{ from: `/details/${dataMovie.id}` }}>
          Se connecter
        </Link>
      </div>
    </section>
  );
};

export default ModalConnection;
