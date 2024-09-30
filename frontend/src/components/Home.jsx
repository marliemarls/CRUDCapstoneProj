import React from "react";
import Navbar from "./Navbar.jsx";
import TrackCard from "./TrackCard.jsx";

function Home() {
  return (
    <>
      <div className="display-flex justify-center">
        <h1 className="text-center text-3xl font-bold">Welcome</h1>
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

export default Home;
