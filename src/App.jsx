import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";

import Cookies from "js-cookie";
//pages
import Home from "../Pages/Home/Home";
import MovieDetails from "../Pages/MovieDetails/MovieDetails";
import Allmovies from "../Pages/AllMovies/AllMovies";
import Signup from "../Pages/Signup/Sigup";
import Login from "../Pages/Login/login";
//components
import Header from "../Components/Header/Header";
//context
import UserContext from "../Context/UserContext";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [user, setUser] = useState(null);

  const login = (user) => {
    console.log("Loginfunc user===>", user);
    setUser(user);
    Cookies.set("token", user.token, { expires: 30 });
  };
  const logout = () => {
    Cookies.remove("token");
    setUser(null);
  };

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      const fetchData = async () => {
        try {
          const response = await axios.get(
            "http://localhost:3000/user/details",
            {
              headers: {
                Authorization: "Bearer " + token,
              },
            }
          );
          setUser(response.data);
        } catch (error) {
          console.log(error);
        }
      };
      fetchData();
    }
  }, []);

  return (
    <Router>
      <UserContext.Provider value={{ user, logout, login }}>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/details/:id" element={<MovieDetails />} />
          <Route path="/all/:cat" element={<Allmovies />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </UserContext.Provider>
    </Router>
  );
}

export default App;
