import { Component } from "react";
import React from "react";
import userservice from "../../lib/user-service";
import './User-details.css'


export default class Userdetails extends Component {
    state = {
        user: {}
        }

        getUser = async () =>{
            try {
                const {params}=this.props.match
                const theUser = await userservice.getUserDetails(params.id)

                this.setState({
                    user: theUser,
                    description: theUser.description,
                    fullname: theUser.fullname,
                    imgPath: theUser.imgPath
                })
                
            } catch (error) {
                console.log(error)
            }
        }

        componentDidMount(){
            this.getUser()
        }

    render() {

        const {user,imgPath} = this.state
        return (
            <div className="align-profileDetails">
                  <img className="profilePic" src={imgPath} alt="profile pic"  />
<div className="profileBox">
             <h1 className="profileName">{user.fullname}</h1>
             <p className="profileDesc">{user.description}</p>
             </div>

             <button className="btn-profileDetails"> Konnect with {user.fullname}</button>
            </div>
        )
    }
}
