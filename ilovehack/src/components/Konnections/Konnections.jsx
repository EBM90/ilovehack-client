
import React, { Component } from 'react'
import userservice from '../../lib/user-service'
import './Konnections.css'

export default class Konnections extends Component {
    state={
        konnections: []
    }

    getKonnections = async() =>{
        const theKonnections = await userservice.getAllUsers()
        this.setState({
            konnections: theKonnections
        })
    }

    componentDidMount(){
        this.getKonnections()
    }
    render() {
        const {konnections} = this.state
        return (
            <div className='konnections'>
            
                {/* {konnections.length !== 0 ? konnections.map((user, index) =>{
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
                    
                    
                }) : <div><p className='text'> You don't have any konnections yet!</p></div>} */}
            </div>
        )
    }
}
