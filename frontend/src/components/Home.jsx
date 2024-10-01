import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar.jsx";
import Test from "./Test.jsx";
import TrackCard from "./TrackCard.jsx";

function Home(isLoggedIn) {
  // const [isLoggedIn, setIsLoggedIn] = useState(false);

  // const handleLogin = () => {
  //   setIsLoggedIn(true);
  // };

  const navi = useNavigate();
  const handleRedi = (e) => {
     navi('/');
     }

     if (isLoggedIn) {
      return ( <>
      <div className="display-flex justify-center">
        <h1 className="text-center text-3xl font-bold">Welcome Back!</h1>
        <div className="glass h-40 w-full display-flex justify-center text-center">Glass</div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 container mx-auto px-4 py-8 text-center">
          <div>hi</div>
          <div>hi</div>
        </div>
        <div></div>

        <TrackCard />
      </div>

     </>)} else {

  return (
    
    <>


      <div className="display-flex justify-center">
        <h1 className="text-center text-3xl font-bold">Welcome Back!</h1>
        <div className="glass h-40 w-full display-flex justify-center text-center">Glass</div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 container mx-auto px-4 py-8 text-center">
          <div>hi</div>
          <div>hi</div>
        </div>
        <div></div>

        <TrackCard />
      </div>
    </>
  );
}
}
export default Home;
