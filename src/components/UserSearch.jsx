import React from "react";

export default function UserSearch(props) {
  return (
    <input
      type="text"
      onChange={props.onChangeHandler}
      placeholder="Search Monsters"
      value={props.searchMonster}
    />
  );
}
