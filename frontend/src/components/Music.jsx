import React from 'react';
import { Cloudinary } from '@cloudinary/url-gen';

const Music = ({music_url}) => {
  const cld = new Cloudinary({
    cloud: {
      cloudName: 'dy6n13boh'
    }
  });

  const audioUrl = cld.video(music_url).toURL();

  return (
    <div>
      <audio controls className='w-full border-'>
        <source src={audioUrl} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
};


export default Music;