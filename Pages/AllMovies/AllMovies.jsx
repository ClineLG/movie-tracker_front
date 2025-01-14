import { useLocation, useParams } from "react-router-dom";
import "./allMovies.css";
import { useEffect, useState } from "react";
import axios from "axios";
import AllMoviesComponent from "../../Components/AllmoviesComponent/AllMoviesComponent";
import whatIsTheCategory from "../../utils/whatIsTheCategory";
import { GrPrevious } from "react-icons/gr";
import { GrNext } from "react-icons/gr";

const Allmovies = ({ page, pageFunc }) => {
  const { cat } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);
  const location = useLocation();

  const { from } = location.state || 0;
  // console.log("LOC", from);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://site--backend-movie-tracker--29w4cq6k8fjr.code.run/movies/${
            isNaN(cat) ? cat : `categories/${cat}`
          }/?page=${page}&${from && from !== 0 ? "search=" + from : ""}`
        );

        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [page, cat, from]);

  const funcName = (cat) => {
    let str = "";
    switch (cat) {
      case "pop":
        str = "populaires";
        break;
      case "upComing":
        str = "bientôt en Salle";
        break;
      case "playing":
        str = "à l'affiche";
        break;
      case "search":
        str = "correspondant à votre recherche";
        break;
    }

    return str;
  };

  return isLoading ? (
    <div className="loader"></div>
  ) : (
    <section className="allmovies">
      <div className="container">
        {console.log("cat", whatIsTheCategory(cat * 1))}
        <h1>
          {!isNaN(cat)
            ? whatIsTheCategory(cat * 1)
            : "Les films " + funcName(cat)}
        </h1>
        <AllMoviesComponent data={data} />
        <div className="page-container">
          {page !== 1 && (
            <GrPrevious
              onClick={() => {
                pageFunc(page - 1);
              }}
              className="white"
            />
          )}
          <p>{page}</p>
          {page !== 500 && (
            <GrNext
              onClick={() => {
                pageFunc(page + 1);
              }}
              className="white"
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default Allmovies;
