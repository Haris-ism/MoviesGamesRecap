import { useState, createContext, useRef } from "react";

export const UserContext = createContext();
export const UserProvider = props => {
  const [user, setUser] = useState(null);
  const [loader, setLoader] = useState(false)
  const state = {
    user: user,
    setUser: setUser,
    loader: loader,
    setLoader: setLoader
  }
  return (
    <UserContext.Provider value={state}>
      {props.children}
    </UserContext.Provider>
  );
};
