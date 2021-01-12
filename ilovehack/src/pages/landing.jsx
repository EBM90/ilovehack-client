import { Component } from "react";
import React from "react";
import eventservice from "../lib/event-service.js";
import {Link} from 'react-router-dom'
import { withAuth } from "../lib/AuthProvider";
import './landing.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { Button,Modal } from 'react-bootstrap';
import Carousel1 from "../components/carousel/Carousel";

class Home extends Component {
    state = {
        events: []
    }
    
    getEvents = async () =>{
        try {
            const theEvents = await eventservice.getAllEvents()
            this.setState({
                events: theEvents
            })
        } catch (error) {
            console.log(error)
        }
    }

    componentDidMount(){
        this.getEvents()
    }

    // function Example() {
    //     const [show, setShow] = useState(false);
      
    //     const handleClose = () => setShow(false);
    //     const handleShow = () => setShow(true);
    

    render(){
        const {events} = this.state
        return(
            <div className='main'>
                <h1 className='title'>Hac<span className='kaka'><span id='k'>K</span></span>onnect</h1>
                {/* <div>
                    <h3>Go to your homepage and see if you have any notifications</h3>
                    <button><Link to={'/login'}>Log in</Link></button>
                </div> */}
                {/* <svg id='center' width="108" height="85" viewBox="0 0 108 85" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M53.55 6.375L73.7505 18.0378C77.1883 20.0226 79.3061 23.6907 79.3061 27.6603V57.3303C79.3061 61.2999 77.1883 64.968 73.7505 66.9528L53.55 78.6156L33.3495 66.9528C29.9117 64.968 27.7939 61.2999 27.7939 57.3303V27.6603C27.7939 23.6907 29.9117 20.0226 33.3495 18.0378L53.55 6.375Z" fill="#1E2434"/>
<path id='left' d="M36.9444 3.2075C40.3822 1.22269 44.6178 1.22269 48.0556 3.2075L73.7505 18.0425C77.1883 20.0273 79.3061 23.6954 79.3061 27.665V57.335C79.3061 61.3046 77.1883 64.9727 73.7505 66.9575L48.0556 81.7925C44.6178 83.7773 40.3822 83.7773 36.9444 81.7925L11.2495 66.9575C7.81168 64.9727 5.69392 61.3046 5.69392 57.335V27.665C5.69392 23.6954 7.81169 20.0273 11.2495 18.0425L36.9444 3.2075Z" fill="#2DC5FA"/>
<path id='right' d="M59.0444 3.2075C62.4822 1.22269 66.7177 1.22269 70.1555 3.2075L95.8505 18.0425C99.2883 20.0273 101.406 23.6954 101.406 27.665V57.335C101.406 61.3046 99.2883 64.9727 95.8505 66.9575L70.1555 81.7925C66.7177 83.7773 62.4822 83.7773 59.0444 81.7925L33.3494 66.9575C29.9117 64.9727 27.7939 61.3046 27.7939 57.335V27.665C27.7939 23.6954 29.9117 20.0273 33.3495 18.0425L59.0444 3.2075Z" fill="#1E2434"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M53.55 6.375L73.7505 18.0378C77.1883 20.0226 79.3061 23.6907 79.3061 27.6603V57.3303C79.3061 61.2999 77.1883 64.968 73.7505 66.9528L53.55 78.6156L33.3495 66.9528C29.9117 64.968 27.7939 61.2999 27.7939 57.3303V27.6603C27.7939 23.6907 29.9117 20.0226 33.3495 18.0378L53.55 6.375Z" fill="#EAEAED"/>
</svg> */}
                {/* <div className='secondLogo'>
                    <img src='images/Polygon1.png' alt='polygon1' id='left'></img>
                    <img src='images/Polygon2.png' alt='polygon2' id='right'></img>
                    <img src='images/Polygon3.png' alt='polygon3' id='center'></img>
                </div> */}
                

                <div className="align-landing">
                    <h1 className="landing-title">Hey <span className='highlighted'>IronHacker</span>!</h1>
                    <p className="text landing-text">Do you wanna meet other students with your same
                    hobbies and be aware of all the cool events?</p>
                    <button className="btn_lightblue"><Link className="link-login-landing" to={'/signup'}>Let's Konnect!</Link></button> 
                </div>
                <div>
                    <p className="text">Do you already have an account?  <Link className="links" to={'/login'}>Log in here!</Link></p>
                </div>
                {/* <div>
                    <h3>Latest events</h3>
                    {events.length !== 0 ? events.map((event, index) =>{
                        return <h5 key={index}><Link to={`/event/${event._id}`}>{event.name}</Link></h5>
                    }) : null}
                </div> */}
                <Carousel1 />
            </div>
            
        )
    }
}
export default withAuth(Home);