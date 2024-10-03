import React, { useState, useEffect } from 'react';
import { UserTracks } from '.';

export default function Profile() {
  const [music, setMusic] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [editingTrack, setEditingTrack] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const currentUser = JSON.parse(localStorage.getItem('user'));
        setCurrentUser(currentUser);
        const userId = currentUser.id;
        const musicResponse = await fetch(`http://localhost:8080/api/users/${userId}/getMyMusic`);
        if (!musicResponse.ok) {
          throw new Error('Failed to fetch data');
        }
        const musicData = await musicResponse.json();
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
      const response = await fetch(`http://localhost:8080/api/users/deleteMusic/${musicId}`, {
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

  const handleEdit = (track) => {
    setEditingTrack({ ...track });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:8080/api/users/editMusic/${editingTrack.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editingTrack),
      });
      if (!response.ok) {
        throw new Error('Failed to update music');
      }
      const updatedTrack = await response.json();
      setMusic(music.map(song => song.id === updatedTrack.id ? updatedTrack : song));
      setEditingTrack(null);
    } catch (error) {
      console.error("Error updating music:", error);
      setError('Failed to update music. Please try again later.');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditingTrack(prev => ({ ...prev, [name]: value }));
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
                  <h3 className="text-lg font-semibold">{currentUser?.name}</h3>
                  <p className="text-gray-600">@{currentUser?.username}</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6 m-6">
              <h2 className="text-xl font-semibold mb-4">Music Feed</h2>
              <ul className="space-y-4">
                {music.map((song) => (
                  <li key={song.id} className="flex items-center justify-between">
                    {editingTrack && editingTrack.id === song.id ? (
                      <form onSubmit={handleUpdate} className="w-full">
                        <input
                          type="text"
                          name="title"
                          value={editingTrack.title}
                          onChange={handleInputChange}
                          className="w-full mb-2 p-2 border rounded"
                        />
                        <input
                          type="text"
                          name="artistName"
                          value={editingTrack.artistName}
                          onChange={handleInputChange}
                          className="w-full mb-2 p-2 border rounded"
                        />
                        <div className="flex justify-end space-x-2">
                          <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">Save</button>
                          <button onClick={() => setEditingTrack(null)} className="bg-gray-500 text-white px-4 py-2 rounded">Cancel</button>
                        </div>
                      </form>
                    ) : (
                      <>
                        <div>
                          <h3 className="font-semibold">{song.title}</h3>
                          <p className="text-sm text-gray-600">{song.artistName}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button className="text-gray-600 hover:text-purple-600" onClick={() => handleEdit(song)}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                            </svg>
                          </button>
                          <button className="text-gray-600 hover:text-red-600" onClick={() => handleDelete(song.id)}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                          </button>
                        </div>
                      </>
                    )}
                  </li>
                ))}
              </ul>
            </div>
            <div className=''>
            <h2 className="text-xl font-semibold mb-4 text-center pt-5 ">Recent Tracks</h2>
                <UserTracks />
            </div>
          </div>
        </div>
      </main>
      <footer className="bg-white shadow-md mt-8">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-600">© 2023 NextFm. All rights reserved.</div>
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