import React, { useState, createContext, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Landing } from './components/Landing';
import { LoginSignup } from './components/LoginSignup';
import { UserProfile } from './components/UserProfile';
import { Listings } from './components/Listings';
import { ListingDetails } from './components/ListingDetails';
import { Booking } from './components/Booking';
import { MyBookings } from './components/MyBookings';
import { RoommatesListing } from './components/RoommatesListing';
import { RoommateProfile } from './components/RoommateProfile';
import { PostRoommateRequest } from './components/PostRoommateRequest';
import { Navbar } from './components/Navbar';

// Auth Context
const AuthContext = createContext(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

function App() {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      <Router>
        <div className="min-h-screen bg-background">
          <Navbar />
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/auth" element={<LoginSignup />} />
            <Route path="/profile" element={isAuthenticated ? <UserProfile /> : <Navigate to="/auth" />} />
            <Route path="/listings" element={<Listings />} />
            <Route path="/listing/:id" element={<ListingDetails />} />
            <Route path="/booking/:id" element={isAuthenticated ? <Booking /> : <Navigate to="/auth" />} />
            <Route path="/my-bookings" element={isAuthenticated ? <MyBookings /> : <Navigate to="/auth" />} />
            <Route path="/roommates" element={<RoommatesListing />} />
            <Route path="/roommate/:id" element={<RoommateProfile />} />
            <Route path="/post-roommate" element={isAuthenticated ? <PostRoommateRequest /> : <Navigate to="/auth" />} />
            {/* Catch-all route for unmatched paths */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;