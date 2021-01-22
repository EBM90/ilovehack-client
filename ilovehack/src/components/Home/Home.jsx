import { Component } from "react";
import React from "react";
import userservice from "../../lib/user-service";
import eventservice from "../../lib/event-service";
import Event from '../Event/event'

import './Home.css'
import Konnections from "../Konnections/Konnections";
import Loading from '../Loading/loading'


class Home extends Component {
    state = {
        user: {},
        events: [],
        created: [],
        attend: []
    }

    getInfo = async () =>{
        try {
            const theUser = await userservice.getUser()
            const theEvents = await eventservice.getAllEvents()
            const eventsCreated = []
            const eventsAttend = []

            theEvents.forEach((event)=>{
                if(event.creator && event.creator === theUser._id){
                    eventsCreated.push(event)
                }

                event.attending.forEach((attendee)=>{
                    if(attendee._id === theUser._id){
                        eventsAttend.push(event)
                    }
                })
            })

            this.setState({
                user: theUser,
                events: theEvents,
                created: eventsCreated,
                attend: eventsAttend
            })
            
        } catch (error) {
            console.log(error)
        }
    }

    componentDidMount = async () =>{
        await this.getInfo()
        await this.redirectToSection()
    }


      redirectToSection = async () => {
        const search = await this.props.location.hash; 
        if(search === '#events-attending'){
         window.location.href = await window.location.href;
        } else if (search === '#my-events')
        window.location.href = await window.location.href;
      }

      reverseString(str) {
        let strArr = str.split('-')
        return strArr.reverse().join('/')
    }
    

    render(){
        const {user, created, attend} = this.state
        return(
            <>
                {user && user.fullname ? 
                <div className="main">
                   <Konnections />
                    <div>
                        <h3>My events:</h3>
                        <div className='slider-events'>
                            <Event events={created} />
                        </div>
                        <h3>Events I'm attending</h3>
                        <div className='slider-events'>
                            <Event events={attend} />
                        </div>
                    </div>
                </div> 
                : <Loading />}
            </>
            
        )
    }
}
export default Home;