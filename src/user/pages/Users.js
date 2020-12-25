import React from "react";
import UsersList from "../components/UsersList";

const Users = () => {
  const USERS = [
    {
      id: "u1",
      name: "Boots's cousin",
      image:
        "https://images.unsplash.com/photo-1575510632337-8550e3993a9b?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=401&q=80",
      places: 3,
    },
  ];
  return <UsersList items={USERS} />;
};

export default Users;
