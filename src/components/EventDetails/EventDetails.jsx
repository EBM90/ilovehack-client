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

    joinThisEvent= async(user_id, event_id) =>{
        try {
            console.log(user_id, event_id)
            await eventservice.joinEvent(user_id, event_id)
        } catch (error) {
            console.log(error)
        }
        
    }

    //create components for event if creator and else
    render(){
        const {event, user} = this.state
        return(
            <div className='main'>
                {event.creator && event.creator === user._id ? 
                    <div>
                    <form onSubmit={this.handleFormSubmit}>
                    <div className="form_part">
                    <label>Name:</label>
                    <input
                            type="text"
                            name="name"
                            value={event.name}
                            onChange={this.handleChange}
                  />
                  <label>Location:</label>
                    <input
                            type="text"
                            name="location"
                            value={event.location}
                            onChange={this.handleChange}
                  />
                  <label>Date:</label>
                    <input
                            type="text"
                            name="date"
                            value={event.date}
                            onChange={this.handleChange}
                  />

                    <input
                    className="form_button_btn_edit"
                    type="submit"
                    value="Edit"
                  />
                </div>

                        </form>
                    </div> 
                : 
                <>
                {event.name ? 
                <div>
                    <h1>{event.name}</h1>
                     <p>{event.location}</p>
                     <p>{event.description}</p>
                </div>
                   
                : null}  
                </>
                 }
                 <button onClick={() => this.joinThisEvent(user._id, event._id)}>Join</button>
    </div>)
}
}
export default EventDetail;