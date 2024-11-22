import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Import Router
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import MeetNewBuddies from "./pages/MeetNewBuddies"; // Import the new page

function App() {
  return (
    <Router>
      {/* Wrap everything in Router */}
      <Header />
      <Routes>
        {/* Define basic routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/meet-buddies" element={<MeetNewBuddies />} />{" "}
        {/* Add route */}
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
