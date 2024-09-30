import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function TrackUpload() {
  const [title, setTitle] = useState('');
  const [artistName, setArtistName] = useState('');
  const [genre, setGenre] = useState('');
  const [audioBase64, setAudioBase64] = useState('');
  const [imageBase64, setImageBase64] = useState('');
  const [error, setError] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const navigate = useNavigate();

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleAudioUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      try {
        const base64String = await convertToBase64(file);
        setAudioBase64(base64String);
      } catch (error) {
        console.error('Error converting audio to base64:', error);
        setError('Failed to process audio file. Please try again.');
      }
    }
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      try {
        const base64String = await convertToBase64(file);
        setImageBase64(base64String);
      } catch (error) {
        console.error('Error converting image to base64:', error);
        setError('Failed to process image file. Please try again.');
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsUploading(true);

    if (!audioBase64 || !imageBase64) {
      setError('Please select both an audio file and an image.');
      setIsUploading(false);
      return;
    }

    const trackData = {
      title,
      artist: artistName,
      genre,
      audioFile: audioBase64,
      imageFile: imageBase64
    };

    try {
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