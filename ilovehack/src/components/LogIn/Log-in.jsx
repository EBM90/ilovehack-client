import React, { Component } from "react";
import { withAuth } from '../../lib/AuthProvider.js';
import { Link } from "react-router-dom";
import './Login.css';

class Login extends Component {
  state = { email: "", password: "" };

  handleFormSubmit = event => {
    event.preventDefault();
    const { email, password } = this.state;
    this.props.login({ email, password })
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    const { email, password } = this.state;

    return (
      <div className="login">
        <h1 className="login-title">Log In</h1>

        <form className="login-form" onSubmit={this.handleFormSubmit}>
          
          <input className="border" type="email" name="email" value={email} placeholder="Username" onChange={this.handleChange}/>

          <input className="border" type="password" name="password" value={password} placeholder="Password" onChange={this.handleChange} />

          <div className="login-button-div">
          <input className="btn-login2" type="submit" value="Log in" />
          </div>
          <p>Don't have an account? <Link to={"/signup"}> Sign up</Link></p>
        </form>
      </div>
    );
  }
}

export default withAuth(Login);