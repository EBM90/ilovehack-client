import React from 'react'
import {Link} from 'react-router-dom'
import './event.css'

export default function eventSlider(props) {
    const reverseString = (str) => {
        let strArr = str.split('-')
        return strArr.reverse().join('/')
    }
    return (
        <>
                    {props.events.map((event, index)=>{
                        return (
                                    
                            <Link to={`/event/${event._id}`} className='big-links'>
                                <div className='event-card' key={index} >
                                    <div className='event-image' >
                                        <img src={event.imgPath} alt='event' style={{width:250, height:125, borderTopLeftRadius:'30px', borderTopRightRadius:'30px'}}></img>
                                    </div>
                                    <div className='event-info'>
                                        <div className='event-info-name-location'>
                                        <h3 >{event.name}</h3>
                                        <h5 className='highlighted'>{event.location}</h5>
                                        </div>
                                        <div className='event-info-date-time'>
                                            <h5>{event.date ? reverseString(event.date.slice(0,10)) : ""}</h5>
                                            <h5>{event.time ? event.time : null}</h5>
                                        </div>
                                    </div>             
                                </div>
                            </Link>
                                )
                            }
                        )
                    }
        </>
    )
}
