import React, { Component } from "react";
import { withAuth } from "../../lib/AuthProvider";
import { Link } from "react-router-dom";
import "./Navbar.css";
import {
  Navbar,
  Nav,
  NavItem,
  NavDropdown,
  MenuItem,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";

class Navibar extends Component {
  state = {
    toggle: false,
  };

  Toggle = () => {
    this.setState({ toggle: !this.state.toggle });
  };

  RenderLogo = () => {
    if (this.state.toggle === true) {
      return (
        <img
          src="./images/LOGO_ALT_TRANSP.svg"
          alt="logo"
          className="navbar-logo-picture"
        />
      );
    } else {
      return;
    }
  };

  redirectToMyEvents = () => {
    window.location.href = "#my-events";
  };

  redirectToFav = () => {
    window.location.href = "#events-attending";
  };

  render() {
    const { logout, isLoggedin, user } = this.props;
    console.log(this.state.toggle, "el logo");
    return (
      <Navbar
        collapseOnSelect
        className="navbar-container"
        bg="dark"
        expand="lg"
        variant="dark"
      >
        <Navbar.Brand href="/">
          <img
            className="logo"
            src="images/logo.png"
            alt="logo"
            style={{ width: 20 }}
          />
        </Navbar.Brand>
        {() => this.RenderLogo()}
        <div onClick={this.state.toggle ? () => this.Toggle() : null}>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
        </div>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            {isLoggedin ? (
              <>
                <Nav.Item className="navbar-user-details">
                  <img
                    src={user.imgPath}
                    alt="user picture"
                    className="navbar-default-picture"
                  />
                  <div className="navbar-align-anon-text">
                    <h2> {user.fullname} </h2>
                    <p> {user.email} </p>
                  </div>
                  <Link to={`/myprofile`}>
                    <i class="far fa-edit"></i>
                  </Link>
                  <button
                    className="btn logout dropdown"
                    href="#"
                    onClick={logout}
                  >
                    <i className="fa fa-power-off"></i>
                  </button>
                </Nav.Item>
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link href="#link">Konnections</Nav.Link>
                <NavDropdown
                  variant="secondary"
                  title="Events"
                  id="basic-nav-dropdown"
                >
                  <NavDropdown.Item
                    className="nav-custom-item"
                    to="/home#my-events"
                    onClick={() => this.redirectToMyEvents()}
                  >
                    My events
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    className="nav-custom-item"
                    href="/home#events-attending"
                    onClick={() => this.redirectToFav()}
                  >
                    Favourite events
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    className="nav-custom-item"
                    href="/all-events"
                  >
                    All events
                  </NavDropdown.Item>
                </NavDropdown>
              </>
            ) : (
              <>
                <Nav.Item className="navbar-user-details">
                  <img
                    src="./defaultpic.jpg"
                    alt="default picture"
                    className="navbar-default-picture"
                  />
                  <Link to="/login">
                    <div>
                      <h2> Log in </h2>
                      <p> Tap here </p>
                    </div>
                  </Link>
                </Nav.Item>
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link href="all-events">Login</Nav.Link>
                <Nav.Link href="all-events">Sign up</Nav.Link>
                <Nav.Link href="all-events">Events</Nav.Link>
              </>
            )}
            <Nav.Link href="/faq">F.A.Q.</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default withAuth(Navibar);
