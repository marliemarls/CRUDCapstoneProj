import React from 'react'
import { Cloudinary } from '@cloudinary/url-gen';
import { AdvancedImage } from '@cloudinary/react';
import { fill } from '@cloudinary/url-gen/actions/resize';


const TrackCard = ({image_url}) => {
  const cld = new Cloudinary({ cloud: { cloudName: 'dy6n13boh' } });
  
  // Use this sample image or upload your own via the Media Explorer
  const img = cld
        .image(image_url)
        .format('auto') // Optimize delivery by resizing and applying auto-format and auto-quality
        .quality('auto')
        .resize(
          fill()); // Transform the image: auto-crop to square aspect_ratio

  return (<AdvancedImage cldImg={img}/>);

}

export default TrackCard;