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
    const { user, logout, isLoggedin } = this.props;
    return (
      <div className={this.state.toggle ?  "topnav responsive" : "topnav" } id="myTopnav">
      {isLoggedin ? (
                    <> 
                    <a href="/"> Home </a>
        <a href="/myprofile"> My profile </a>
        <a href="/matches"> Matches </a>
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
          <a href="#" onClick={logout}> Log out </a>
        </>) : (<> 
          <a href="/"> Home </a>
        <a href="/login"> Log-in </a>
        <a href="/signup"> Sign-up </a>
                      </>)}
        <a href="/faq"> FAQ </a>
        <a onClick={() => this.Toggle()} className="icon"> &#9776; </a>
      </div> 
    );
  }
}

export default withAuth(Navbar);