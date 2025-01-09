import { useEffect, useState } from "react";
import "./collections.css";
import axios from "axios";

const Collections = ({ modalAddVisible, setModalAddVisible, user, add }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [collections, setCollections] = useState(null);
  const [message, setMassage] = useState("");
  const [asset, setAsset] = useState(null);

  useEffect(() => {
    modalAddVisible && setModalAddVisible(false);
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/user/fav", {
          headers: {
            Authorization: "Bearer " + user.token,
          },
        });
        if (response.data.fav && response.data.fav.length > 0) {
          const tab = response.data.fav;
          setCollections(tab);
          try {
            const response2 = await axios.get(
              "http://localhost:3000/user/favAsset",
              {
                headers: {
                  Authorization: "Bearer " + user.token,
                },
              }
            );
            setAsset(response2.data);
          } catch (error) {
            console.log(error);
          }
        } else {
          setMassage(
            "Vous n'avez pas de Films dans vos collections pour le moment"
          );
        }
        console.log(response.data);
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
          <div>
            {asset.map((asset, index) => {
              return (
                <div key={index}>
                  {/* {collections.map((film) => {
                    return (
                      film.asset === asset && <img src={film.movie.poster} />
                    );
                  })} */}
                  <p>{asset}</p>
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
