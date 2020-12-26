import React, { Component} from 'react'
import eventservice from "../../lib/event-service";
import { withAuth } from "../../lib/AuthProvider";

class Create extends Component {
    state ={
        name: '', 
        creator: '', 
        description: '',  
        location: '', 
        isPublic: true, 
        cohort: ''
    }

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
      };
    
      handleFormSubmit = async (event) => {
        try {
          event.preventDefault();
            const {name, description, location, isPublic, cohort} = this.state
            const creator = this.props.user._id
          await eventservice.addEvent({ name, 
          creator, 
          description,  
          location, 
          isPublic, 
          cohort });
          this.setState({
            name: '', 
            creator: '', 
            description: '', 
            location: '', 
            isPublic: true, 
            cohort: ''
          });
        } catch (error) {
          console.log(error, "the error originated here");
        }
      };
    render() {
        const {name, description, date, location, cohort} = this.state
        return (
            <div>
                    <form onSubmit={this.handleFormSubmit}>
                    <div className="form_part">
                    <label>Name:</label>
                    <input
                            type="text"
                            name="name"
                            value={name}
                            onChange={this.handleChange}
                  />
                  <label>Description:</label>
                    <input
                            type="text"
                            name="description"
                            value={description}
                            onChange={this.handleChange}
                  />
                  <label>Location:</label>
                    <input
                            type="text"
                            name="location"
                            value={location}
                            onChange={this.handleChange}
                  />
                    <label>Cohort:</label>
                    <input
                            type="text"
                            name="cohort"
                            value={cohort}
                            onChange={this.handleChange}
                  />

                  {/* <label>Date:</label>
                    <input
                            type="date"
                            name="date"
                            value={date}
                            onChange={this.handleChange}
                  /> */}
                  

                    <input
                    className="form_button_btn_edit"
                    type="submit"
                    value="Create"
                  />
                </div>

                        </form>
                    </div>
        )
    }
}

export default withAuth(Create);