import React from 'react'
import '../App.css';

const LinkButton = props => {
    const {
        name,
        title,
        link,
        picture,
        alt
    } = props

    return (
        <div class="link">
            <h3 class="link-title">{title}</h3>
            <a href={link} target="blank"> 
                <div class="link-btn-div row">
                    <div class="link-img-div col">
                        <img class="link-img" src={picture} alt={alt}/>
                    </div>
                    <div class="link-name-div col">
                        {name}
                    </div>
                    <div class="col"> </div>
                </div>
            </a>
        </div> 
    )
}

export default LinkButton