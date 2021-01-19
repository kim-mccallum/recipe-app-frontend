import React from "react";
import UserItem from "./UserItem";
import "./UsersList.css";

export default function UsersList(props) {
  //output a message if no users or a list of users
  if (props.items.length === 0) {
    return (
      <div className="center">
        <h2>No users found.</h2>
      </div>
    );
  }
  return (
    <ul className="users-list">
      {props.items.map((user) => (
        <UserItem
          key={user.id}
          id={user.id}
          image={user.image}
          name={user.name}
          recipeCount={user.recipes.length}
        />
      ))}
    </ul>
  );
}
