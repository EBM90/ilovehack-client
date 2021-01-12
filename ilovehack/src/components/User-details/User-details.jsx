import { Component } from "react";
import React from "react";
import userservice from "../../lib/user-service";


export default class Userdetails extends Component {
    state = {
        user: {}
        }

        getUser = async () =>{
            try {
                const {params}=this.props.match
                const theUser = await userservice.getUserDetails(params.id)
                console.log(theUser)

                this.setState({
                    user: theUser,
                    // description: theUser.description,
                    // imgPath: theUser.imgPath
                })
                
            } catch (error) {
                console.log(error)
            }
        }

        componentDidMount(){
            this.getUser()
        }

    render() {

        const {user} = this.state
        return (
            <div>
             <h1>{user.fullname}</h1>
            </div>
        )
    }
}
