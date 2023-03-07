import React from "react";
import { IProviderProps } from "../interfaces";
import { Users } from "../services/__generated__";

const User = React.createContext({});

export function getUser() {
  return React.useContext(User);
}

export const UserProvider = ({ children }: IProviderProps) => {
  const [user, setUser] = React.useState<Users | null>(null);

  //@ts-ignore
  const updateToken = (token: string) => setUser({ ...user, token: token });

  const updateUser = (user: Users) => setUser(user);

  const removeUser = () => {
    setUser(null);
    localStorage.removeItem("todo-user");
  };

  // update localstorage
  React.useEffect(() => {
    if (user) {
      window.localStorage.setItem("todo-user", JSON.stringify(user));
    } else {
      // @ts-ignore
      const localUser = JSON.parse(localStorage.getItem("todo-user"));
      if (localUser) {
        setUser(localUser);
      }
    }
  }, [user]);

  return (
    <User.Provider value={{ user, updateUser, updateToken, removeUser }}>
      {children}
    </User.Provider>
  );
};
