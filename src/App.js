import React, { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import NotFound from "./components/NotFound"; // Page Not Found Component
import Login from "./pages/Login"; // Login Page
import ProtectedRoute from "./components/ProtectedRoute"; // Route Protection
import { UserProvider } from "./context/UserContext"; // User Context for Global State
import Register from "./pages/Register"; // Registration Page
import MyBuddies from "./pages/MyBuddies"; // Registration Page
import MyMeetings from "./pages/MyMeetings"; // My Meetings Page
import "./css/global.css"; // Global Styles
import "./css/Spinner.css"; // Modern Spinner Styles

// Lazy load components for performance optimization
const HomePage = React.lazy(() => import("./pages/HomePage"));
const MeetNewBuddies = React.lazy(() => import("./pages/MeetNewBuddies"));
const DogProfile = React.lazy(() => import("./pages/DogProfile"));
const MyProfile = React.lazy(() => import("./pages/MyProfile"));

function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/not-found" element={<NotFound />} />

          {/* Protected Routes */}
          <Route
            path="/*"
            element={
              <ProtectedRoute>
                {/* Components available only to authenticated users */}
                <Header />
                <Suspense
                  fallback={
                    <div className="spinner-container">
                      <div className="spinner"></div>
                    </div>
                  }
                >
                  <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/meet-buddies" element={<MeetNewBuddies />} />
                    <Route path="/dog-profile/:id" element={<DogProfile />} />
                    <Route path="/my-profile" element={<MyProfile />} />
                    <Route path="/my-buddies" element={<MyBuddies />} />
                    <Route path="/my-meetings" element={<MyMeetings />} />
                  </Routes>
                </Suspense>
                <Footer />
              </ProtectedRoute>
            }
          />
          {/* Fallback Route for Non-Existent Pages */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
