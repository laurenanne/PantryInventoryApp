import React from "react";
import UserContext from "./auth/UserContext";

const demoUser = {
  username: "tester",
  first_name: "testfirst",
  last_name: "testlast",
  email: "test@test.net",
  isAdmin: true,
};

const UserProvider = ({ children, currentUser = demoUser }) => (
  <UserContext.Provider value={{ currentUser }}>
    {children}
  </UserContext.Provider>
);

export { UserProvider };
