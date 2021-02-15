import React from 'react';
import './Modal.css';

export default function Modal() {
    return (
        <div className="modal-align">
            <div className="container-modal">

                <img className="modal-img" src="images/portfolio/love.jpg" alt="love" width="400rem" />
                <h2>ILOVEHACK</h2> <span className="categories"><i className="fa fa-tag" />App</span>
                <p>With React,Express,NodeJS,MongoDB</p>
                <div className="buttons">
                    <a className="button" href="#be-nice">Log In</a>
                </div>
            </div>



            <div className="modal" id="be-nice">
                <div className="modal-content">
                    <i className="align-btn-portfolio">
                        <a href="#close" className="button">Close</a>
                        <a href="https://i-love-hack.herokuapp.com/" className="button">Log In</a>
                    </i>
                </div>
                <a href="#close" className="background">.</a>
            </div>

        </div>
    )
}
