import React from 'react';
import { extractPublicId } from 'cloudinary-build-url'

function Test() {

    const publicId = extractPublicId(
        "https://asset.cloudinary.com/dy6n13boh/bc3f1f0c733e232ebd0ef0c648fb8926"
      ) 
      console.log(publicId)
  return (
    <div>
      Test
      {/* <div>
        5 months
        <img src={link} alt="" />
        <audio controls>
          <source src="https://asset.cloudinary.com/dy6n13boh/dfdb441935a717a3b680943285bb4544" type="audio/mpeg" /> audio not working
        </audio>
      </div> */}
    </div>
  );
}

export default Test;
