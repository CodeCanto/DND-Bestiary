import React, { useState, useEffect } from "react";
import axios from "axios";
import "./MonsterCard.module.css";

function MonsterCard(props) {
  const [cardDetails, setCardDetails] = useState({});
  const [isImageLoaded, setIsImageLoaded] = useState(true);

  useEffect(() => {
    axios
      .get(props.displayDetails)
      .then((response) => {
        setCardDetails(response.data);
        console.log(cardDetails);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleImageError = () => {
    setIsImageLoaded(false);
    console.log(cardDetails);
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
          {Object.entries(value).map(([key, subValue], index) => (
            <li key={index}>
              <h3>{key.charAt(0).toUpperCase() + key.slice(1)}</h3>
              <div>{recursiveCheck(subValue)}</div>
            </li>
          ))}
        </ul>
      );
    }
    return null;
  };

  return (
    <>
      <h1>{cardDetails.name}</h1>
      {isImageLoaded ? (
        <img
          src={`https://www.dnd5eapi.co/api/images/monsters/${cardDetails.index}.png`}
          alt={`Picture of ${cardDetails.name}.`}
          onError={handleImageError}
        />
      ) : (
        <p>Image not available.</p>
      )}
      <ul style={{ listStyleType: "none" }}>
        {Object.entries(cardDetails).map(([key, value]) => (
          <li key={key}>
            <h2>{key.charAt(0).toUpperCase() + key.slice(1)}</h2>
            <div>{recursiveCheck(value)}</div>
          </li>
        ))}
      </ul>
    </>
  );
}

export default MonsterCard;
