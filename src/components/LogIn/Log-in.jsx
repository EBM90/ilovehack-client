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
        <h1 className="login-title">Login</h1>

        <form className="login-form" onSubmit={this.handleFormSubmit}>
          
          <label>Email:</label>
          <input type="email" name="email" value={email} placeholder="example@example.com" onChange={this.handleChange}/>

          <label>Password:</label>
          <input type="password" name="password" value={password} placeholder="******" onChange={this.handleChange} />
          <div className="login-button-div">
          <input className="login-button" type="submit" value="Login" />
          </div>
          <p>Don't have an account? <Link to={"/signup"}> Sign up</Link></p>
        </form>
      </div>
    );
  }
}

export default withAuth(Login);