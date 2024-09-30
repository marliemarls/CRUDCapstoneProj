import React, { useState } from 'react'

function ImageUpload() {
    const [base64String, setBase64String] = useState("");

    const handleImageUpload = (event) => {
    const file = event.target.files[0]; // Get the selected file
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result; // This is the base64 string
        setBase64String(base64String); // Store the base64 string in state
        console.log(base64String); // You can see the base64 in the console
      };
      reader.readAsDataURL(file); // Convert image to base64
    }
  };
 

  return (
    <div>ImageUpload</div>
  )
}

export default ImageUpload

