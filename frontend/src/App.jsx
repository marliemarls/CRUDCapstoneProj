// import Routes from "./components/Routes.jsx";
import { useState } from "react";
import {  Home, Login, Register, Profile, Navbar, Routes, LandingPage} from "./components/index.js";


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
      <div className="display-flex justify-center items-center align-center bg-gradient-to-b from-purple-400 to-indigo-600">
        {/* < LandingPage /> */}
        <Navbar isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
        <Routes isLoggedIn={isLoggedIn} handleLogin={handleLogin} />
      </div>
    </>
  );
}


// import HomePage from './components/HomePage';

// function App() {
//   return (
//     <Router>
//       <Switch>
//         <Route path="/home" component={HomePage} />
//         <Route path="/" component={LandingPage} />
//       </Switch>
//     </Router>
//   );
// }
