import React from 'react'
import { Cloudinary } from '@cloudinary/url-gen';
import { AdvancedImage } from '@cloudinary/react';
import { fill } from '@cloudinary/url-gen/actions/resize';


const TrackCard = ({image_url}) => {
  const cld = new Cloudinary({ cloud: { cloudName: 'dy6n13boh' } });
  

  // Use this sample image or upload your own via the Media Explorer
  const img = cld
        .image(image_url)

  return (<AdvancedImage cldImg={img}/>);

}

export default TrackCard;