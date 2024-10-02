import React, { useState } from "react";
import TrackCard from "./TrackCard.jsx";

function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-400 to-indigo-600 p-4">
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-center text-4xl font-bold text-white mb-8">Welcome Back!</h1>
        
        <div className="glass w-full max-w-4xl h-40 flex items-center justify-center text-center mb-8 bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg rounded-xl">
          <p className="text-2xl text-white">Discover and Share Music on NextFM</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 container mx-auto px-4 py-8 text-center justify-center">
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title justify-center">Featured Artists</h2>
              <p>Discover trending artists in your favorite genres</p>
            </div>
          </div>
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title justify-center">New Releases</h2>
              <p>Stay up-to-date with the latest music releases</p>
            </div>
          </div>
        </div>
        
        <div className="w-full max-w-6xl mt-8">
          <h3 className="text-2xl font-semibold text-white mb-6 text-center">Featured Tracks</h3>
          {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"> */}
            <TrackCard />
          {/* </div> */}
        </div>
      </div>
    </div>
  );
}

export default Home;