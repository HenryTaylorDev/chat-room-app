import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { auth } from "./firebase"; // Import the initialized Firebase Authentication service
import { onAuthStateChanged, signOut } from "firebase/auth";

import "./App.scss";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import Home from "./components/Home"; // Assuming you have a Home component for authenticated users
import Nav from "./components/Nav";

const App = () => {
  const [user, setUser] = useState(null);
  const [signedIn, setSignedIn] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setSignedIn(true);
      } else {
        setUser(null);
        setSignedIn(false);
      }
    });

    return () => unsubscribe(); // Cleanup subscription on unmount
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      alert("Sign-out successful");
    } catch (err) {
      console.error("Error signing out:", err.message);
    }
  };

  return (
    <Router>
      <div>
        <Nav isSignedIn={signedIn} handleSignOut={handleSignOut} />
        {user ? (
          <>
            <h1>Welcome, {user.displayName || user.email}</h1>
            <Routes>
              <Route path="/" element={<Home />} />{" "}
            </Routes>
          </>
        ) : (
          <Routes>
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/" element={<SignIn />} />{" "}
            {/* Redirect to SignIn as default */}
          </Routes>
        )}
        {/* Add navigation links */}
      </div>
    </Router>
  );
};

export default App;
