import { Component } from "react";
import React from "react";
import userservice from "../../lib/user-service";
import eventservice from "../../lib/event-service";
import { Link } from "react-router-dom";

class OtherProfile extends Component {
    state = {
        user: {},
        events: []
    }

    getUser = async () =>{
        try {
            const theUser = await userservice.getUser()
            const theEvents = await eventservice.getAllEvents()
            console.log(theEvents)
            this.setState({
                user: theUser,
                events: theEvents
            })
            
        } catch (error) {
            console.log(error)
        }
    }

    componentDidMount(){
        this.getUser()
    }

    render(){
        const {user, events} = this.state
       
        return(<>
            <div className="ui card">
                <div className="image">
                    <img src="./defaultpic.jpg" />
                </div>
            <div className="content">
                <a className="header">Kristy</a>
                <div className="meta">
                <span className="date">Joined in 2013</span>
                </div>
                <div className="description">
                Kristy is an art director living in New York.
                </div>
            </div>
            <div className="extra content">
                <a>
                <i className="user icon"></i>
                22 Friends
                </a>
            </div>
            </div>
</>
        )
    }
}
export default OtherProfile;