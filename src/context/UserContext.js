import { useState, createContext, useRef } from "react";

export const UserContext = createContext();
export const UserProvider = props => {
  const [user, setUser] = useState(null);
  const [loader, setLoader] = useState(false)
  return (
    <UserContext.Provider value={[user, setUser, loader, setLoader]}>
      {props.children}
    </UserContext.Provider>
  );
};
