import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "./components/Header";
import UserSearch from "./components/UserSearch";
import MonsterList from "./components/MonsterList";
import MonsterCard from "./components/MonsterCard";
import "./App.css";

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

  return (
    <>
      <Header />
      <UserSearch onChangeHandler={onChangeHandler} value={searchQuery} />
      {clickedCard ? (
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              padding: "20px",
            }}
          >
            <button style={{ margin: "auto" }} onClick={backClickHandler}>
              Back to List
            </button>
          </div>
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
