import React from "react";
import { Link } from "react-router-dom";

function Navbar({ isLoggedIn, handleLogout }) {
  return (
    <>
      {/* <AuthWrapper> */}
      <nav className="text-accent-content p-4 bg-indigo-700">
        <div className="container mx-auto flex justify-between items-center ">
          <div className="flex items-center">
            {isLoggedIn ? (
              <>
                <Link to="/home" className="mr-4 hover:text-keppel ">
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
          {isLoggedIn ? (
            <Link to="/home" className="text-xl font-bold mr-4">
              NextFM
            </Link>
          ) : (
            <Link to="/" className="text-xl font-bold mr-4">
              NextFM
            </Link>
          )}
          <div className="flex items-center">
            {isLoggedIn ? (
              <>
                <Link
                  to="/upload"
                  className="bg-saffron text-onyx px-4 py-2 rounded hover:bg-keppel"
                >
                  Upload
                </Link>
                <Link
                  onClick={handleLogout}
                  className="bg-saffron text-onyx px-4 py-2 rounded hover:bg-keppel"
                  to="/"
                >
                  Logout
                </Link>
              </>
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

            {/* <Theme /> */}
          </div>
        </div>
      </nav>
      {/* </AuthWrapper> */}
    </>
  );
}

export default Navbar;
