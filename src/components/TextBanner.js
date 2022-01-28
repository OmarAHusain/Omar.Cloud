import React from 'react'
import '../App.css';

const TextBanner = props => {
    const{
        title,
        text
     } = props

    return (
        <div class="banner-box">
            <h1 class="banner-title">{title}</h1>
            <p class="banner-headline">{text}</p>
        </div>
    )
}

export default TextBanner