import { useEffect, useState } from "react";
import "./collections.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Collections = ({ modalAddVisible, setModalAddVisible, user, add }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [collections, setCollections] = useState(null);
  const [message, setMassage] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    modalAddVisible && setModalAddVisible(false);
    if (!user) {
      navigate("/");
    }
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://site--moviestracker--dm4qbjsg7dww.code.run/user/fav",
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
        setCollections(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [add, user]);

  return isLoading ? (
    <div className="loader"></div>
  ) : (
    <section className="colall">
      <div className="container">
        {message ? (
          <p className="center">{message}</p>
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
