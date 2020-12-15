import { Component } from "react";
import React from "react";
import eventservice from "../../lib/event-service";
import profileservice from '../../lib/user-service'

class Creator extends Component {
    state = {
        event: {},
        user: {},
        name: '', 
        description: '', 
        date: '', 
        location: '', 
        isPublic: '', 
        cohort: '', 
        imgPath: ''
    }

    getEvent = async () =>{
        try {
            const {params} = this.props.match
            const theEvent = await eventservice.getTheEvent(params.id)
            const theUser = await profileservice.getUser()
            this.setState({
                event: theEvent,
                user: theUser,
                name: theEvent.name,
                date: theEvent.date,
                location: theEvent.location
            })

        } catch (error) {
            console.log(error)
        }
    }

    componentDidMount(){
        this.getEvent()
    }

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
      };
    
      handleFormSubmit = async (event) => {
        try {
          event.preventDefault();
          const {name, date, location} = this.state
          const id = this.state.event._id
          await eventservice.editEvent({id, name, date, location})
        } catch (error) {
          console.log(error, "the error originated here");
        }
      };

    //create components for event if creator and else
    render(){
        const {event, user} = this.state
        return(
            <>
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
                : null} 
            </>
        )
    }
}
export default Creator;