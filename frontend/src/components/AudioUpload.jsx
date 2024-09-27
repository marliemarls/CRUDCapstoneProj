import React, { useState } from 'react';
import axios from 'axios';

const AudioUpload = () => {
  const [audioUrl, setAudioUrl] = useState('');

  const handleUpload = async (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'your_upload_preset'); // Replace with your upload preset

    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/dy6n13boh/video/upload`, // Replace with your Cloud Name
        formData
      );
      setAudioUrl(response.data.secure_url);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (
    <div>
      <input type="file" accept="audio/*" onChange={handleUpload} />
      {audioUrl && <audio controls src={audioUrl}></audio>}
    </div>
  );
};

export default AudioUpload;
