import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";

import Cookies from "js-cookie";
//pages
import Home from "../Pages/Home/Home";
import MovieDetails from "../Pages/MovieDetails/MovieDetails";
import Allmovies from "../Pages/AllMovies/AllMovies";
import Signup from "../Pages/Signup/Sigup";
import Login from "../Pages/Login/login";
import Collections from "../Pages/Collections/Collections";
import MovieCollectionDetails from "../Pages/MovieCollectionDetails/MovieCollectionDetails";
import UpdateAccount from "../Pages/updateAccount/updateAccount";
//components
import Header from "../Components/Header/Header";
import ModalConnection from "../Components/modalConnection/modalConnection";
import ModalAddMovie from "../Components/modalAddMovie/ModalAddMovie";
//context
import UserContext from "../Context/UserContext";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [user, setUser] = useState(null);
  const [page, setPage] = useState(1);
  const [modalAddVisible, setModalAddVisible] = useState(false);
  const [modalConnectionVisible, setModalConnectionVisible] = useState(false);
  const [dataMovie, setDataMovie] = useState(null);
  const [add, setAdd] = useState(true);

  const pageFunc = (num) => {
    setPage(num);
  };

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
    <div className={modalAddVisible || modalConnectionVisible ? "app" : ""}>
      <Router>
        <UserContext.Provider value={{ user, logout, login, setDataMovie }}>
          <Header page={page} pageFunc={pageFunc} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/details/:id"
              element={
                <MovieDetails
                  modalAddVisible={modalAddVisible}
                  setModalAddVisible={setModalAddVisible}
                  modalConnectionVisible={modalConnectionVisible}
                  setModalConnectionVisible={setModalConnectionVisible}
                />
              }
            />
            <Route
              path="/all/:cat"
              element={<Allmovies page={page} pageFunc={pageFunc} />}
            />
            <Route
              path="/signup"
              element={
                <Signup
                  setModalConnectionVisible={setModalConnectionVisible}
                  modalConnectionVisible={modalConnectionVisible}
                />
              }
            />
            <Route
              path="/login"
              element={
                <Login
                  setModalConnectionVisible={setModalConnectionVisible}
                  modalConnectionVisible={modalConnectionVisible}
                />
              }
            />
            <Route
              path="/myMovies"
              element={
                <Collections
                  modalAddVisible={modalAddVisible}
                  setModalAddVisible={setModalAddVisible}
                  user={user}
                  add={add}
                />
              }
            />
            <Route
              path="/myMovie/:id"
              element={
                <MovieCollectionDetails user={user} add={add} setAdd={setAdd} />
              }
            />
            <Route
              path="/account"
              element={
                <UpdateAccount user={user} login={login} logout={logout} />
              }
            />
          </Routes>
          {modalAddVisible && (
            <ModalAddMovie
              setModalAddVisible={setModalAddVisible}
              dataMovie={dataMovie}
              user={user}
              add={add}
              setAdd={setAdd}
            />
          )}
          {modalConnectionVisible && (
            <ModalConnection
              dataMovie={dataMovie}
              setModalConnectionVisible={setModalConnectionVisible}
            />
          )}
        </UserContext.Provider>
      </Router>
    </div>
  );
}

export default App;
