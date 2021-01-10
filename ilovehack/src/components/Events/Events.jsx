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
        return strArr.reverse().join('/')
    }

    render(){
        const {events} = this.state
        return(
            <div className='main'>
            <h1>All the events</h1>
            <Link to='/add-event' className='links'>Create an event</Link>
            {events && events.length !== 0 ? events.map((event, index) =>{
                return (<div className='event-card' key={index} >
                    <div className='event-image' >
                        <img src={event.imgPath} style={{width:250, height:125, borderTopLeftRadius:'30px', borderTopRightRadius:'30px'}}></img>
                    </div>
                    <div className='event-info'>
                        <div className='event-info-name-location'>
                        <h3 ><Link to={`/event/${event._id}`} className='light-links'>{event.name}</Link></h3>
                        {/* <h5>{event.description}</h5> */}
                        <h5 className='highlighted'>{event.location}</h5>
                        </div>
                        <div className='event-info-date-time'>
                            <h5>{event.date ? this.reverseString(event.date.slice(0,10)) : ""}</h5>
                            <h5>{event.time ? event.time : null}</h5>
                        </div>
                        
                    </div>
                    {/* <div className='event-attending'>
                        <h5>Attending: </h5>
                        {event.attending && event.attending.length !== 0 ? event.attending.map((attendee, index)=>{
                            return <p key={index}><Link to={`/profile/${attendee._id}`}>{attendee.fullname}</Link></p>
                        }): <p>Be the first to join this event!</p>}
                    </div> */}
                    
                    
                   
                </div>)
            }): null}
           </div>
        )
    }
}
export default Event;