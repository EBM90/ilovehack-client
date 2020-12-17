import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withAuth } from "../lib/AuthProvider";

class Navbar extends Component {
  render() {
    const { user, logout, isLoggedin } = this.props;
    return (
      <nav className="navbar navbar-expand-lg navbar-light ">
        <Link to={"/"} className="navbar-brand">
          <h4>
            <img className="logo-navbar" alt="" src="#" />
          </h4>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse justify-content-end"
          id="navbarNavAltMarkup"
        >
          <div className="navbar-nav ">
            {isLoggedin ? (
              <>
                <Link to={`/myprofile`} className="nav-link">
                  My profile
                </Link>
                <Link to="/events" className="nav-link">
                  Events
                </Link>
                <Link to="/videos" className="nav-link">
                  Exercises
                </Link>
                <Link to="/faqP" className="nav-link">
                  FAQ
                </Link>
                <button className="nav-link logout" onClick={logout}>
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="nav-link">
                  Login
                </Link>
                <Link to="/signup" className="nav-link ">
                  Sign Up
                </Link>
                <Link to="/faq" className="nav-link">
                  FAQ
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
    );
  }
}

export default withAuth(Navbar);