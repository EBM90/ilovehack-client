import { Component } from "react";
import React from "react";
import eventservice from "../../lib/event-service";
import profileservice from '../../lib/user-service';
import './EventDetails.css'

class EventDetail extends Component {
    state = {
        event: {},
        user: {},
        name: '',
        description:'',
        imgPath: '',
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
                description:theEvent.description,
                imgPath: theEvent.imgPath,
            })

        } catch (error) {
            console.log(error)
        }
    }

    componentDidMount(){
        this.getEvent()
    }

    
    handleChange = event => {
        const { name, value } = event.target;
      
        let isError = { ...this.state.isError };
    
            switch (name) {
                case "name":
                    isError.name =
                        value.length < 1  ? "Give your event a name " : "";
                    break;
                case "description":
                    isError.description = value.length < 10  ? "The description has to be longer " : "";
                break;
                case "location":
                    isError.location =
                        value.length < 1 ? "Indicate where this event will happen" : "";
                break;
                case "date":
                    var today = new Date();
                    var dd = String(today.getDate()).padStart(2, '0');
                    var mm = String(today.getMonth() + 1).padStart(2, '0'); 
                    var yyyy = today.getFullYear();
                    today = yyyy + '-' + mm + '-' + dd;
                    console.log(today)
                    console.log(value)
                    isError.date =
                       value < today ? "Choose a date in the future :)" : "";
                break;
                default:
                    break;
            }
        this.setState({ 
          isError,
          [name]: value 
        });
      };

    handleFileUpload = async (e) => {
        console.log("the file to be uploaded is: ", e.target.files[0]);
    
        // creamos un nuevo objeto FormData
        const uploadData = new FormData();
    
        // imageUrl (este nombre tiene que ser igual que en el modelo, ya que usaremos req.body como argumento del método .create() cuando creemos una nueva movie en la ruta POST '/api/movies/create')
        uploadData.append("imgPath", e.target.files[0]);
    
        try {
          const res = await eventservice.handleUpload(uploadData);
    
          console.log("response is", res);
    
          this.setState({ imgPath: res.secure_url });
        } catch (error) {
          console.log("Error while uploading the file: ", error);
        }
      };

    joinThisEvent= async(user_id, event_id) =>{
        try {
            console.log(user_id, event_id)
            await eventservice.joinEvent(user_id, event_id)
        } catch (error) {
            console.log(error)
        }
        
    }

    reverseString(str) {
        let strArr = str.split('-')
        return strArr.reverse().join('-')
    }

    handleFormSubmit = async (event) => {
        try {
          event.preventDefault();
            const {name, description, location, imgPath, date, isAttending, isPublic, cohort} = this.state
            const creator = this.props.user._id
          await eventservice.editEvent({ name, 
          creator, 
          description,  
          location, 
          date,
          imgPath,
          isAttending,
          isPublic, 
          cohort });
          this.setState({
            name: '', 
            creator: '', 
            description: '', 
            location: '',
            imgPath:'',
            date: '', 
            isAttending: false,
            isPublic: false, 
            cohort: '',
          });
        } catch (error) {
          console.log(error, "the error originated here");
        }
      };

    //create components for event if creator and else
    render(){
        const {event, user, imgPath} = this.state
        return(
            <div className='main'>
                {event.creator && event.creator === user._id ? 
                    <div>
                    <form onSubmit={this.handleFormSubmit}>
                    <div className="form_part">
                    <div>
                    <img src={imgPath} alt="" style={{ width: 100 }} />
                    </div>

                <input type="file" onChange={(e) => this.handleFileUpload(e)} />

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
                            value={this.reverseString(event.date.slice(0,10))}
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
                        <img src={event.imgPath} alt='' style={{width: 100}}/>
                        <h1>{event.name}</h1>
                        <p>{event.date}</p>
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