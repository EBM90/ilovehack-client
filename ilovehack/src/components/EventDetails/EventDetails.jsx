import { Component } from "react";
import React from "react";
import eventservice from "../../lib/event-service";
import profileservice from '../../lib/user-service';
import './EventDetails.css'
import {Link} from 'react-router-dom'

class EventDetail extends Component {
    state = {
        event: {},
        user: {},
        name: '',
        description:'',
        imgPath: '',
        location: '',
        start: '',
        finish: '',
        hours: [],
        minutes: [],
        isAttending: '', 
        isPublic: '', 
        cohort: '',
        time: '',
        showForm: false,
        isError: {
          name: "",
          description: "",
          location: "",
          date: "",
        },
    }

    getEvent = async () =>{
        try {
            const {params} = this.props.match
            const theEvent = await eventservice.getTheEvent(params.id)
            const theUser = await profileservice.getUser()
            console.log(theEvent, 'el evento')
            console.log(theUser, 'el user')
            this.setState({
                event: theEvent,
                user: theUser,
                name: theEvent.name,
                description:theEvent.description,
                date: theEvent.date,
                imgPath: theEvent.imgPath,
                location: theEvent.location,
                time: theEvent.time,
                isAttending: theEvent.isAttending, 
                isPublic: theEvent.isPublic, 
                cohort: theEvent.cohort,
                })

        } catch (error) {
            console.log(error)
        }
    }

    componentDidMount = async () =>{
      try {
        this.getEvent()
        this.setTime()
        this.userAttendAlready()
        this.joinButton()
      } catch (error) {
        
      }
    }

    setTime = () => {
      let setHours = []
      let setMinutes = []
      for(let i = 0; i <= 23; i++){
        if(i <10){
          setHours.push('0'+ i)
        } else {
          setHours.push(i.toString())
        }
      }

      for(let i = 0; i <= 59; i++){
        if(i <10){
          setMinutes.push('0'+ i)
        } else {
          setMinutes.push(i.toString())
        }
      }

      this.setState({
        hours: setHours,
        minutes: setMinutes
      })
    }

    TogglePublic = () => {
      this.setState({isPublic:!this.state.isPublic})
    }
    ToggleAttend = () => {
      this.setState({isAttending:!this.state.isAttending})
    }

    userAttendAlready = async () => {
      try {
        const {user, event} = this.state;
        const attendOrNot = event.attending.map((attendees, index) => (attendees._id))
        const userAttend = attendOrNot.indexOf(user._id)
      if(userAttend === -1){
        this.setState({isAttending: false })
        } else {
          this.setState({isAttending: true })
        }
      } catch (error) {
        console.log(error)
      }
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
    
        const uploadData = new FormData();
      
        uploadData.append("imgPath", e.target.files[0]);
    
        try {
          const res = await eventservice.handlePic(uploadData);
    
          console.log("response is", res);
    
          this.setState({ imgPath: res.secure_url });
        } catch (error) {
          console.log("Error while uploading the file: ", error);
        }
      };

    joinThisEvent= async(user_id, event_id) =>{
        try {
            await eventservice.joinEvent(user_id, event_id)
            this.props.history.push('/home')
        } catch (error) {
            console.log(error)
        }
    }

    unJoinThisEvent = async (user_id, event_id) =>{
      try {
          await eventservice.unJoinEvent(user_id, event_id)
          this.props.history.push('/home')
      } catch (error) {
          console.log(error)
      }
  }

    reverseString(str) {
        let strArr = str.split('-')
        return strArr.reverse().join('/')
    }

    dateForm(){
      this.setState({
        showForm: !this.state.showForm
      })
    }

    handleFormSubmit = async (event) => {
        try {
          event.preventDefault();
            let {name, description, location, imgPath, date, time, isAttending, isPublic, cohort, hourStart, hourFinish, minStart, minFinish} = this.state
            if ( hourStart !== '' || hourFinish !== '' || minStart !== '' || minFinish !== '' ){
              time = `${hourStart}:${minStart} - ${hourFinish}:${minFinish}`
            }
            // console.log(name, description, location, imgPath, date, time, isAttending, isPublic, cohort, hourStart, hourFinish, minStart, minFinish)
            const id = this.state.event._id
            await eventservice.editEvent({ id, name, 
          description,  
          location, 
          date,
          time,
          imgPath,
          isAttending,
          isPublic, 
          cohort });
          this.setState({
            name: '',  
            description: '', 
            location: '',
            imgPath:'',
            date: '', 
            isAttending: false,
            isPublic: false, 
            cohort: '',
          });
          this.props.history.push('/all-events')
        } catch (error) {
          console.log(error, "the error originated here");
        }
      };

      joinButton = () => {
          const {isAttending, user, event } = this.state
          this.userAttendAlready()
          console.log(isAttending, 'el atending')
              if (isAttending === true){
              return <button onClick={() => this.unJoinThisEvent(user._id, event._id)}>Unjoin</button>
              } else {
                return <button onClick={() => this.joinThisEvent(user._id, event._id)}>Join</button>
              }
          
      }

    //create components for event if creator and else
    render(){
      const {event, user, name, description, imgPath, date, time, location, isAttending, cohort, isPublic, hours, minutes, hourStart, hourFinish, minStart, minFinish, showForm} = this.state
        return(
            <div className='main'>
                {event.creator && event.creator === user._id ? 
                  <div className='form'>
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
                            value={name}
                            onChange={this.handleChange}
                  />
                  {this.state.isError.name.length > 0 && (
                    <span className="">{this.state.isError.name}</span>
                    )}
                  <label>Description:</label>
                    <textarea
                            type="textarea"
                            name="description"
                            value={description}
                            onChange={this.handleChange}
                  />
                  {this.state.isError.description.length > 0 && (
          <span className="">{this.state.isError.description}</span>
          )}
                  <label>Location:</label>
                    <input
                            type="text"
                            name="location"
                            value={location}
                            onChange={this.handleChange}
                  />
                  {this.state.isError.location.length > 0 && (
          <span className="">{this.state.isError.location}</span>
          )}

                    {showForm ? 
                    <div>
                    <label>Date:</label>
                    <input
                            type="date"
                            name="date"
                            value={date}
                            onChange={this.handleChange}
                  />
                  {this.state.isError.date.length > 0 && (
          <span className="">{this.state.isError.date}</span>
          )}
          <label>Start:</label>
          <select name="hourStart" value={hourStart} onChange={ e => this.handleChange(e)}>
            <option defaultValue=""> Choose one </option>
            {hours ? hours.map((hour)=>{
              return <option value={hour}>{hour}</option>
            }): null}
          </select>

          <select name="minStart" value={minStart} onChange={ e => this.handleChange(e)}>
            <option defaultValue=""> Choose one </option>
            {minutes ? minutes.map((min)=>{
              return <option value={min}>{min}</option>
            }): null}
          </select>

          <label>Finish:</label>
          <select name="hourFinish" value={hourFinish} onChange={ e => this.handleChange(e)}>
            <option defaultValue=""> Choose one </option>
            {hours ? hours.map((hour)=>{
              return <option value={hour}>{hour}</option>
            }): null}
          </select>

          <select name="minFinish" value={minFinish} onChange={ e => this.handleChange(e)}>
            <option defaultValue=""> Choose one </option>
            {minutes ? minutes.map((min)=>{
              return <option value={min}>{min}</option>
            }): null}
          </select> 

          <button onClick={() => this.dateForm()}>Change date</button>
          </div>:  
          <div>
          <h5>Date: {time} {this.reverseString(date.slice(0,10))}</h5>
          <button onClick={() => this.dateForm()}>Change date</button>
          </div>}
          
          <label>Cohort:</label>
          <select name="cohort" value={cohort} onChange={ e => this.handleChange(e)}>
            <option defaultValue=""> Choose one </option>
            <option value="web">Web</option>
            <option value="ux">UX/UI</option>
            <option value="data">Data</option>
            <option value="all">All</option>
          </select>
          <label>Are you attending?</label>
                    <input
                            type="checkbox"
                            name="isAttending"
                            value={isAttending}
                            defaultChecked={isAttending}
                            onClick={() => this.ToggleAttend()}
                  />
                  
                  <label>Public:</label>
                    <input
                            type="checkbox"
                            name="isPublic"
                            value={isPublic}
                            checked={isPublic}
                            onClick={() => this.TogglePublic()}
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
                        <h5>{event.time ? event.time : null}  -  {event.date ? this.reverseString(event.date.slice(0,10)) : ""}</h5>
                        <p>{event.location}</p>
                        <p>{event.description}</p>
                        <h5>Attending: </h5>
                        {event.attending && event.attending.length !== 0 ? event.attending.map((attendee, index)=>{
                            return <p key={index}><Link to={`/profile/${attendee._id}`}>{attendee.fullname}</Link></p>
                        }): <p>Be the first to join this event!</p>}
                    </div>
                    

                : null}  
                </>
                 }
                 {this.joinButton()}
                 
    </div>)
}
}
export default EventDetail;