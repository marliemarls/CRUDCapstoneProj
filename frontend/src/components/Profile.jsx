import React, { useState, useEffect } from 'react';
import { Navbar } from "./index.js";

function Profile() {
  const [userData, setUserData] = useState(null);
  const [music, setMusic] = useState([]);
  // const [friends, setFriends] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [userResponse, musicResponse] = await Promise.all([
          fetch("http://localhost:8080/api/users"),
          fetch("http://localhost:8080/api/music")
        ]);

        console.log(userResponse)
        if (!userResponse.ok || !musicResponse.ok) {
          throw new Error('Failed to fetch data');
        }

        const userData = await userResponse.json();
        const musicData = await musicResponse.json();


        setUserData(userData);
        setTracks(musicData);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError('Failed to load profile data. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (error) {
    return <div className="flex justify-center items-center h-screen text-red-500">{error}</div>;
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-purple-50 to-pink-50">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h2 className="text-xl font-semibold mb-4">Your Profile</h2>
              <div className="flex items-center space-x-4">
                <img
                  src={userData.avatarUrl || "/placeholder.svg?height=100&width=100"}
                  alt="Profile"
                  className="w-24 h-24 rounded-full object-cover"
                />
                <div>
                  <h3 className="text-lg font-semibold">{userData.name}</h3>
                  <p className="text-gray-600">@{userData.username}</p>
                </div>
              </div>
              <p className="mt-4 text-gray-700">{userData.bio}</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Music Feed</h2>
              <ul className="space-y-4">
                {music.map((song) => (
                  <li key={song.id} className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold">{song.title}</h3>
                      <p className="text-sm text-gray-600">{song.artistName}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button className="text-gray-600 hover:text-purple-600">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                        </svg>
                      </button>
                      <button className="text-gray-600 hover:text-purple-600">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                        </svg>
                      </button>
                      <button className="text-gray-600 hover:text-purple-600">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
                        </svg>
                      </button>
                      {/* <span className="text-sm text-gray-600">{music.duration}</span> */}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div>
            {/* <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h2 className="text-xl font-semibold mb-4">Friends</h2>
              <ul className="space-y-4">
                {friends.map((friend) => (
                  <li key={friend.id} className="flex items-center space-x-3">
                    <img src={friend.avatarUrl || "/placeholder.svg?height=32&width=32"} alt={friend.name} className="w-8 h-8 rounded-full" />
                    <span>{friend.name}</span>
                  </li>
                ))}
              </ul>
              <button className="mt-4 w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 transition duration-300">
                Find More Friends
              </button>
            </div> */}
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
  );
}

export default Profile;