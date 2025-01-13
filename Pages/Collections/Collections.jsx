import { useEffect, useState } from "react";
import "./collections.css";
import axios from "axios";
import { Link } from "react-router-dom";

const Collections = ({ modalAddVisible, setModalAddVisible, user, add }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [collections, setCollections] = useState(null);
  const [message, setMassage] = useState("");

  useEffect(() => {
    modalAddVisible && setModalAddVisible(false);
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://site--backend-movie-tracker--29w4cq6k8fjr.code.run/user/fav",
          {
            headers: {
              Authorization: "Bearer " + user.token,
            },
          }
        );
        if (!response.data.count || response.data.count < 1) {
          setMassage(
            "Vous n'avez pas de Films dans vos collections pour le moment"
          );
        }
        // console.log("RESPONSE>>>>>>>>>", response.data);
        setCollections(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [add, user]);

  return !user ? (
    <div className="loading">Unauthorized</div>
  ) : isLoading ? (
    <div className="loading">Loading</div>
  ) : (
    <section className="colall">
      <div className="container">
        {message ? (
          <p>{message}</p>
        ) : (
          <div className="collections">
            {collections.results.map((asset, index) => {
              return (
                <div key={index} className="col-section">
                  <h1>{asset.name}</h1>
                  <div className="movies-container">
                    {asset.movies.map((film) => {
                      return film.map((mov) => {
                        return (
                          <Link
                            to={`/myMovie/${mov._id}`}
                            className="MovieCard"
                            key={mov._id}
                          >
                            <img src={mov.movie.poster} alt="" />
                            <h2>{mov.movie.title}</h2>
                          </Link>
                        );
                      });
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default Collections;
