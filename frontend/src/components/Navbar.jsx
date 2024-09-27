import React from "react";
import { Link } from "react-router-dom";
import Theme from "./Theme.jsx";
import { Home, Profile, Login } from "./index.js";

function Navbar({ isLoggedIn, handleLogout }) {
  return (
    <nav className="bg-onyx text-platinum p-4">
      <div className="container mx-auto flex justify-between items-center ">
        <div className="flex items-center">
          {isLoggedIn ? (
            <>
              <Link to="/" className="mr-4 hover:text-keppel">
                Home
              </Link>
              <Link to="/profile" className="mr-4 hover:text-keppel">
                Profile
              </Link>
            </>
          ) : (
            <Link to="/" className="mr-4 hover:text-keppel">
              Home
            </Link>
          )}
        </div>
        <Link to="/" className="text-xl font-bold mr-4">
          NextFM
        </Link>
        <div className="flex items-center">
          <Link to="/playlist" className="mr-4 hover:text-keppel">
            🎧 Playlist
          </Link>
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="bg-saffron text-onyx px-4 py-2 rounded hover:bg-keppel"
            >
              Logout
            </button>
          ) : (
            <>
              <Link
                to="/login"
                className="bg-saffron text-onyx px-4 py-2 rounded hover:bg-keppel"
              >
                Login
              </Link>
              
              <Link
                to="/register"
                className="bg-saffron text-onyx px-4 py-2 rounded hover:bg-keppel"
              >
                Register
              </Link>
            </>
          )}
          <Theme />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
