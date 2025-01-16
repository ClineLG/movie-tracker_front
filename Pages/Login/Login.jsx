import "./login.css";
import axios from "axios";
import { useState, useContext, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import UserContext from "../../Context/UserContext";
const Login = ({ setModalConnectionVisible, modalConnectionVisible }) => {
  const navigate = useNavigate();
  const { login } = useContext(UserContext);
  const [userDetails, setUserDetails] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const location = useLocation();
  let from = "";
  if (location.state) {
    from = location.state.from;
  } else {
    from = "/";
  }

  useEffect(() => {
    if (modalConnectionVisible) {
      setModalConnectionVisible(false);
    }
  }, []);

  const handleChange = (event, str) => {
    setErrorMessage(null);
    const obj = { ...userDetails };
    obj[str] = event.target.value;
    setUserDetails(obj);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    //   console.log(userDetails);
    const { email, password } = userDetails;
    if (!email || !password) {
      setErrorMessage("Veuillez remplir tous les champs");
    } else {
      setIsLoading(true);
      try {
        const response = await axios.post("http://localhost:3000/user/login", {
          email: email,
          password: password,
        });
        setIsLoading(false);

        login(response.data);
        navigate(from);
      } catch (error) {
        console.log(error.response);
        if (
          error.response.data.message === "Email address unknown" ||
          error.response.data.message === "wrong parameters"
        ) {
          setErrorMessage("Les informations saisies sont incorrectes");
          setIsLoading(false);
        } else {
          setErrorMessage("Une erreur est survenue veuillez rééssayer");
          setIsLoading(false);
        }
        console.log(error);
      }
    }
  };

  return (
    <section className="register">
      <div className="container">
        <form onSubmit={(event) => handleSubmit(event)}>
          <h1>Se connecter</h1>
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
            <label htmlFor="password">Mot de passe :</label>
            <input
              type="password"
              name="password"
              placeholder="*****"
              onChange={(event) => {
                handleChange(event, "password");
              }}
              value={userDetails.password}
            />
          </div>

          {errorMessage && <p className="alert">{errorMessage}</p>}
          {isLoading && <div className="loader"></div>}
          <button className="buttonall" disabled={isLoading ? true : false}>
            Se connecter
          </button>
          <Link to="/signup" state={{ from: "/" }}>
            Pas de compte ? s'inscrire !
          </Link>
        </form>
      </div>
    </section>
  );
};

export default Login;
