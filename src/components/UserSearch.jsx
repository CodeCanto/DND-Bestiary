import React from "react";
import styles from "./UserSearch.module.css";

export default function UserSearch(props) {
  return (
    <div className={styles.input}>
      <input
        type="text"
        onChange={props.onChangeHandler}
        placeholder="Search Monsters"
        value={props.searchMonster}
      />
    </div>
  );
}
