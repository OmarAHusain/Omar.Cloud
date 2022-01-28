import React from 'react'
import {Button} from 'reactstrap'
import '../App.css';

const LinkButton = props => {
    const {
        name,
        title,
        link,
        picture,
        alt
    } = props

    const myStyles =({
        myMargin: {
            margin: "20px"
        },
        btnText: {
            //fontFamily: "Arial",
            margin: "20px",
            fontSize: "18px",
            color: "White",
            textShadow: "1px 1px 5px #000000"
        },
        button: {
            backgroundColor: "rgb(34, 34, 34)",
            color: "white",
            border: "1px solid",
            borderColor: "black",
            borderRadius: "14px",
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
        },
        svg: {
            marginRight: "10px"
        }
    })

    return (
        <div class="link-margin" style={myStyles.myMargin}>
            <h3 class="link-title" style={myStyles.btnText}>{title}</h3>
            <Button color='primary' style={myStyles.button} outline href={link} target="_blank"> 
            <img class="link-pic" src={picture} alt={alt}/>
            {name} 
            </Button>
        </div> 
    )
}

export default LinkButton