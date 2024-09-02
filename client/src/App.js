import React, { useEffect, useState } from "react";
import { auth } from "./firebase"; // Import the initialized Firebase Authentication service
import { onAuthStateChanged, signOut } from "firebase/auth";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
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
    <div>
      {user ? (
        <>
          <h1>Welcome, {user.displayName || user.email}</h1>
          <button onClick={handleSignOut}>Sign Out</button>
        </>
      ) : (
        <>
          <SignIn />
          <SignUp />
        </>
      )}
    </div>
  );
};

export default App;
