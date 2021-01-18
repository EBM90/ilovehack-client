import { Component } from "react";
import React from "react";
import userservice from "../../lib/user-service";
import eventservice from "../../lib/event-service";
import { Link } from "react-router-dom";
import './Home.css'
import Konnections from "../Konnections/Konnections";
import Loading from '../Loading/loading'


class Home extends Component {
    state = {
        user: {},
        events: []
    }

    getUser = async () =>{
        try {
            const theUser = await userservice.getUser()
            const theEvents = await eventservice.getAllEvents()
            this.setState({
                user: theUser,
                events: theEvents
            })
            
        } catch (error) {
            console.log(error)
        }
    }

    componentDidMount = async () =>{
        await this.getUser()
        await this.redirectToSection()
    }


      redirectToSection = async () => {
        const search = await this.props.location.hash; 
        if(search === '#events-attending'){
         window.location.href = await window.location.href;
        } else if (search === '#my-events')
        window.location.href = await window.location.href;
      }
    

    render(){
        const {user, events} = this.state
        return(
            <div>
                {user && user.fullname ? 
                <div className="main">
                    <h1>Hello {user.fullname}</h1>
                    <div>
                    <div className='konnections-title'>  <h3>Latest Konnections          </h3> <span className="text">See all </span></div>

                    <Konnections />
                       
                        {/* {user.matches && user.matches.length !== 0 ? 
                        user.matches.map((person, index)=>{
                            return <h6 key={index}>{person.fullname}</h6>
                        }): <p  className="text">You don't have any matches yet. Check again tomorrow!</p>} */}
                    </div>
                    <div className="events">
                        <h3 id="my-events">My events:</h3>
                        {events.map((event, index)=>{
                            if(event.creator && event.creator === user._id){
                                return <h5 key={index}><Link to={`/event/${event._id}`} className="links">{event.name}</Link></h5>
                            }
                        })}
                        <h3 id="events-attending">Events I'm attending</h3>
                        {events.map((event, index)=>{
                            return <div key={index}>
                            {event.attending ? event.attending.map((attendee, index)=>{
                                if(attendee._id === user._id){
                                    return <h5 key={index}><Link to={`/event/${event._id}`} className='links'>{event.name}</Link></h5>
                                }
                            }) :null}
                            </div>
                        })}
                    </div>
                </div> 
                : <Loading />}
            </div>
            
        )
    }
}
export default Home;