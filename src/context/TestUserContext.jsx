import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";

function TestUserContext() {
  const { user, setUser } = useContext(UserContext);

  const handleSetUser = () => {
    setUser({ name: "Test User", email: "test@example.com" }); // Set test user data
  };

  return (
    <div>
      <h3>Test User Context</h3>
      <p>
        <strong>Current User:</strong>{" "}
        {user ? `${user.name} (${user.email})` : "No user logged in"}
      </p>
      <button onClick={handleSetUser}>Set Test User</button>
    </div>
  );
}

export default TestUserContext;
