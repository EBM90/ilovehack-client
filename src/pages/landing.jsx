import { Component } from "react";
import React from "react";
import eventservice from "../lib/event-service.js";

class Home extends Component {
    state = {
        events: []
    }

    getEvents = async () =>{
        try {
            const theEvents = await eventservice.getAllEvents()
            this.setState({
                events: theEvents
            })
            console.log(theEvents)
        } catch (error) {
            console.log(error)
        }
    }

    componentDidMount(){
        this.getEvents()
    }

    render(){

        return(
            <h1>Hello World</h1>
        )
    }
}
export default Home;