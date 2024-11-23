import React, { createContext, useState } from "react";

// Create the UserContext
export const UserContext = createContext();

// Provide the UserContext to the application
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Default user is null

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
