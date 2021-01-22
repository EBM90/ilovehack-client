import { Component } from "react";
import React from "react";
import eventservice from "../../lib/event-service";
import Event from '../Event/event'
import {Link} from 'react-router-dom'
import './Events.css'

class Events extends Component {
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
                <Event events={events} />
           </div>
        )
    }
}
export default Events;