import React, { useState, useEffect } from 'react';

function Profile() {
  const [userData, setUserData] = useState(null);
  const [music, setMusic] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentUser, setCurrentUser] = useState("");
  const [musicId, setMusicId] = useState([]);

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem('user'));
    const userId = currentUser.id;
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const musicResponse = await fetch(`http://localhost:8080/api/users/${userId}/getMyMusic`);
        setCurrentUser(currentUser);
        if (!musicResponse.ok) {
          throw new Error('Failed to fetch data');
        }
        const musicData = await musicResponse.json();
        // const newArr = musicData.map((song) => setMusicId(song.id))
        // console.log(newArr)
        setMusic(musicData);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError('Failed to load profile data. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleDelete = async (musicId) => {
    try {
      const response = await fetch(`http://localhost:8080/api/deleteMusic/${musicId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete music');
      }
      setMusic(music.filter(song => song.id !== musicId));
    } catch (error) {
      console.error("Error deleting music:", error);
      setError('Failed to delete music. Please try again later.');
    }
  };

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (error) {
    return <div className="flex justify-center items-center h-screen text-red-500">{error}</div>;
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-purple-50 to-pink-50">
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h2 className="text-xl font-semibold mb-4">Your Profile</h2>
              <div className="flex items-center space-x-4">
                <div>
                  <h3 className="text-lg font-semibold">{currentUser.name}</h3>
                  <p className="text-gray-600">@{currentUser.username}</p>
                </div>
              </div>
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
                      <button className="text-gray-600 hover:text-purple-600" onClick={() => handleDelete(song.id)}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </main>
      <footer className="bg-white shadow-md mt-8">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-600">© 2023 MusicSocial. All rights reserved.</div>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-600 hover:text-purple-600"> Terms </a>
              <a href="#" className="text-gray-600 hover:text-purple-600"> Privacy </a>
              <a href="#" className="text-gray-600 hover:text-purple-600"> Help </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Profile;
