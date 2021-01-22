import { Component } from "react";
import React from "react";
import userservice from "../../lib/user-service";
import { withAuth } from "../../lib/AuthProvider";
import './Profile.css'


class Profile extends Component {
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
       const {logout} =this.props
        return(
            <>
            <h1>Profile</h1>
            <div className='main'>
              <form onSubmit={this.handleFormSubmit} className='form-profile'>
                <div className='card-image'>
                  <img src={imgPath} alt="" className='rombo-image' />
                  <input type="file" onChange={(e) => this.handleFileUpload(e)} className="upload-input"/>
                </div>
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
              <button className='btn_darkblue' onClick={logout}>Log out</button>
            </div>
            </>
        )
    }
}
export default withAuth(Profile);