import React from 'react'
import './loading.css'

export default function loading() {
    return (
        <div className='main'> 
        <div class="ui segment">
            <div class="ui active inverted dimmer">
                <div class="ui text loader">Loading</div>
            </div>
            <p></p>
        </div>
        </div>
    )
}
