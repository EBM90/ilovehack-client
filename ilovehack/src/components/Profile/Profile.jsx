import { Component } from "react";
import React from "react";
import userservice from "../../lib/user-service";
// import eventservice from "../../lib/event-service";
// import { Link } from "react-router-dom";
import './Profile.css'

class Home extends Component {
    state = {
        user: {},
        fullname: '',
        description:'',
        email: '',
        imgPath: '',
    }

    getUser = async () =>{
        try {
            const theUser = await userservice.getUser()

            this.setState({
                user: theUser,
                fullname: theUser.fullname,
                description: theUser.description,
                email: theUser.email,
                imgPath: theUser.imgPath,
            })
            
        } catch (error) {
            console.log(error)
        }
    }

    componentDidMount(){
        this.getUser()
    }

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
      };

      handleFileUpload = async (e) => {
  
        const uploadData = new FormData();

        try {
          const res = await userservice.handleUpload(uploadData);
    
          this.setState({ imgPath: res.secure_url });
        } catch (error) {
          console.log("Error while uploading the file: ", error);
        }
      };
    
      handleFormSubmit = async (event) => {
        try {
          event.preventDefault();
          const {fullname, description, email, imgPath} = this.state
          await userservice.editUser({fullname, description, email, imgPath})
          this.props.history.push('/home')
        } catch (error) {
          console.log(error, "the error originated here");
        }
      };

    render(){
        const {fullname, description, email, imgPath} = this.state
       
        return(
            
            <div>
              <form onSubmit={this.handleFormSubmit} className='form-profile'>
                <div>
                  <img src={imgPath} alt="" style={{ width: 100 }} />
                </div>

                <input type="file" onChange={(e) => this.handleFileUpload(e)} className="upload-input"/>
                <div className="form_part">
                  <label>Full name:</label>
                  <input
                    type="text"
                    name="fullname"
                    value={fullname}
                    onChange={(e) => this.handleChange(e)}
                  />
                </div>
                <div className="form_part">
                  <label>Email:</label>
                  <input
                    type="text"
                    name="email"
                    value={email}
                    onChange={(e) => this.handleChange(e)}
                  />
                </div>
                <div className="form_part">
                  <label>Description:</label>
                  <textarea
                    type="text"
                    name="description"
                    value={description}
                    onChange={(e) => this.handleChange(e)}
                  />
                </div>
                <div className="form_button_container">
                  <input
                    className="btn_lightblue"
                    type="submit"
                    value="Edit"
                  />
                </div>
              </form>
            </div>
            
        )
    }
}
export default Home;