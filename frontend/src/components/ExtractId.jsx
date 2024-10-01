import { extractPublicId } from 'cloudinary-build-url'
import React from 'react'

function ExtractId({url}) {

    const publicId = extractPublicId(
        "https://asset.cloudinary.com/dy6n13boh/bc3f1f0c733e232ebd0ef0c648fb8926"
      ) 
  return (
    <div>ExtractId</div>
  )
}

export default ExtractId