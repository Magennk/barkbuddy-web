import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Import Router
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import MeetNewBuddies from "./pages/MeetNewBuddies"; // Import the MeetNewBuddies page
import DogProfile from "./pages/DogProfile"; // DogProfile page
import "./css/global.css"; // Import globa  CSS

function App() {
  return (
    <Router>
      {/* Wrap everything in Router */}
      <Header />
      <Routes>
        {/* Define basic routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/meet-buddies" element={<MeetNewBuddies />} />{" "}
        <Route path="/dog-profile/:id" element={<DogProfile />} />{" "}
        {/* Dog Profile */}
        {/* Add route */}
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
