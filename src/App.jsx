import React, { useState, useEffect } from "react";
import MonsterCard from "./components/MonsterCard";
import axios from "axios";
import Header from "./components/Header";
import UserSearch from "./components/UserSearch";
import MonsterList from "./components/MonsterList";

const baseURL = `https://www.dnd5eapi.co/api/`;

function App() {
  const [monsters, setMonsters] = useState([]);
  const [displayDetails, setDisplayDetails] = useState("");
  const [searchMonster, setSearchMonster] = useState("");
  const [clickedCard, setClickedCard] = useState(false);

  useEffect(() => {
    axios.get(`${baseURL}/monsters`).then((response) => {
      setMonsters(response.data.results);
    });
  }, []);

  const cardClickHandler = (e) => {
    setDisplayDetails(
      `${baseURL}/monsters/${e.target.innerText
        .replace(/ /gi, "-")
        .toLowerCase()}`
    );
    setClickedCard(true);
  };

  const backClickHandler = () => {
    setClickedCard(false);
  };

  const onChangeHandler = (e) => {
    setSearchMonster(e.target.value);
    setClickedCard(false);
  };

  return (
    <>
      <Header />
      <UserSearch onChangeHandler={onChangeHandler} value={searchMonster} />
      {clickedCard ? (
        <div>
          <button onClick={backClickHandler}>Back to List</button>
          <MonsterCard displayDetails={displayDetails} />
        </div>
      ) : (
        <MonsterList
          searchMonster={searchMonster}
          cardClickHandler={cardClickHandler}
          monsters={monsters}
        />
      )}
    </>
  );
}

export default App;
