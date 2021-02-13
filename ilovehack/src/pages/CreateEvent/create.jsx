import React, { Component} from 'react'
import eventservice from "../../lib/event-service";
import { withAuth } from "../../lib/AuthProvider";
import './Create.css';

class Create extends Component {
    state ={
        name: '', 
        creator: '', 
        description: '',
        imgPath: '',  
        location: '',
        date: '',
        start: '',
        finish: '',
        hours: [],
        minutes: [],
        isAttending: false, 
        isPublic: false, 
        cohort: '',
        hourStart: '',
        minStart: '',
        hourFinish: '',
        minFinish: '',
        isError: {
          name: "",
          description: "",
          location: "",
          date: "",
        },
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

    componentDidMount = () =>{
      this.setTime()
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
  TogglePublic = () => {
      this.setState({isPublic:!this.state.isPublic})
  }
  ToggleAttend = () => {
    this.setState({isAttending:!this.state.isAttending})
}
handleFileUpload = async (e) => {
  console.log("the file to be uploaded is: ", e.target.files[0]);

  const uploadData = new FormData();

  uploadData.append("imgPath", e.target.files[0]);

  try {
    const res = await eventservice.handleUpload(uploadData);

    this.setState({ imgPath: res.secure_url });
  } catch (error) {
    console.log("Error while uploading the file: ", error);
  }
};
    
      handleFormSubmit = async (event) => {
        try {
          event.preventDefault();
            const {name, description, location, imgPath, date, isAttending, isPublic, cohort, hourStart, hourFinish, minStart, minFinish} = this.state
            const creator = this.props.user._id
            const time = `${hourStart}:${minStart} - ${hourFinish}:${minFinish}`
          await eventservice.addEvent({ name, 
          creator, 
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
            creator: '', 
            description: '', 
            location: '',
            imgPath:'',
            date: '',
            hourChosen: '',
            minChosen: '', 
            isAttending: false,
            isPublic: false, 
            cohort: '',
          });
          this.props.history.push('/all-events')
        } catch (error) {
          console.log(error, "the error originated here");
        }
      };
    render() {
        const {name, description, imgPath, date, location, isAttending, cohort, isPublic, hours, minutes, hourStart, hourFinish, minStart, minFinish} = this.state
        
        return (
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
                            onClick={() => this.ToggleAttend()}
                  />
                  
                  <label>Public:</label>
                    <input
                            type="checkbox"
                            name="isPublic"
                            value={isPublic}
                            onClick={() => this.TogglePublic()}
                  />
                    <input
                    className="btn_lightblue"
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