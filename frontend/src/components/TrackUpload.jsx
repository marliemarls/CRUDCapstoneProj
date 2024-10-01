import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function TrackUpload() {
  const [title, setTitle] = useState('');
  const [artistName, setArtistName] = useState('');
  const [genre, setGenre] = useState('');
  const [audioFile, setAudioFile] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [error, setError] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  
  const navigate = useNavigate();

  const uploadAudioToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'ioytcjyz'); // Replace with your actual upload preset
    formData.append('cloud_name', 'dy6n13boh');

    try {
      const response = await fetch('https://api.cloudinary.com/v1_1/dy6n13boh/video/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Audio upload to Cloudinary failed');
      }

      const data = await response.json();
      return data.secure_url;
    } catch (error) {
      console.error('Cloudinary audio upload error:', error);
      throw error;
    }
  };

  const uploadImageToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'ofxexmap'); // Replace with your actual upload preset
    formData.append('cloud_name', 'dy6n13boh');

    try {
      const response = await fetch('https://api.cloudinary.com/v1_1/dy6n13boh/image/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Image upload to Cloudinary failed');
      }

      const data = await response.json();
      return data.secure_url;
    } catch (error) {
      console.error('Cloudinary image upload error:', error);
      throw error;
    }
  };

  const handleAudioUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setAudioFile(file);
    }
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImageFile(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsUploading(true);

    if (!audioFile || !imageFile) {
      setError('Please select both an audio file and an image.');
      setIsUploading(false);
      return;
    }

    try {
      const audioUrl = await uploadAudioToCloudinary(audioFile);
      const imageUrl = await uploadImageToCloudinary(imageFile);

      const trackData = {
        title,
        artist: artistName,
        genre,
        audioFile: audioUrl,
        imageFile: imageUrl
      };

      console.log(trackData)
      const response = await fetch('http://localhost:8080/api/music/upload', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(trackData),
      });

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      const result = await response.json();
      console.log('Upload successful:', result);
      navigate('/profile');
    } catch (error) {
      console.error('Upload error:', error);
      setError('An error occurred during upload. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="w-full max-w-md px-8 py-6 mt-4 text-left bg-white shadow-lg rounded-lg">
      <h3 className="text-2xl font-bold text-center text-primary mb-4">Upload Track</h3>
      <form onSubmit={handleSubmit}>
        {error && <p className="text-error text-center mb-4">{error}</p>}
        <div className="mt-4">
          <div className="form-control w-full mb-4">
            <label className="label" htmlFor="title">
              <span className="label-text">Title</span>
            </label>
            <input
              type="text"
              id="title"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="input input-bordered w-full"
            />
          </div>
          <div className="form-control w-full mb-4">
            <label className="label" htmlFor="artistName">
              <span className="label-text">Artist Name</span>
            </label>
            <input
              type="text"
              id="artistName"
              required
              value={artistName}
              onChange={(e) => setArtistName(e.target.value)}
              className="input input-bordered w-full"
            />
          </div>
          <div className="form-control w-full mb-4">
            <label className="label" htmlFor="genre">
              <span className="label-text">Genre</span>
            </label>
            <input
              type="text"
              id="genre"
              required
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
              className="input input-bordered w-full"
            />
          </div>
          <div className="form-control w-full mb-4">
            <label className="label" htmlFor="audioFile">
              <span className="label-text">Audio File</span>
            </label>
            <input
              type="file"
              id="audioFile"
              accept="audio/*"
              required
              onChange={handleAudioUpload}
              className="file-input file-input-bordered w-full"
            />
          </div>
          <div className="form-control w-full mb-4">
            <label className="label" htmlFor="imageFile">
              <span className="label-text">Cover Image</span>
            </label>
            <input
              type="file"
              id="imageFile"
              accept="image/*"
              required
              onChange={handleImageUpload}
              className="file-input file-input-bordered w-full"
            />
          </div>
          <div className="form-control w-full">
            <button
              type="submit"
              disabled={isUploading}
              className="btn btn-primary w-full"
            >
              {isUploading ? 'Uploading...' : 'Upload Track'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}