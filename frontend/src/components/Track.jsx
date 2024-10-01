import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Track() {
  const [title, setTitle] = useState("");
  const [artistName, setArtistName] = useState("");
  const [genre, setGenre] = useState("");
  const [audioBase64, setAudioBase64] = useState("");
  const [imageBase64, setImageBase64] = useState("");
  const [error, setError] = useState("");
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
        console.error("Error converting audio to base64:", error);
        setError("Failed to process audio file. Please try again.");
      }
    }
  };
  return (
    <div>
      <audio controls className="w-full border-">
        <source src={audioUrl} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
}

export default Track;
