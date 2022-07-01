import React, { useState, createContext } from "react";

export const UserContext = createContext();

export const UserProvider = props => {
  const currentUser = JSON.parse(localStorage.getItem("user"))
  const [user, setUser] = useState(currentUser);
  const [fetchTrigger, setFetchTrigger] = useState(true)
  const [toggle,settoggle] = useState(false)

  return (
    <UserContext.Provider value={[user, setUser, fetchTrigger, setFetchTrigger, toggle,settoggle]}>
      {props.children}
    </UserContext.Provider>
  );
};
