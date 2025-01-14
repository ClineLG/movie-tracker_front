import axios from "axios";
import "./update-account.css";
import { useState } from "react";
import { MdOutlineEdit } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";

const updateAccount = ({ user, login, logout }) => {
  const [edit, setEdit] = useState(false);
  const [userDetailsEdit, setUserDetailsEdit] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    avatar: null,
  });
  const [imageUpload, setImageUpload] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const handleChange = (event, str) => {
    setErrorMessage(null);
    const obj = { ...userDetailsEdit };
    obj[str] = event.target.value;
    setUserDetailsEdit(obj);
  };

  const handleNewFile = (event) => {
    const file = event.target.files[0];
    setUserDetailsEdit({ ...userDetailsEdit, avatar: file });
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

    const { username, email, password, confirmPassword, avatar } =
      userDetailsEdit;

    if (!username && !email && !password && !confirmPassword && !avatar) {
      setErrorMessage("Il n'y a rien à éditer");
    } else if (password !== confirmPassword) {
      setErrorMessage("Les mots de passe ne correspondent pas");
    } else {
      const formData = new FormData();
      if (email) {
        formData.append("email", email);
      }
      if (username) {
        formData.append("username", username);
      }
      if (password) {
        formData.append("password", password);
      }
      if (avatar) {
        formData.append("image", avatar);
      }
      setIsLoading(true);

      try {
        const response = await axios.put(
          "https://site--backend-movie-tracker--29w4cq6k8fjr.code.run/user/update",
          formData,
          {
            headers: {
              Authorization: "Bearer " + user.token,
            },
          },
          {
            "Content-Type": "multipart/form-data",
          }
        );
        login(response.data);
        setIsLoading(false);
        setEdit(false);
      } catch (error) {
        console.log(error.response);
        setIsLoading(false);
      }
    }
  };

  const handleDelete = async () => {
    setIsLoading(true);

    try {
      const response = await axios.delete(
        "https://site--backend-movie-tracker--29w4cq6k8fjr.code.run/user/delete",
        {
          headers: {
            Authorization: "Bearer " + user.token,
          },
        }
      );
      setEdit(false);
      logout();
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="register updateAccount">
      <div className="container">
        <h1>Mon compte</h1>
        <form
          onSubmit={(event) => {
            handleSubmit(event);
          }}
        >
          {!edit ? (
            <>
              <MdOutlineEdit
                onClick={() => {
                  setEdit(true);
                }}
                className="editPress"
              />

              <div className="label-input">
                <label>Pseudo :</label> <p>{user.username}</p>
              </div>
              <div className="label-input">
                <label>E-mail :</label> <p>{user.email}</p>
              </div>

              {user.avatar && (
                <div className="label-input">
                  <label>Avatar : </label>{" "}
                  <img
                    className="avatarPreview"
                    src={user.avatar.secure_url}
                    alt="avatar"
                  />
                </div>
              )}
            </>
          ) : (
            <>
              <IoArrowBack
                className="back"
                onClick={() => {
                  const obj = {
                    username: "",
                    email: "",
                    password: "",
                    confirmPassword: "",
                    avatar: null,
                  };
                  setImageUpload(null);
                  setUserDetailsEdit(obj);
                  setEdit(false);
                }}
              />

              <div className="label-input">
                <label htmlFor="username">Pseudo :</label>
                <input
                  id="username"
                  type="text"
                  name="username"
                  placeholder={user.username}
                  onChange={(event) => {
                    handleChange(event, "username");
                  }}
                  value={userDetailsEdit.username}
                />
              </div>
              <div className="label-input">
                <label htmlFor="email">E-mail :</label>{" "}
                <input
                  type="email"
                  name="email"
                  placeholder={user.email}
                  onChange={(event) => {
                    handleChange(event, "email");
                  }}
                  value={userDetailsEdit.email}
                />
              </div>
              <div className="label-input">
                <label htmlFor="password">Mot de passe :</label>{" "}
                <input
                  type="password"
                  name="password"
                  placeholder="*****"
                  onChange={(event) => {
                    handleChange(event, "password");
                  }}
                  value={userDetailsEdit.password}
                />
              </div>
              <div className="label-input">
                <label htmlFor="confirmPassword">
                  Confirmation du mot de passe :
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="*****"
                  onChange={(event) => {
                    handleChange(event, "confirmPassword");
                  }}
                  value={userDetailsEdit.confirmPassword}
                />{" "}
              </div>

              <label htmlFor="uploadAvatar" className="avatar-L">
                <p className="button">Ajouter un nouvel avatar</p>
                {user.avatar && !imageUpload ? (
                  <img
                    src={user.avatar.secure_url}
                    alt="picture upload preview"
                    className="avatarPreview old"
                  />
                ) : (user.avatar && imageUpload) ||
                  (!user.avatar && imageUpload) ? (
                  <img
                    src={imageUpload}
                    alt="picture upload preview"
                    className="avatarPreview"
                  />
                ) : (
                  ""
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
                Editer
              </button>
            </>
          )}
        </form>{" "}
        <button
          onClick={() => {
            handleDelete();
          }}
          disabled={isLoading ? true : false}
          className="buttonD"
        >
          Supprimer mon compte
        </button>
      </div>
    </section>
  );
};

export default updateAccount;
