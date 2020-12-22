import React, { Component} from 'react'
import eventservice from "../../lib/event-service";
import { withAuth } from "../../lib/AuthProvider";
import './Create.css'

class Create extends Component {
    state ={
        name: '', 
        creator: '', 
        description: '',
        imgPath: '',  
        location: '',
        date: '',
        isAttending: false, 
        isPublic: false, 
        cohort: '',
        isError: {
          name: "",
          description: "",
          location: "",
          date: "",
        },
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
    
      handleFormSubmit = async (event) => {
        try {
          event.preventDefault();
            const {name, description, location, imgPath, date, isAttending, isPublic, cohort} = this.state
            const creator = this.props.user._id
          await eventservice.addEvent({ name, 
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
          this.props.history.push('/events')
        } catch (error) {
          console.log(error, "the error originated here");
        }
      };
    render() {
        const {name, description, imgPath, date, location, isAttending, cohort, isPublic} = this.state
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