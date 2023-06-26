import React from "react";
import styles from "./MonsterList.module.css";

export default function MonsterList(props) {
  return (
    <div>
      <ul className={styles.list}>
        {props.searchMonster === ""
          ? props.monsters.map((monster, index) => {
              return (
                <li key={index} className={styles.item}>
                  <button
                    className={styles.button}
                    onClick={props.cardClickHandler}
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
                  .includes(props.searchMonster.toLowerCase());
              })
              .map((monster, index) => {
                return (
                  <li key={index} className={styles.item}>
                    <button
                      className={styles.button}
                      onClick={props.cardClickHandler}
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
