import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import NotFound from './components/NotFound'; // Page Not Found Component
import Login from './pages/Login'; // Login Page
import ProtectedRoute from './components/ProtectedRoute'; // Route Protection
import { UserProvider } from './context/UserContext'; // User Context for Global State
import Register from './pages/Register'; // Registration Page
import MyBuddies from './pages/MyBuddies'; // Registration Page
import MyMeetings from './pages/MyMeetings'; // MyMeetings Page
import MyChat from './pages/MyChat'; //MyChat Page
import ScheduleAMeeting from './pages/ScheduleAMeeting'; //Schedule a meeting Page
import FriendRequests from './pages/FriendRequests'; //My Friend Requests
import './css/global.css'; // Global Styles
import './css/Spinner.css'; // Modern Spinner Styles
import About from './pages/About';
import Contact from './pages/Contact';
import PersonalChat from './pages/PersonalChat';
import ThankYou from './pages/ThankYou';

// Lazy load components for performance optimization
const HomePage = React.lazy(() => import('./pages/HomePage'));
const MeetNewBuddies = React.lazy(() => import('./pages/MeetNewBuddies'));
const DogProfile = React.lazy(() => import('./pages/DogProfile'));
const MyProfile = React.lazy(() => import('./pages/MyProfile'));

function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/not-found" element={<NotFound />} />
          <Route path="/thank-you" element={<ThankYou />} />

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
                    <Route path="/about" element={<About />} />
                    <Route path="/meet-buddies" element={<MeetNewBuddies />} />
                    <Route path="/dog-profile/:id" element={<DogProfile />} />
                    <Route path="/my-profile" element={<MyProfile />} />
                    <Route path="/my-buddies" element={<MyBuddies />} />
                    <Route path="/my-meetings" element={<MyMeetings />} />
                    <Route
                      path="/friend-requests"
                      element={<FriendRequests />}
                    />
                    <Route path="/my-chat" element={<MyChat />} />
                    <Route
                      path="/schedule-a-meeting"
                      element={<ScheduleAMeeting />}
                    />
                    <Route
                      path="/personal-chat/:chatid"
                      element={<PersonalChat />}
                    />
                    <Route path="/contact" element={<Contact />} />
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
