import React, { Component } from "react";
import { withAuth } from "../lib/AuthProvider";

class Navbar extends Component {
  state = {
    toggle:false,
}

Toggle = () => {
    this.setState({toggle:!this.state.toggle})
}
  render() {
    const { logout, isLoggedin } = this.props;
    return (
      <nav className={this.state.toggle ?  "topnav responsive" : "topnav" }>
      <a id="logo-container" href="/home"><img className="logo" src="https://cdn.pixabay.com/photo/2017/09/23/16/33/pixel-heart-2779422_960_720.png" alt="pixel heart"/></a>
      
      {isLoggedin ? (
        <div>
          <button className="btn logout" href="#" onClick={logout}><i className="fa fa-power-off"></i></button>
          <a href="/faq"> FAQ </a>
          <a href="/myprofile"> My profile </a>
          <div className="dropdown">
            <button className="dropbtn">Events
              <i className="fa fa-caret-down"></i>
            </button>
            <div className="dropdown-content">
              <a href="/fav-events"> My events </a>
              <a href="/my-events"> Favourite events </a>
              <a href="/all-events"> All events </a>
            </div>
          </div>
          <a href="/matches"> Matches </a>
        </div>) : (<div> 
            <a href="/faq"> FAQ </a>
            <a href="/"> Home </a>
            <a href="/login"> Log-in </a>
            <a href="/signup"> Sign-up </a>
          </div>)}
        <a onClick={() => this.Toggle()} className="icon"> &#9776; </a>
      </nav> 
    );
  }
}

export default withAuth(Navbar);