import React, { Component } from "react";
import { withAuth } from "../../lib/AuthProvider";
import { Link } from "react-router-dom";
import './Navbar.css';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem, Form, FormControl, Button } from 'react-bootstrap';

class Navibar extends Component {
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
    const { logout, isLoggedin, user } = this.props;
    return (
      <Navbar className="navbar-container" bg="dark" expand="lg" variant="dark">
        <Navbar.Brand href="/"><img className="logo" src="images/logo.png" alt="logo" style={{width:20}}/></Navbar.Brand>
        <Navbar.Toggle onClick={this.state.toggle ? () => this.Toggle() : null}  aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
          {isLoggedin ? (
            <Nav.Item className="navbar-user-details">
              <img src={user.imgPath} alt="user picture" className="navbar-default-picture"/>
              <div >
              <h2> {user.fullname} </h2>
              <p> {user.email} </p>
              </div>
              <Link to={`/profile/${user.id}`} ><i class="far fa-edit"></i></Link>
              <button className="btn logout dropdown" href="#" onClick={logout}><i className="fa fa-power-off"></i></button>
            </Nav.Item> 
            
          ) : (
            <Nav.Item className="navbar-user-details">
              <img src="./defaultpic.jpg" alt="default picture" className="navbar-default-picture"/>
              <Link to='/login'><div>
              <h2> Log in </h2>
              <p> Tap here </p>
              </div></Link>
            </Nav.Item>
          )}
            <Nav.Link href="/ilovehack">Home</Nav.Link>
            <Nav.Link href="#link">Konnections</Nav.Link>
            <NavDropdown variant="secondary" title="Events" id="basic-nav-dropdown">
              <NavDropdown.Item className="nav-custom-item" to="/home#my-events" onClick={() => this.redirectToMyEvents()}>My events</NavDropdown.Item>
              <NavDropdown.Item className="nav-custom-item" href="/home#events-attending" onClick={() => this.redirectToFav()}>Favourite events</NavDropdown.Item>
              <NavDropdown.Item className="nav-custom-item" href="/all-events">All events</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="/faq">F.A.Q.</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default withAuth(Navibar);