import "./modal-connection.css";
const ModalConnection = ({ setModalConnectionVisible }) => {
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
        <p>This is the ModalConnection component</p>
      </div>
    </section>
  );
};

export default ModalConnection;
