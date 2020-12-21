import { Component } from "react";
import React from "react";
import userservice from "../../lib/user-service";
import eventservice from "../../lib/event-service";
import { Link } from "react-router-dom";

class Home extends Component {
    state = {
        user: {}
    }

    getUser = async () =>{
        try {
            const theUser = await userservice.getUser()

            this.setState({
                user: theUser
            })
            
        } catch (error) {
            console.log(error)
        }
    }

    componentDidMount(){
        this.getUser()
    }

    render(){
        const {user} = this.state
       
        return(
            <div>
                {user && user.fullname ? 
                <div className="main">
                    <h1>Hello {user.fullname}</h1>
                </div>
                : <h1>Loading...</h1>}
            </div>
            
        )
    }
}
export default Home;