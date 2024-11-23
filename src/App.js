import React, { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import NotFound from "./components/NotFound";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute"; // Import ProtectedRoute
import { UserProvider } from "./context/UserContext"; // Import UserProvider
import Register from "./pages/Register";
import "./css/global.css";
import "./css/Spinner.css";

// Lazy load components for better performance
const HomePage = React.lazy(() => import("./pages/HomePage"));
const MeetNewBuddies = React.lazy(() => import("./pages/MeetNewBuddies"));
const DogProfile = React.lazy(() => import("./pages/DogProfile"));
const MyProfile = React.lazy(() => import("./pages/MyProfile"));

function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          {/* Public Route */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {/* Protected Routes */}
          <Route
            path="/*"
            element={
              <ProtectedRoute>
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
