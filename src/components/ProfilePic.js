import React from 'react'

const ProfilePic = props => {
    const {
        picture
    } = props
    
    return (
        <img style={{"borderRadius": "200"}} src={picture} alt='ProfilePic'/>
    )
}

export default ProfilePic