import { Component } from "react";
import React from "react";
import eventservice from "../../lib/event-service";
import {Link} from 'react-router-dom'
import './Events.css'

class Event extends Component {
    state = {
        events: []
    }

    getEvents = async () =>{
        try {
            const theEvents = await eventservice.getAllEvents()
            this.setState({
                events: theEvents
            })
            console.log(theEvents)
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
            <h1>All the events</h1>
            <Link to='/add-event' className='create'>Create an event</Link>
            {events && events.length !== 0 ? events.map((event, index) =>{
                return (<div className='event' key={index}>
                    <h3><Link to={`/event/${event._id}`}>{event.name}</Link></h3>
                    <h5>{event.date.slice(0,16)}</h5>
                    <h5>{event.location}</h5>
                </div>)
            }): null}
           </div>
        )
    }
}
export default Event;