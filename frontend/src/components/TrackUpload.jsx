import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function TrackUpload() {
  const [title, setTitle] = useState('');
  const [artistName, setArtistName] = useState('');
  const [genre, setGenre] = useState('');
  const [audioFile, setAudioFile] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [error, setError] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [allMusic, setAllMusic] = useState([]);
  
  const navigate = useNavigate();

//   useEffect(() => {
//     fetchAllMusic();
//   }, []);

//   const fetchAllMusic = async () => {
//     try {
//       const response = await fetch('http://localhost:8080/api/music/allMusic');
//       if (!response.ok) {
//         throw new Error('Failed to fetch music');
//       }
//       const data = await response.json();
//       setAllMusic(data);
//     } catch (error) {
//       console.error('Error fetching music:', error);
//       setError('Failed to load existing music. Please try again later.');
//     }
//   };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsUploading(true);

    if (!audioFile || !imageFile) {
      setError('Please select both an audio file and an image.');
      setIsUploading(false);
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('artist', artistName);
    formData.append('genre', genre);
    formData.append('audioFile', audioFile);
    formData.append('imageFile', imageFile);

    try {
      // Assuming an upload endpoint will be added to the backend
      const response = await fetch('http://localhost:8080/api/music/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      const result = await response.json();
      console.log('Upload successful:', result);
    //   fetchAllMusic(); // Refresh the music list
      navigate('/profile'); // Redirect to profile page after successful upload
    } catch (error) {
      console.error('Upload error:', error);
      setError('An error occurred during upload. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md px-8 py-6 mt-4 text-left bg-white shadow-lg rounded-lg">
        <h3 className="text-2xl font-bold text-center text-keppel mb-4">Upload Track</h3>
        <form onSubmit={handleSubmit}>
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          <div className="mt-4">
            <div className="mb-4">
              <label htmlFor="title" className="block text-sm font-medium text-onyx">
                Title
              </label>
              <input
                type="text"
                id="title"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-keppel"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="artistName" className="block text-sm font-medium text-onyx">
                Artist Name
              </label>
              <input
                type="text"
                id="artist"
                required
                value={artistName}
                onChange={(e) => setArtistName(e.target.value)}
                className="w-full px-3 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-keppel"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="genre" className="block text-sm font-medium text-onyx">
                Genre
              </label>
              <input
                type="text"
                id="genre"
                required
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
                className="w-full px-3 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-keppel"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="audioFile" className="block text-sm font-medium text-onyx">
                Audio File
              </label>
              <input
                type="file"
                id="audioFile"
                accept="audio/*"
                required
                onChange={(e) => setAudioFile(e.target.files[0])}
                className="w-full px-3 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-keppel"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="imageFile" className="block text-sm font-medium text-onyx">
                Cover Image
              </label>
              <input
                type="file"
                id="imageFile"
                accept="image/*"
                required
                onChange={(e) => setImageFile(e.target.files[0])}
                className="w-full px-3 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-keppel"
              />
            </div>
            <div className="flex items-baseline justify-between">
              <button
                type="submit"
                disabled={isUploading}
                className="btn btn-primary w-full px-6 py-2 mt-4 text-white bg-saffron rounded-lg hover:bg-keppel disabled:opacity-50"
              >
                {isUploading ? 'Uploading...' : 'Upload Track'}
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* <div className="w-full max-w-md mt-8 bg-white shadow-lg rounded-lg overflow-hidden">
        <h4 className="text-xl font-bold text-center text-keppel py-4">All Music</h4>
        <ul className="divide-y divide-gray-200">
          {allMusic.map((music) => (
            <li key={music.id} className="px-6 py-4">
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <img className="h-8 w-8 rounded-full" src={music.imageUrl || '/placeholder.svg'} alt={music.title} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{music.title}</p>
                  <p className="text-sm text-gray-500 truncate">{music.artist}</p>
                </div>
                <div>
                  <a href="#" className="inline-flex items-center shadow-sm px-2.5 py-0.5 border border-gray-300 text-sm leading-5 font-medium rounded-full text-gray-700 bg-white hover:bg-gray-50">
                    View
                  </a>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div> */}

    </div>
  );
}

export default TrackUpload;