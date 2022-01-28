import React from 'react'
import {Button} from 'reactstrap'
import '../App.css';

const SocialButton = props => {
    const {
        name,
        title,
        link,
        svgpath,
        viewbox
    } = props

    const myStyles =({
        button: {
            backgroundColor: "black",
            color: "white",
            border: "1px solid",
            borderColor: "white",
            width: "135px",
            display: "inline-block",
            fontSize: "14px",
            fontWeight: "400",
            lineHeight: "1.5",
            textAlign: "left",
            textDecoration: "none",
            verticalAlign: "middle",
            userSelect: "none",
            padding: ".375rem .75rem"
        }
    })

    return (
        <div class="social-margin">
            <h3 class="social-text" >{title}</h3>
            <Button color='primary' style={myStyles.button} outline href={link} target="_blank"> 
            <svg class="social-svg"  xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox={viewbox}><path fill="white" d={svgpath}></path></svg>
            {name} 
            </Button>
        </div> 
    )
}

export default SocialButton