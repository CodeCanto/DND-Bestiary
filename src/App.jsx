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
  const [searchQuery, setSearchQuery] = useState("");
  const [clickedCard, setClickedCard] = useState(false);

  useEffect(() => {
    axios.get(`${baseURL}monsters`).then((response) => {
      setMonsters(response.data.results);
    });
  }, []);

  const cardClickHandler = (index) => {
    console.log(index, "index in app");
    setDisplayDetails(`${baseURL}monsters/${index}`);
    setClickedCard(true);
  };

  const backClickHandler = () => {
    setClickedCard(false);
  };

  const onChangeHandler = (e) => {
    setSearchQuery(e.target.value);
    setClickedCard(false);
  };

  {
    console.log(clickedCard);
  }

  return (
    <>
      <Header />
      <UserSearch onChangeHandler={onChangeHandler} value={searchQuery} />
      {clickedCard ? (
        <div>
          <button onClick={backClickHandler}>Back to List</button>
          <MonsterCard displayDetails={displayDetails} />
        </div>
      ) : (
        <MonsterList
          searchQuery={searchQuery}
          cardClickHandler={cardClickHandler}
          monsters={monsters}
        />
      )}
    </>
  );
}

export default App;
