import { Component } from "react";
import React from "react";
import eventservice from "../../lib/event-service.js";
import EventSlider from '../../components/Event/event'
import Title from '../../components/Title/title'
import {Link} from 'react-router-dom'
import { withAuth } from "../../lib/AuthProvider";
import './landing.css';
import "bootstrap/dist/css/bootstrap.min.css";
// import { Button,Modal } from 'react-bootstrap';

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
    
    
    render(){
        const {events} = this.state
        return(
            <div className='main'>
                <Title />
                <div className="align-landing">
                    <h1 className="landing-title">Hey <span className='highlighted'>IronHacker</span>!</h1>
                    <p className="text landing-text">Do you wanna meet other students with your same
                    hobbies and be aware of all the cool events?</p>
                    <button className="btn_lightblue"><Link className="light-links" to={'/signup'}>Let's Konnect!</Link></button> 
                </div>
                <div>
                    <p className="text">Do you already have an account?  <Link className="links" to={'/login'}>Log in here!</Link></p>
                </div>
                <div className='landing-events'>
                <div className='events-title'><h3 className='landing-title'>Events</h3> <Link to='/all-events' className='links'>See all</Link></div>
                    <EventSlider events={events} />
                </div>
        </div>
        )}
}
export default withAuth(Home);