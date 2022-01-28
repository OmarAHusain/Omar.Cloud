import React from 'react'
import '../App.css';

const ProfilePic = props => {
    const {
        picture,
        alt
    } = props
    
    return (
        <div>            
            <img class="profile-pic" src={picture} alt={alt}/>
        </div>
    )
}

export default ProfilePic