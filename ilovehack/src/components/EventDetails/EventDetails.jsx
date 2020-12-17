import { Component } from "react";
import React from "react";
import eventservice from "../../lib/event-service";
import profileservice from '../../lib/user-service'

class EventDetail extends Component {
    state = {
        event: {},
        user: {},
    }

    getEvent = async () =>{
        try {
            const {params} = this.props.match
            const theEvent = await eventservice.getTheEvent(params.id)
            const theUser = await profileservice.getUser()
            this.setState({
                event: theEvent,
                user: theUser
            })

        } catch (error) {
            console.log(error)
        }
    }

    componentDidMount(){
        this.getEvent()
    }

    //create components for event if creator and else
    render(){
        const {event, user} = this.state
        return(
            <div className='main'>
                {event.creator && event.creator === user._id ? 
                <div>Hello world!</div> :<> {event.date ? 
                <div>
                    <h1>{event.name}</h1>
                     <p>{event.date.slice(0,16)} {event.location}</p>
                </div>
                   
                : null} </>
                
                
                 } </div>
        )
    }
}
export default EventDetail;