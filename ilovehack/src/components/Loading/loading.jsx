import React from 'react'
import './loading.css'

export default function loading() {
    return (
        <div className='main'> 
            <div className='secondLogo'>
                    <img src='images/Polygon1.png' alt='polygon1' id='left'></img>
                    <img src='images/Polygon2.png' alt='polygon2' id='right'></img>
                    <img src='images/Polygon3.png' alt='polygon3' id='center'></img>
            </div>
        </div>
    )
}
