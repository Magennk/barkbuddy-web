import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import MeetNewBuddies from "./pages/MeetNewBuddies";
import DogProfile from "./pages/DogProfile";
import Login from "./pages/Login";
import MyProfile from "./pages/MyProfile";
import TestUserContext from "./context/TestUserContext";
import ProtectedRoute from "./components/ProtectedRoute"; // Import ProtectedRoute
import { UserProvider } from "./context/UserContext"; // Import UserProvider
import "./css/global.css";

function App() {
  return (
    // Provide global user state with UserProvider
    <UserProvider>
      <Router>
        <Header /> {/* Common Header */}
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} /> {/* Home Page */}
          <Route path="/login" element={<Login />} /> {/* Login Page */}
          <Route path="/test-user-context" element={<TestUserContext />} />
          {/* Protected Routes */}
          <Route
            path="/*"
            element={
              <ProtectedRoute>
                <Routes>
                  <Route path="/meet-buddies" element={<MeetNewBuddies />} />
                  <Route path="/dog-profile/:id" element={<DogProfile />} />
                  <Route path="/my-profile" element={<MyProfile />} />
                  {/* Add more protected pages here */}
                </Routes>
              </ProtectedRoute>
            }
          />
        </Routes>
        <Footer /> {/* Common Footer */}
      </Router>
    </UserProvider>
  );
}

export default App;
