
import React, { Component } from 'react'
import userservice from '../../lib/user-service'
import './Konnections.css'
import { Link } from "react-router-dom";

export default class Konnections extends Component {
    state={
        konnections: [],
        user: {}
    }

    getKonnections = async() =>{
        const theKonnections = await userservice.getAllUsers()
        const theUser = await userservice.getUser()
        this.setState({
            konnections: theKonnections,
            user: theUser
        })
    }

    componentDidMount(){
        this.getKonnections()
    }
    render() {
        const {konnections, user} = this.state
        return (
            <>
            <div className='konnections-title'>  <h3>Latest Konnections</h3></div>
                {user.answers && user.answers.length === 10 ? 
                    <div className='konnections'>
                        {konnections.length !== 0 ? konnections.map((user, index) =>{
                            return (
                                
                                <div className='konnection-card' key={index}>
                                <div className='card-image'>
                                    <img  className='rombo-image' src={user.imgPath} alt='userimage'></img>
                                    <p className='percentage'>69%</p>
                                </div>
                                <div className='info-card'>
                                    <h3>{user.fullname}</h3>
                                    <h5 className='text'>{user.email}</h5>

                                </div>
                            </div>
                            )
                            
                            
                        }) : <div className='highlighted-container'><p className='text'> You don't have any konnections yet!</p></div>}
        </div> :
                <div className='highlighted-container'>
                    <p><b>Hey! </b>You have to complete the personality test to see your Konnections.</p>
                    <Link to='/test' className='light-links'><button className='btn_lightblue'> START TEST</button></Link>
                </div>
            }
            </>
        )
    }
}
