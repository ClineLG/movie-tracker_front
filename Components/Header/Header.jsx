import "./header.css";
import { MdLocalMovies } from "react-icons/md";
import categories from "../../categories.json";
import { useState, useContext } from "react";
import userContext from "../../Context/UserContext";
import { Link, useNavigate } from "react-router-dom";

const Header = ({ pageFunc }) => {
  const { user } = useContext(userContext);
  console.log("user", user);
  const navigate = useNavigate();
  const [query, setQuery] = useState({
    cat: 0,
    search: "",
  });
  console.log(query);
  const handleSubmit = async (event) => {
    event.preventDefault();
    // console.log(query.cat);
    if (!query.cat && !query.search) {
      null;
    } else if (!query.cat) {
      pageFunc(1);
      navigate("all/search", { state: { from: query.search } });

      const obj = {
        cat: 0,
        search: "",
      };
      setQuery(obj);
    } else if (query.cat && query.search) {
      pageFunc(1);
      navigate(`all/${query.cat}`, { state: { from: query.search } });

      const obj = {
        cat: 0,
        search: "",
      };
      setQuery(obj);
    } else if (query.cat && !query.search) {
      pageFunc(1);

      navigate(`all/${query.cat}`);

      const obj = {
        cat: 0,
        search: "",
      };
      setQuery(obj);
    }
  };

  return (
    <header>
      <div className="container">
        <Link to="/" className="logo-container">
          <MdLocalMovies />
          <p>Movie-Tracker</p>
        </Link>
        <form
          onSubmit={(event) => {
            handleSubmit(event);
          }}
        >
          <select
            name="categories"
            value={query.cat}
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
