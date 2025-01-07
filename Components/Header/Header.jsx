import "./header.css";
import { MdLocalMovies } from "react-icons/md";

import { useState } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const [query, setQuery] = useState({ search: "" });

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
          <select name="categories" id=""></select>
          <input
            type="text"
            name="search"
            onChange={(event) => {
              const obj = { ...query, search: event.target.value };
              setQuery(obj);
            }}
            value={query.search}
          />
        </form>
      </div>
    </header>
  );
};

export default Header;
