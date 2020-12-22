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