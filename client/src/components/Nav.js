import React from "react";
import { Link } from "react-router-dom";
import { Button } from "./Button";

const Nav = ({ isSignedIn, handleSignOut }) => {
  return (
    <div>
      <nav className="nav-container">
        <ul className="nav-container__items">
          {!isSignedIn ? (
            <>
              <li className="nav-container__item">
                <Link className="nav-container__link" to="/signin">
                  Sign In
                </Link>
              </li>
              <li className="nav-container__item">
                <Link className="nav-container__link" to="/signup">
                  Sign Up
                </Link>
              </li>
            </>
          ) : (
            <li className="nav-container__item">
              <Button onClick={handleSignOut} text={"Sign Out"}></Button>
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default Nav;
