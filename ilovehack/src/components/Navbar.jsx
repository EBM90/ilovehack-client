import React, { Component } from "react";
import { Link } from "react-router-dom";
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
      <div className={this.state.toggle ?  '"topnav responsive"' : "topnav" } id="myTopnav">
      {isLoggedin ? (
                    <> 
                    <Link to="/" > Home </Link>
        <Link to="/myprofile" > My profile </Link>
        <Link to="/matches" > Matches </Link>
        <div className="dropdown">
          <button className="dropbtn">Events
            <i className="fa fa-caret-down"></i>
          </button>
          <div className="dropdown-content">
          <Link to="/fav-events" > My events </Link>
          <Link to="/my-events" > Favourite events </Link>
          <Link to="/all-events" > All events </Link>
          </div>
        </div>
        </>) : (<> 
          <Link to="/" > Home </Link>
        <Link to="/login" > Log-in </Link>
        <Link to="/signup" > Sign-up </Link>
                      </>)}
        <Link to="/faq" > FAQ </Link>
        <button onClick={() => this.Toggle()} className={this.state.toggle ? 'nav-toggle nav-open' : "nav-toggle" } aria-label="toggle navigation">
                <span className={this.state.toggle ?  'hamburger nav-open' : "hamburger" }>&#9776;</span>
            </button>
      </div> 
    );
  }
}

export default withAuth(Navbar);