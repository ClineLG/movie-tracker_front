import axios from "axios";
import "./update-account.css";
import { useState } from "react";
import { MdOutlineEdit } from "react-icons/md";
import { useNavigate } from "react-router-dom";
const UpdateAccount = ({ user, login, logout }) => {
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
    <div className="container">
      <form
        onSubmit={(event) => {
          handleSubmit(event);
        }}
      >
        <h1>Mon compte</h1>
        {!edit ? (
          <>
            <MdOutlineEdit
              onClick={() => {
                setEdit(true);
              }}
            />
            <p> pseudo : {user.username}</p>
            <p>adresse e-mail : {user.email}</p>
            {user.avatar && <img src={user.avatar} alt="avatar" />}
          </>
        ) : (
          <>
            <span
              onClick={() => {
                setEdit(false);
              }}
            >
              ←
            </span>
            <input
              type="text"
              name="username"
              placeholder={user.username}
              onChange={(event) => {
                handleChange(event, "username");
              }}
              value={userDetailsEdit.username}
            />
            <input
              type="email"
              name="email"
              placeholder={user.email}
              onChange={(event) => {
                handleChange(event, "email");
              }}
              value={userDetailsEdit.email}
            />
            <input
              type="password"
              name="password"
              placeholder="*****"
              onChange={(event) => {
                handleChange(event, "password");
              }}
              value={userDetailsEdit.password}
            />
            <input
              type="password"
              name="confirmPassword"
              placeholder="*****"
              onChange={(event) => {
                handleChange(event, "confirmPassword");
              }}
              value={userDetailsEdit.confirmPassword}
            />
            <label htmlFor="uploadAvatar" className="avatar">
              <p>Ajouter un nouvel avatar</p>
              {user.avatar && !imageUpload ? (
                <img
                  src={user.avatar}
                  alt="picture upload preview"
                  className="avatarPreview"
                />
              ) : (
                (user.avatar && imageUpload) ||
                (!user.avatar && imageUpload && (
                  <img
                    src={imageUpload}
                    alt="picture upload preview"
                    className="avatarPreview"
                  />
                ))
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
            {errorMessage && <p>{errorMessage}</p>}
            <button disabled={isLoading ? true : false}>Editer</button>
          </>
        )}
      </form>
      <button
        onClick={() => {
          handleDelete();
        }}
        disabled={isLoading ? true : false}
      >
        Supprimer mon compte
      </button>
    </div>
  );
};

export default UpdateAccount;
