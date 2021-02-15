
import React, { Component } from 'react'
import userservice from '../../lib/user-service'
import './Konnections.css'
import { Link } from "react-router-dom";

export default class Konnections extends Component {
    state={
        possibleKonnections: [],
        user: {},
        konnections: []
    }

    getKonnections = async() =>{
        const possibleKonnections = await userservice.getAllKonnections()
        const theUser = await userservice.getUser()
        console.log(possibleKonnections, 'this is the length of the answers')
        this.setState({
            possibleKonnections: possibleKonnections,
            user: theUser
        })
    }

    checkKonnections = () =>{
        const {possibleKonnections, user} = this.state
        let count= 0
        let konnections = []
        console.log(possibleKonnections)
        possibleKonnections.forEach((konnection) =>{
            for(let i = 0; i < konnection.answers.length; i++){
                console.log(konnection.answers[i], 'this is the answer of the konnection')
                console.log(user.answers[i], 'this is the answer of the user')
                if(konnection.answers[i] === user.answers[i]){
                    count++
                }
            }
            console.log(count)
            konnection.percentage = count * 10
            konnections.push(konnection)
            count = 0
        })
        console.log(konnections, 'these are the konnections')
        this.setState({
            konnections: konnections
        })
    }

    componentDidMount= async() =>{
        await this.getKonnections()
        this.checkKonnections()
    }
    render() {
        const {konnections, user} = this.state
        konnections.sort((a,b)=>{
            if(a.percentage>b.percentage){
                return -1
            } else {
                return 1
            }
        })
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
                                    <p className='percentage'>{user.percentage}%</p>
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
