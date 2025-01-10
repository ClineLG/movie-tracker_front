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
        const response = await axios.get("http://localhost:3000/user/fav", {
          headers: {
            Authorization: "Bearer " + user.token,
          },
        });
        if (!response.data.count || response.data.count < 1) {
          setMassage(
            "Vous n'avez pas de Films dans vos collections pour le moment"
          );
        }
        console.log("RESPONSE>>>>>>>>>", response.data);
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
    <section>
      <div className="container">
        {message ? (
          <p>{message}</p>
        ) : (
          <div
            style={{ display: "flex", flexDirection: "column", gap: "40px" }}
          >
            {collections.results.map((asset, index) => {
              return (
                <div key={index}>
                  <p>{asset.name}</p>
                  <div style={{ display: "flex", overflow: "scroll" }}>
                    {asset.movies.map((film) => {
                      return film.map((mov) => {
                        return (
                          <Link to={`/myMovie/${mov._id}`} key={mov._id}>
                            <img src={mov.movie.poster} alt="" />
                            <p>{mov.movie.title}</p>
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
