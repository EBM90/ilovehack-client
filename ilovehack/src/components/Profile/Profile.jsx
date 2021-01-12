import { Component } from "react";
import React from "react";
import userservice from "../../lib/user-service";
import eventservice from "../../lib/event-service";
import { Link } from "react-router-dom";
import { withAuth } from "../../lib/AuthProvider";

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
        console.log("the file to be uploaded is: ", e.target.files[0]);
    
        // creamos un nuevo objeto FormData
        const uploadData = new FormData();
    
        // imageUrl (este nombre tiene que ser igual que en el modelo, ya que usaremos req.body como argumento del método .create() cuando creemos una nueva movie en la ruta POST '/api/movies/create')
        uploadData.append("imgPath", e.target.files[0]);
    
        try {
          const res = await userservice.handleUpload(uploadData);
    
          console.log("response is", res);
    
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
            
            <div className="form_container">
              <form onSubmit={this.handleFormSubmit}>
                <div>
                  <img src={imgPath} alt="" style={{ width: 100 }} />
                </div>

                <input type="file" onChange={(e) => this.handleFileUpload(e)} />
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
                    className="form_button_btn"
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