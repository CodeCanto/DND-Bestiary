import React, { useState, useEffect } from "react";
import MonsterCard from "./components/MonsterCard";
import axios from "axios";

const baseURL = `https://www.dnd5eapi.co/api/`;

function App() {
  const [monsters, setMonsters] = useState([]);
  const [displayCard, setDisplayCard] = useState("");
  const [searchMonster, setSearchMonster] = useState("");
  const [clickedCard, setClickedCard] = useState(false);

  useEffect(() => {
    axios.get(`${baseURL}/monsters`).then((response) => {
      setMonsters(response.data.results);
    });
  }, []);

  const clickHandler = (e) => {
    setDisplayCard(
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
      <h1>Monsters</h1>
      <input
        type="text"
        onChange={onChangeHandler}
        placeholder="Search Monsters"
        value={searchMonster}
      />
      {clickedCard ? (
        <div>
          <button onClick={backClickHandler}>Back to List</button>
          <MonsterCard displayDetails={displayCard} />
        </div>
      ) : (
        <div>
          <ul style={{ listStyleType: "none" }}>
            {searchMonster === ""
              ? monsters.map((monster, index) => {
                  return (
                    <li key={index}>
                      <button onClick={clickHandler}>{monster.name}</button>
                    </li>
                  );
                })
              : monsters
                  .filter((monster) => {
                    return monster.name
                      .toLowerCase()
                      .includes(searchMonster.toLowerCase());
                  })
                  .map((monster, index) => {
                    return (
                      <li key={index}>
                        <button onClick={clickHandler}>{monster.name}</button>
                      </li>
                    );
                  })}
          </ul>
        </div>
      )}
    </>
  );
}

export default App;
