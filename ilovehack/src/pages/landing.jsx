import { Component } from "react";
import React from "react";
import eventservice from "../lib/event-service.js";
import {Link} from 'react-router-dom'
import { withAuth } from "../lib/AuthProvider";

class Home extends Component {
    state = {
        events: []
    }

    getEvents = async () =>{
        try {
            const theEvents = await this.getAllEvents()
            this.setState({
                events: theEvents
            })
            console.log(theEvents, 'los eventos')
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
                <h1>I <img src='./images/pixel-heart.png' alt='' style={{width: 50}}/> hack</h1>
                <div>
                    <h3>Go to your homepage and see if you have any notifications</h3>
                    <button><Link to={'/login'}>Log in</Link></button>
                </div>

                <div>
                    <h3>Create an account and see who you're most compatible with</h3>
                    <button><Link to={'/signup'}>Sign up</Link></button>
                </div>

                <div>
                    <h3>Go to our events page and join in on the fun</h3>
                    {events.length !== 0 ? events.map((event, index) =>{
                        return <h5 key={index}><Link to={`/event/${event._id}`}>{event.name}</Link></h5>
                    }) : null}
                </div>
            </div>
            
        )
    }
}
export default withAuth(Home);