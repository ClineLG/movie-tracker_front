import { useLocation, useParams } from "react-router-dom";
import "./allMovies.css";
import { useEffect, useState } from "react";
import axios from "axios";
import AllMoviesComponent from "../../Components/AllmoviesComponent/AllMoviesComponent";

const Allmovies = ({ page, pageFunc }) => {
  const { cat } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);
  const [tabPages, setTabPages] = useState([]);
  const location = useLocation();

  const { from } = location.state || 0;
  console.log("LOC", from);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/movies/${
            isNaN(cat) ? cat : `categories/${cat}`
          }/?page=${page}&${from && from !== 0 ? "search=" + from : ""}`
        );
        const tab = [];
        for (let i = 1; i <= response.data.total_pages; i++) {
          tab.push(i);
        }
        setTabPages(tab);
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
    }

    return str;
  };

  return isLoading ? (
    <div className="loading">Loading</div>
  ) : (
    <section>
      <div>
        <h1>Les films {funcName(cat)}</h1>
        <AllMoviesComponent data={data} />
        <label>
          Page :{" "}
          <select
            name="selectedPage"
            value={page}
            onChange={(event) => {
              pageFunc(event.target.value);
            }}
          >
            {console.log(tabPages)}
            {tabPages.length > 0 ? (
              tabPages.map((page) => {
                return (
                  <option value={page} key={page}>
                    {page}
                  </option>
                );
              })
            ) : (
              <option value={1} key={1}>
                1
              </option>
            )}
          </select>
        </label>{" "}
      </div>
    </section>
  );
};

export default Allmovies;
