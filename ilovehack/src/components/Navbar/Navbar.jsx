import React, { Component } from "react";
import { withAuth } from "../../lib/AuthProvider";
import { Link } from "react-router-dom";
import './Navbar.css'

class Navbar extends Component {
  state = {
    toggle:false,
}

Toggle = () => {
    this.setState({toggle:!this.state.toggle})
}

redirectToMyEvents = () => {
  window.location.href = "#my-events";
}

redirectToFav = () => {
  window.location.href = "#events-attending";
}

  render() {
    const { logout, isLoggedin } = this.props;
    return (
      <nav className={this.state.toggle ?  "topnav responsive" : "topnav" }>
      <div>
      {isLoggedin ? (
        <div>
            <div className={!this.state.toggle ?  "dropdown " : "mobile-dropdown" }>
              <button className="dropbtn btn">Events
                <i className="fa fa-caret-down"></i>
              </button>
              <div className={!this.state.toggle ?  "dropdown-content" : "dropdown-content-show" }>
                <Link to="/home#my-events" onClick={() => {this.redirectToMyEvents(); this.Toggle()}}> My events </Link>
                <Link to="/home#events-attending" onClick={() => {this.redirectToFav(); this.Toggle()}}> Favourite events </Link>
                <Link to="/all-events" onClick={() => this.Toggle()}> All events </Link>
              </div>
            </div>
            <Link to="/myprofile" onClick={() => this.Toggle()}> My profile </Link>
            <Link to="/matches" onClick={() => this.Toggle()}> Matches </Link>
            <Link to="/faq" onClick={() => this.Toggle()}> FAQ </Link>
            <button className="btn logout dropdown" href="#" onClick={logout}><i className="fa fa-power-off"></i></button>
        </div>) : (<div> 
            <Link to="/" onClick={() => this.Toggle()}> Home </Link>
            <Link to="/login" onClick={() => this.Toggle()}> Log-in </Link>
            <Link to="/signup" onClick={() => this.Toggle()}> Sign-up </Link>
            <Link to="/faq" onClick={() => this.Toggle()}> FAQ </Link>
          </div>)}
        </div>
        <button onClick={() => this.Toggle()} className="icon btn"> &#9776; </button>
        <a id="logo-container" href="/"><img className="logo" src="images/logo.png" alt="pixel heart" style={{width:20}}/></a>
        </nav> 
    );
  }
}

export default withAuth(Navbar);