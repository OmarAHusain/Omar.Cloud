import React from 'react'
import '../App.css';

const SocialButton = props => {
    const {
        link,
        svgpath,
        viewbox
    } = props

    return (
        <div class="social col-2">
            <a href={link} target="blank"> 
                <div class="link-btn-div ">
                    <svg class="social-svg"  xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox={viewbox}><path fill="white" d={svgpath}></path></svg>
                </div>
            </a>
        </div> 
    )
}

export default SocialButton


        // <div class="link">
        //     <h3 class="link-title">{title}</h3>
        //     <a href={link} target="blank"> 
        //         <div class="link-btn-div row">
        //             <div class="link-img-div col">
        //                 <svg class="social-svg"  xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox={viewbox}><path fill="white" d={svgpath}></path></svg>
        //             </div>
        //             <div class="link-name-div col">
        //                 {name}
        //             </div>
        //             <div class="col"></div> 
        //         </div>
        //     </a>
        // </div> 