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
        const response = await axios.post(
          "https://site--backend-movie-tracker--29w4cq6k8fjr.code.run/user/login",
          {
            email: email,
            password: password,
          }
        );
        setIsLoading(false);
        console.log(response.data);

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
    <section>
      <div className="container">
        <form onSubmit={(event) => handleSubmit(event)}>
          <input
            type="email"
            name="email"
            placeholder="e-mail"
            onChange={(event) => {
              handleChange(event, "email");
            }}
            value={userDetails.email}
          />
          <input
            type="password"
            name="password"
            placeholder="*****"
            onChange={(event) => {
              handleChange(event, "password");
            }}
            value={userDetails.password}
          />
          {errorMessage && <p>{errorMessage}</p>}
          <button disabled={isLoading ? true : false}>Se connecter</button>
          <Link to="/signup" state={{ from: "/" }}>
            Pas de compte ? s'inscrire !
          </Link>
        </form>
      </div>
    </section>
  );
};

export default Login;
