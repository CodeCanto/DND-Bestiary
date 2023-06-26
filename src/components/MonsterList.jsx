import React from "react";
import styles from "./MonsterList.module.css";

export default function MonsterList(props) {
  console.log(props, "props");
  return (
    <div>
      <ul className={styles.list}>
        {props.searchQuery === ""
          ? props.monsters.map((monster) => {
              return (
                <li key={monster.index} className={styles.item}>
                  <button
                    className={styles.button}
                    onClick={() => props.cardClickHandler(monster.index)}
                  >
                    {monster.name}
                  </button>
                </li>
              );
            })
          : props.monsters
              .filter((monster) => {
                return monster.name
                  .toLowerCase()
                  .includes(props.searchQuery.toLowerCase());
              })
              .map((monster) => {
                return (
                  <li key={monster.index} className={styles.item}>
                    <button
                      className={styles.button}
                      onClick={() => props.cardClickHandler(monster.index)}
                    >
                      {monster.name}
                    </button>
                  </li>
                );
              })}
      </ul>
    </div>
  );
}
