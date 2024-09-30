// import Routes from "./components/Routes.jsx";
import { useState } from "react";
import {
  Home,
  Login,
  Register,
  Profile,
  Navbar,
  Routes,
} from "./components/index.js";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

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
        <Router>
          <Switch>
            <Route path="/home" component={HomePage} />
            <Route path="/" component={LandingPage} />
          </Switch>
        </Router>
      </div>
    </>
  );
}
