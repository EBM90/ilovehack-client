import { Component } from "react";
import React from "react";
import userservice from "../../lib/user-service";

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
            <h1>Hello World</h1>
        )
    }
}
export default Home;