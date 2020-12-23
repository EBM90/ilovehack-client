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
                events: theEvents.sort((a,b)=>{
                    if(a.date < b.date){
                        return -1
                    } else {
                        return 1
                    }
                }),
            })
        } catch (error) {
            console.log(error)
        }
    }

    componentDidMount(){
        this.getEvents()
    }

    reverseString(str) {
        let strArr = str.split('-')
        return strArr.reverse().join('-')
    }

    render(){
        const {events} = this.state
        return(
            <div className='main'>
            <h1>All the events</h1>
            <Link to='/add-event' className='create'>Create an event</Link>
            {events && events.length !== 0 ? events.map((event, index) =>{
                return (<div className='event' key={index} style={{backgroundImage: `url(${event.imgPath})`}}>
                    <h3><Link to={`/event/${event._id}`}>{event.name}</Link></h3>
                    <h5>{event.description}</h5>
                    <h5>{event.location}</h5>
                    <h5>{event.date ? this.reverseString(event.date.slice(0,10)) : ""}</h5>
                    <h5>{event.time ? event.time : null}</h5>
                    <h5>Attending: </h5>
                    {event.attending && event.attending.length !== 0 ? event.attending.map((attendee, index)=>{
                        return <p key={index}><Link to={`/profile/${attendee._id}`}>{attendee.fullname}</Link></p>
                    }): <p>Be the first to join this event!</p>}
                   
                </div>)
            }): null}
           </div>
        )
    }
}
export default Event;