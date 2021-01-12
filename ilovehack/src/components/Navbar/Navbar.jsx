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
      <nav className={this.state.toggle ?  "topnav responsive" : "topnav" } onClick={this.state.toggle ? () => this.Toggle() : null}>
      <a id="logo-container" href="/"><img className="logo" src="images/logo.png" alt="logo" style={{width:20}}/></a>
      <div>
      {isLoggedin ? (
        <div>
            <div className={!this.state.toggle ?  "dropdown " : "mobile-dropdown" }>
              <button className="dropbtn btn">Events
                <i className="fa fa-caret-down"></i>
              </button>
              <div className={!this.state.toggle ?  "dropdown-content" : "dropdown-content-show" }>
                <Link to="/home#my-events" onClick={() => this.redirectToMyEvents()}> My events </Link>
                <Link to="/home#events-attending" onClick={() => this.redirectToFav()}> Favourite events </Link>
                <Link to="/all-events"> All events </Link>
              </div>
            </div>
            <Link to="/myprofile"> My profile </Link>
            <Link to="/matches"> Matches </Link>
            <Link to="/faq"> FAQ </Link>
            <button className="btn logout dropdown" href="#" onClick={logout}><i className="fa fa-power-off"></i></button>
        </div>) : (<div> 
            <Link to="/" > Home </Link>
            <Link to="/login"> Log-in </Link>
            <Link to="/signup"> Sign-up </Link>
            <Link to="/faq"> FAQ </Link>
          </div>)}
        </div>
        <button onClick={() => this.Toggle()} className="icon btn"> &#9776; </button>
        </nav> 
    );
  }
}

export default withAuth(Navbar);