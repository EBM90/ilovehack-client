import { Component } from "react";
import React from "react";
import userservice from "../../lib/user-service";
import eventservice from "../../lib/event-service";
import { Link } from "react-router-dom";

class Home extends Component {
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
       
        return(
            <div>
                {user && user.fullname ? 
                <div className="main">
                    <h1>Hello {user.fullname}</h1>
                    <div className="matches">
                        <h3>Matches</h3>
                        {user.matches && user.matches.length !== 0 ? 
                        user.matches.map((person)=>{
                            return <h6>{person.fullname}</h6>
                        }): <p>You don't have any matches yet. Check again tomorrow!</p>}
                    </div>
                    <div className="events">
                        <h3>My events:</h3>
                        {events.map((event)=>{
                            if(event.creator && event.creator === user._id){
                                return <h5><Link to={`/event/${event._id}`}>{event.name}</Link></h5>
                            }
                        })}
                        <h3>Events I'm attending</h3>
                        {events.map((event)=>{
                            return <div>
                            {event.attending ? event.attending.map((attendee)=>{
                                if(attendee._id === user._id){
                                    return <h5><Link to={`/event/${event._id}`}>{event.name}</Link></h5>
                                }
                            }) :null}
                            </div>
                        })}
                    </div>
                </div> 
                : <h1>Loading...</h1>}
            </div>
            
        )
    }
}
export default Home;