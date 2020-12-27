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
      <a id="logo-container" href="/"><img className="logo" src="https://cdn.pixabay.com/photo/2017/09/23/16/33/pixel-heart-2779422_960_720.png" alt="pixel heart"/></a>
      <div className="">
      {isLoggedin ? (
        <div>
            <div className={!this.state.toggle ?  "dropdown " : "mobile-dropdown" }>
              <button className="dropbtn btn">Events
                <i className="fa fa-caret-down"></i>
              </button>
              <div className={!this.state.toggle ?  "dropdown-content" : "dropdown-content-show" }>
                <a href="/my-events"> My events </a>
                <a href="/fav-events"> Favourite events </a>
                <a href="/all-events"> All events </a>
              </div>
            </div>
            <a href="/myprofile"> My profile </a>
            <a href="/matches"> Matches </a>
            <a href="/faq"> FAQ </a>
            <button className="btn logout dropdown" href="#" onClick={logout}><i className="fa fa-power-off"></i></button>
        </div>) : (<div> 
            <a href="/"> Home </a>
            <a href="/login"> Log-in </a>
            <a href="/signup"> Sign-up </a>
            <a href="/faq"> FAQ </a>
          </div>)}
        </div>
        <button onClick={() => this.Toggle()} className="icon btn"> &#9776; </button>
        </nav> 
    );
  }
}

export default withAuth(Navbar);