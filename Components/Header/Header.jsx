import "./header.css";
import { MdLocalMovies } from "react-icons/md";
import categories from "../../categories.json";
import { useState, useContext } from "react";
import userContext from "../../Context/UserContext";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const { user } = useContext(userContext);
  console.log("user", user);
  const navigate = useNavigate();
  const [query, setQuery] = useState({
    cat: 0,
    search: "",
  });

  const handleSubmit = () => {
    console.log("submit");
  };

  return (
    <header>
      <div className="container">
        <Link to="/" className="logo-container">
          <MdLocalMovies />
          <p>Movie-Tracker</p>
        </Link>
        <form onSubmit={handleSubmit}>
          <select
            name="categories"
            defaultValue={query.cat}
            onChange={(event) => {
              const obj = { ...query, cat: event.target.value };
              setQuery(obj);
            }}
          >
            {categories.genres.map((cat) => {
              return (
                <option value={cat.id} key={cat.id}>
                  {cat.name}
                </option>
              );
            })}
          </select>
          <input
            type="text"
            name="search"
            onChange={(event) => {
              const obj = { ...query, search: event.target.value };
              setQuery(obj);
            }}
            value={query.search}
          />
          <button>Go !</button>
        </form>
        {user ? (
          <div>
            <p>{user.username}</p>
          </div>
        ) : (
          <button
            onClick={() => {
              navigate("/login");
            }}
          >
            Se connecter
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
