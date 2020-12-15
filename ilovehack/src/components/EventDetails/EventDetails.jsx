import { Component } from "react";
import React from "react";
import eventservice from "../../lib/event-service";
import profileservice from '../../lib/user-service';
import Creator from './Creator'
import Attending from './Attending'

class EventDetail extends Component {
    state = {
        event: {},
        user: {},
    }

    getEvent = async () =>{
        try {
            console.log(this.props.match)
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
            <Creator />
                    {/* {event.creator && event.creator === user._id ? 
                    <Creator/> : <Attending/>} */}
            </div>
        )
    }
}
export default EventDetail;