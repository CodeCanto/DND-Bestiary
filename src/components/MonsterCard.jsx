import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./MonsterCard.module.css";

function MonsterCard(props) {
  const [cardDetails, setCardDetails] = useState({});
  const [isImageLoaded, setIsImageLoaded] = useState(true);

  useEffect(() => {
    axios
      .get(props.displayDetails)
      .then((response) => {
        setCardDetails(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleImageError = () => {
    setIsImageLoaded(false);
  };

  const recursiveCheck = (value) => {
    if (
      typeof value === "string" ||
      typeof value === "number" ||
      typeof value === "boolean"
    ) {
      return <p>{String(value)}</p>;
    } else if (Array.isArray(value)) {
      return value.map((element, index) => (
        <div key={index}>{recursiveCheck(element)}</div>
      ));
    } else if (typeof value === "object" && value !== null) {
      return (
        <ul style={{ listStyleType: "none" }}>
          {Object.entries(value).map(
            ([key, subValue], index) =>
              key !== "index" &&
              key !== "url" && (
                <li className={styles.li} key={index}>
                  <h3>
                    {key.charAt(0).toUpperCase() +
                      key.slice(1).replace("_", " ")}
                  </h3>
                  <div>{recursiveCheck(subValue)}</div>
                </li>
              )
          )}
        </ul>
      );
    }
    return null;
  };

  return (
    <>
      {isImageLoaded ? (
        <div className={styles.imageContainer}>
          <div className={styles.polaroid}>
            <img
              className={styles.img}
              src={`https://www.dnd5eapi.co/api/images/monsters/${cardDetails.index}.png`}
              alt={`Picture of ${cardDetails.name}.`}
              onError={handleImageError}
            />
            <div className={styles.container}>
              <h1>{cardDetails.name}</h1>
            </div>
          </div>
        </div>
      ) : (
        <p className={styles.noimg}>Image not available.</p>
      )}
      <ul className={styles.list} style={{ listStyleType: "none" }}>
        {Object.entries(cardDetails).map(
          ([key, value]) =>
            key !== "index" &&
            key !== "url" && (
              <li className={styles.li} key={key}>
                <h2>
                  {key.charAt(0).toUpperCase() + key.slice(1).replace("_", " ")}
                </h2>
                <div>{recursiveCheck(value)}</div>
              </li>
            )
        )}
      </ul>
    </>
  );
}

export default MonsterCard;
