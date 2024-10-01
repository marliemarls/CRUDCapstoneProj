import React, { useState } from 'react'
import { Link } from 'react-router-dom'


export default function LandingPage() {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const history = useHistory();

  // const handleLogin = () => {
  //   setIsLoggedIn(true);
  //   history.push('/home');
  // }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-400 to-indigo-600 flex flex-col justify-center items-center p-4">
      <div className="text-center mb-8">
        <h1 className="text-5xl font-bold text-white mb-4">Welcome to NextFm</h1>
        <p className="text-xl text-white">Connect, share, and discover music like never before</p>
      </div>
      
      <div className="w-full max-w-md bg-white rounded-lg shadow-xl overflow-hidden">
        <div className="p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Get Started</h2>
          <div className="space-y-4 content-between">
            <Link to="/login" className="btn btn-primary w-full">
              Login
            </Link>
            <Link to="/register" className="btn btn-secondary w-full">
              Register
            </Link>
          </div>
        </div>
      </div>

      <div className="mt-8 text-center">
        <h3 className="text-2xl font-semibold text-white mb-4">Why Join NextFm?</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="bg-white bg-opacity-20 p-4 rounded-lg">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
            </svg>
            <h4 className="text-lg font-semibold text-white mb-2">Share Your Music</h4>
            <p className="text-white">Upload and share your original tracks with the world</p>
          </div>
          <div className="bg-white bg-opacity-20 p-4 rounded-lg">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <h4 className="text-lg font-semibold text-white mb-2">Connect with Artists</h4>
            <p className="text-white">Follow your favorite artists and discover new talent</p>
          </div>
          <div className="bg-white bg-opacity-20 p-4 rounded-lg">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h4 className="text-lg font-semibold text-white mb-2">Discover New Music</h4>
            <p className="text-white">Explore a vast library of tracks from various genres</p>
          </div>
        </div>
      </div>

      <footer className="mt-12 text-white text-center">
        <p>&copy; 2023 NextFm. All rights reserved.</p>
      </footer>
    </div>
  )
}