// import Routes from "./components/Routes.jsx";
import { useState } from "react";
import {  Home, Login, Register, Profile, Navbar, Routes} from "./components/index.js";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <>
      <div className="display-flex justify-center items-center align-center">
        <Navbar isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
        <Routes isLoggedIn={isLoggedIn} handleLogin={handleLogin} />
      </div>
    </>
  );
}
