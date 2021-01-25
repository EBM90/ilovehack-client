import React, { Component } from 'react' 
import "bootstrap/dist/css/bootstrap.min.css";
import Carousel from 'react-bootstrap/Carousel';

export default function Carousel1() {
  
    return (
        <div>
        <Carousel>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src="https://www.ngenespanol.com/wp-content/uploads/2018/08/7-buenas-razones-para-tomar-cerveza.png" height="200"
      alt="First slide"
    />
    <Carousel.Caption>
      <h3>IRON BEERS</h3>
      <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src="https://plantillasdeportivas.es/wp-content/uploads/2018/11/tenis.jpg" height="200"
      alt="Third slide"
    />

    <Carousel.Caption>
      <h3>Second slide label</h3>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src="https://ipleones.cl/wp-content/uploads/2017/11/tec-programador.jpg" height="200"
      alt="Third slide"/>
      
    <Carousel.Caption>
      <h3>Third slide label</h3>
   <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
    </Carousel.Caption>
  </Carousel.Item>
</Carousel> 
        </div>
    )
}
