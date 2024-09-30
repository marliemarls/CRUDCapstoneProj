import { Navbar } from "./index.js";
import React, { useState, useEffect } from 'react';

function Profile() {
const [currentTrack, setCurrentTrack] = useState(null);
const [myData, setMyData] = useState([]);

useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/users");
      const data = await response.json();
      console.log(data)
      setMyData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  fetchData();
}, []);

  const tracks = [
    { id: 1, title: 'Summer Vibes', artist: 'Chill Beats', duration: '3:45' },
    { id: 2, title: 'Midnight Jazz', artist: 'Smooth Sax', duration: '4:20' },
    { id: 3, title: 'Electric Dreams', artist: 'Synth Wave', duration: '3:15' },
  ]

  const friends = [
    { id: 1, name: 'Alex', avatar: '/placeholder.svg?height=32&width=32' },
    { id: 2, name: 'Sam', avatar: '/placeholder.svg?height=32&width=32' },
    { id: 3, name: 'Jordan', avatar: '/placeholder.svg?height=32&width=32' },
  ]

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-purple-50 to-pink-50">
      <header className="bg-white shadow-sm">
        {/* <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-purple-600">MusicSocial</h1>
        </div> */}
      </header>
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h2 className="text-xl font-semibold mb-4">Your Profile</h2>
              <div className="flex items-center space-x-4">
                <img
                  src="/placeholder.svg?height=100&width=100"
                  alt="Profile"
                  className="w-24 h-24 rounded-full object-cover"
                />
                <div>
                  <h3 className="text-lg font-semibold"></h3>
                  <p className="text-gray-600">@username</p>
                </div>
              </div>
              <p className="mt-4 text-gray-700">Your bio goes here. Express yourself and share your music taste!</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Music Feed</h2>
              <ul className="space-y-4">
                {tracks.map((track) => (
                  <li key={track.id} className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold">{track.title}</h3>
                      <p className="text-sm text-gray-600">{track.artist}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button className="text-gray-600 hover:text-purple-600">
                      
                      </button>
                      <button className="text-gray-600 hover:text-purple-600">
                        
                      </button>
                      <button className="text-gray-600 hover:text-purple-600">
                        
                      </button>
                      <span className="text-sm text-gray-600">{track.duration}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div>
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h2 className="text-xl font-semibold mb-4">Friends</h2>
              <ul className="space-y-4">
                {friends.map((friend) => (
                  <li key={friend.id} className="flex items-center space-x-3">
                    <img src={friend.avatar} alt={friend.name} className="w-8 h-8 rounded-full" />
                    <span>{friend.name}</span>
                  </li>
                ))}
              </ul>
              <button className="mt-4 w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 transition duration-300">
                Find More Friends
              </button>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Customize Your Profile</h2>
              <button className="w-full bg-pink-500 text-white py-2 rounded-md hover:bg-pink-600 transition duration-300 mb-2">
                Change Background
              </button>
              <button className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300">
                Edit Layout
              </button>
            </div>
          </div>
        </div>
      </main>
      <footer className="bg-white shadow-md mt-8">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-600">© 2023 MusicSocial. All rights reserved.</div>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-600 hover:text-purple-600">
                Terms
              </a>
              <a href="#" className="text-gray-600 hover:text-purple-600">
                Privacy
              </a>
              <a href="#" className="text-gray-600 hover:text-purple-600">
                Help
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Profile