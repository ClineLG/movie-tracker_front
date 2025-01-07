import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

//pages
import Home from "../Pages/Home/Home";
import MovieDetails from "../Pages/MovieDetails/MovieDetails";
import Allmovies from "../Pages/AllMovies/AllMovies";
//components
import Header from "../Components/Header/Header";

function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/details" element={<MovieDetails />} />
          <Route path="/all" element={<Allmovies />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
