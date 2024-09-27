import React from "react";
import Navbar from "./Navbar.jsx";
import TrackCard from "./TrackCard.jsx";

function Home() {
  return (
    <>
      <div className="flex justify-center">
        {/* <div>Hey this is home page</div> */}
        <TrackCard />
      </div>
    </>
  );
}

export default Home;
