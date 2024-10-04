import React, { useState } from 'react'

function EditProfile() {
    const [profilePhoto, setProfilePhoto] = useState("");
    const [bio, setBio] = useState("");
    const [gender, setGender] = useState("");
    const [birthday, setBirthday] = useState("");
    
    return (
    <div>EditProfile</div>
  )
}

export default EditProfile