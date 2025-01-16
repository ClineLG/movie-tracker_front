import "./signup.css";
import axios from "axios";
import { useState, useContext, useEffect } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import UserContext from "../../Context/UserContext";
const Signup = ({ setModalConnectionVisible, modalConnectionVisible }) => {
  const navigate = useNavigate();
  const { login } = useContext(UserContext);
  const location = useLocation();
  const { from } = location.state;
  const [userDetails, setUserDetails] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    avatar: null,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [imageUpload, setImageUpload] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    modalConnectionVisible && setModalConnectionVisible(false);
  }, []);

  const handleChange = (event, str) => {
    setErrorMessage(null);
    const obj = { ...userDetails };
    obj[str] = event.target.value;
    setUserDetails(obj);
  };

  const handleNewFile = (event) => {
    const file = event.target.files[0];
    setUserDetails({ ...userDetails, avatar: file });
    handleImageUpload(file);
  };

  const handleImageUpload = (file) => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUpload(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    //   console.log(userDetails);
    const { username, email, password, confirmPassword, avatar } = userDetails;
    if (!username || !email || !password || !confirmPassword) {
      setErrorMessage("Veuillez remplir tous les champs");
    } else if (password !== confirmPassword) {
      setErrorMessage("Les mots de passe ne correspondent pas");
    } else {
      const formData = new FormData();
      formData.append("email", email);
      formData.append("username", username);
      formData.append("password", password);
      formData.append("image", avatar);
      setIsLoading(true);
      try {
        const response = await axios.post(
          "http://localhost:3000/user/signup",
          formData,
          {
            "Content-Type": "multipart/form-data",
          }
        );
        setIsLoading(false);

        login(response.data);
        navigate(from);
      } catch (error) {
        console.log(error);
        if (error.response.data.message === "email already used") {
          setErrorMessage("Cette adresse e-mail a déjà été enregistrée");
          setIsLoading(false);
        } else {
          setErrorMessage("Une erreur est survenue veuillez rééssayer");
          setIsLoading(false);
        }
      }
    }
  };

  return (
    <section className="register">
      <div className="container">
        <form onSubmit={(event) => handleSubmit(event)}>
          <h1>S'inscrire</h1>
          <div className="label-input">
            <label htmlFor="username">Pseudo : </label>
            <input
              id="username"
              type="text"
              name="username"
              placeholder="Pseudo"
              onChange={(event) => {
                handleChange(event, "username");
              }}
              value={userDetails.username}
            />
          </div>

          <div className="label-input">
            <label htmlFor="email">E-mail : </label>{" "}
            <input
              type="email"
              name="email"
              placeholder="e-mail"
              onChange={(event) => {
                handleChange(event, "email");
              }}
              value={userDetails.email}
            />
          </div>
          <div className="label-input">
            <label htmlFor="password">Mot de passe : </label>
            <input
              id="password"
              type="password"
              name="password"
              placeholder="*****"
              onChange={(event) => {
                handleChange(event, "password");
              }}
              value={userDetails.password}
            />
          </div>
          <div className="label-input">
            <label htmlFor="confirmPassword">
              Confirmation du mot de passe :
            </label>
            <input
              id="confirmPassword"
              type="password"
              name="confirmPassword"
              placeholder="*****"
              onChange={(event) => {
                handleChange(event, "confirmPassword");
              }}
              value={userDetails.confirmPassword}
            />
          </div>

          <label htmlFor="uploadAvatar" className="avatar-L">
            <p className="button">Ajouter un avatar</p>
            {imageUpload && (
              <img
                src={imageUpload}
                alt="picture upload preview"
                className="avatarPreview"
              />
            )}
          </label>
          <input
            className="inputAvatar"
            id="uploadAvatar"
            type="file"
            name="avatar"
            onChange={(event) => {
              handleNewFile(event);
            }}
          />
          {errorMessage && <p className="alert">{errorMessage}</p>}
          {isLoading && <div className="loader"></div>}
          <button className="buttonall" disabled={isLoading ? true : false}>
            S'enregistrer
          </button>
          <Link to="/login">Déjà inscrit ? se connecter !</Link>
        </form>
      </div>
    </section>
  );
};
export default Signup;
