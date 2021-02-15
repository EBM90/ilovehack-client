import React, { Component } from "react";
import { withAuth } from '../../lib/AuthProvider.js';
import { Link } from "react-router-dom";
import './Login.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Carousel1 from "../carousel/Carousel";
import Modal from "../Modal/Modal";

class Login extends Component {
  state = { email: "", password: "" };

  handleFormSubmit = async(event) => {
    event.preventDefault();
    const { email, password } = this.state;
    await this.props.login({ email, password })
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    const { email, password } = this.state;

    return (
      <div className="login">
        {/* <h1 className="login-title"><svg width="252" height="62" viewBox="0 0 252 62" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M96 0L115.983 11.5373C117.231 12.2578 118 13.5894 118 15.0305V46.675C118 48.1161 117.231 49.4477 115.983 50.1682L96 61.7055L76.0168 50.1682C74.7688 49.4477 74 48.1161 74 46.675V15.0305C74 13.5894 74.7688 12.2578 76.0168 11.5373L96 0Z" fill="#2DC5FA"/>
<path d="M26.3266 17.8V43H20.4946V32.668H9.04656V43H3.21456V17.8H9.04656V27.736H20.4946V17.8H26.3266ZM39.7048 23.344C42.7048 23.344 45.0088 24.064 46.6168 25.504C48.2248 26.92 49.0288 29.068 49.0288 31.948V43H43.7728V40.588C42.7168 42.388 40.7488 43.288 37.8688 43.288C36.3808 43.288 35.0848 43.036 33.9808 42.532C32.9008 42.028 32.0728 41.332 31.4968 40.444C30.9208 39.556 30.6328 38.548 30.6328 37.42C30.6328 35.62 31.3048 34.204 32.6488 33.172C34.0168 32.14 36.1168 31.624 38.9488 31.624H43.4128C43.4128 30.4 43.0408 29.464 42.2968 28.816C41.5528 28.144 40.4368 27.808 38.9488 27.808C37.9168 27.808 36.8968 27.976 35.8888 28.312C34.9048 28.624 34.0648 29.056 33.3688 29.608L31.3528 25.684C32.4088 24.94 33.6688 24.364 35.1328 23.956C36.6208 23.548 38.1448 23.344 39.7048 23.344ZM39.2728 39.508C40.2328 39.508 41.0848 39.292 41.8288 38.86C42.5728 38.404 43.1008 37.744 43.4128 36.88V34.9H39.5608C37.2568 34.9 36.1048 35.656 36.1048 37.168C36.1048 37.888 36.3808 38.464 36.9328 38.896C37.5088 39.304 38.2888 39.508 39.2728 39.508ZM63.6825 43.288C61.6185 43.288 59.7585 42.868 58.1025 42.028C56.4705 41.164 55.1865 39.976 54.2505 38.464C53.3385 36.952 52.8825 35.236 52.8825 33.316C52.8825 31.396 53.3385 29.68 54.2505 28.168C55.1865 26.656 56.4705 25.48 58.1025 24.64C59.7585 23.776 61.6185 23.344 63.6825 23.344C65.7225 23.344 67.4985 23.776 69.0105 24.64C70.5465 25.48 71.6625 26.692 72.3585 28.276L68.0025 30.616C66.9945 28.84 65.5425 27.952 63.6465 27.952C62.1825 27.952 60.9705 28.432 60.0105 29.392C59.0505 30.352 58.5705 31.66 58.5705 33.316C58.5705 34.972 59.0505 36.28 60.0105 37.24C60.9705 38.2 62.1825 38.68 63.6465 38.68C65.5665 38.68 67.0185 37.792 68.0025 36.016L72.3585 38.392C71.6625 39.928 70.5465 41.128 69.0105 41.992C67.4985 42.856 65.7225 43.288 63.6825 43.288Z" fill="#FAFAFA"/>
<path d="M94.3438 33.1L90.9598 36.628V43H85.1638V17.8H90.9598V29.572L102.12 17.8H108.6L98.1598 29.032L109.212 43H102.408L94.3438 33.1Z" fill="#FAFAFA"/>
<path d="M129.808 43.288C127.768 43.288 125.932 42.868 124.3 42.028C122.692 41.164 121.432 39.976 120.52 38.464C119.608 36.952 119.152 35.236 119.152 33.316C119.152 31.396 119.608 29.68 120.52 28.168C121.432 26.656 122.692 25.48 124.3 24.64C125.932 23.776 127.768 23.344 129.808 23.344C131.848 23.344 133.672 23.776 135.28 24.64C136.888 25.48 138.148 26.656 139.06 28.168C139.972 29.68 140.428 31.396 140.428 33.316C140.428 35.236 139.972 36.952 139.06 38.464C138.148 39.976 136.888 41.164 135.28 42.028C133.672 42.868 131.848 43.288 129.808 43.288ZM129.808 38.68C131.248 38.68 132.424 38.2 133.336 37.24C134.272 36.256 134.74 34.948 134.74 33.316C134.74 31.684 134.272 30.388 133.336 29.428C132.424 28.444 131.248 27.952 129.808 27.952C128.368 27.952 127.18 28.444 126.244 29.428C125.308 30.388 124.84 31.684 124.84 33.316C124.84 34.948 125.308 36.256 126.244 37.24C127.18 38.2 128.368 38.68 129.808 38.68ZM155.954 23.344C158.354 23.344 160.286 24.064 161.75 25.504C163.238 26.944 163.982 29.08 163.982 31.912V43H158.366V32.776C158.366 31.24 158.03 30.1 157.358 29.356C156.686 28.588 155.714 28.204 154.442 28.204C153.026 28.204 151.898 28.648 151.058 29.536C150.218 30.4 149.798 31.696 149.798 33.424V43H144.182V23.632H149.546V25.9C150.29 25.084 151.214 24.46 152.318 24.028C153.422 23.572 154.634 23.344 155.954 23.344ZM180.844 23.344C183.244 23.344 185.176 24.064 186.64 25.504C188.128 26.944 188.872 29.08 188.872 31.912V43H183.256V32.776C183.256 31.24 182.92 30.1 182.248 29.356C181.576 28.588 180.604 28.204 179.332 28.204C177.916 28.204 176.788 28.648 175.948 29.536C175.108 30.4 174.688 31.696 174.688 33.424V43H169.072V23.632H174.436V25.9C175.18 25.084 176.104 24.46 177.208 24.028C178.312 23.572 179.524 23.344 180.844 23.344ZM213.146 33.388C213.146 33.46 213.11 33.964 213.038 34.9H198.386C198.65 36.1 199.274 37.048 200.258 37.744C201.242 38.44 202.466 38.788 203.93 38.788C204.938 38.788 205.826 38.644 206.594 38.356C207.386 38.044 208.118 37.564 208.79 36.916L211.778 40.156C209.954 42.244 207.29 43.288 203.786 43.288C201.602 43.288 199.67 42.868 197.99 42.028C196.31 41.164 195.014 39.976 194.102 38.464C193.19 36.952 192.734 35.236 192.734 33.316C192.734 31.42 193.178 29.716 194.066 28.204C194.978 26.668 196.214 25.48 197.774 24.64C199.358 23.776 201.122 23.344 203.066 23.344C204.962 23.344 206.678 23.752 208.214 24.568C209.75 25.384 210.95 26.56 211.814 28.096C212.702 29.608 213.146 31.372 213.146 33.388ZM203.102 27.592C201.83 27.592 200.762 27.952 199.898 28.672C199.034 29.392 198.506 30.376 198.314 31.624H207.854C207.662 30.4 207.134 29.428 206.27 28.708C205.406 27.964 204.35 27.592 203.102 27.592ZM226.245 43.288C224.181 43.288 222.321 42.868 220.665 42.028C219.033 41.164 217.749 39.976 216.813 38.464C215.901 36.952 215.445 35.236 215.445 33.316C215.445 31.396 215.901 29.68 216.813 28.168C217.749 26.656 219.033 25.48 220.665 24.64C222.321 23.776 224.181 23.344 226.245 23.344C228.285 23.344 230.061 23.776 231.573 24.64C233.109 25.48 234.225 26.692 234.921 28.276L230.565 30.616C229.557 28.84 228.105 27.952 226.209 27.952C224.745 27.952 223.533 28.432 222.573 29.392C221.613 30.352 221.133 31.66 221.133 33.316C221.133 34.972 221.613 36.28 222.573 37.24C223.533 38.2 224.745 38.68 226.209 38.68C228.129 38.68 229.581 37.792 230.565 36.016L234.921 38.392C234.225 39.928 233.109 41.128 231.573 41.992C230.061 42.856 228.285 43.288 226.245 43.288ZM250.928 42.064C250.376 42.472 249.692 42.784 248.876 43C248.084 43.192 247.244 43.288 246.356 43.288C244.052 43.288 242.264 42.7 240.992 41.524C239.744 40.348 239.12 38.62 239.12 36.34V28.384H236.132V24.064H239.12V19.348H244.736V24.064H249.56V28.384H244.736V36.268C244.736 37.084 244.94 37.72 245.348 38.176C245.78 38.608 246.38 38.824 247.148 38.824C248.036 38.824 248.792 38.584 249.416 38.104L250.928 42.064Z" fill="#FAFAFA"/>
</svg>
</h1> */}

        <form className="login-form" onSubmit={this.handleFormSubmit}>
          
        <i className="input-login"><img className="logo-input border-input" src="/images/email-logo.png" alt="pixel heart"/><input className="border-input" type="email" name="email" value={email} placeholder="E-mail" onChange={this.handleChange}/></i>

        <i className="input-login"><img className="logo-input border-input" src="/images/password-logo.png" alt="pixel heart"/><input className="border-input" type="password" name="password" value={password} placeholder="Password" onChange={this.handleChange} /></i>

<div className="align-remember">
          <input className="checkbox-login" type="checkbox" name="remember pass" />
          <p>Remember me</p>
          <a className="forgotpass" href="#">Forgot your password?</a>
          </div>

          <div className="login-button-div">
          <input className="btn_lightblue" type="submit" value="Log In" />
          </div>
          <p className="signup-login">Don´t have an account yet?  <i className="suhere"> <Link className="suhere" to={"/signup"}> Sign up here!</Link></i> </p>
        </form>
        <Carousel1 />

        <div className="modal-align">
            <div className="container-modal">

                <img className="modal-img" src="images/logo.png" alt="love" width="400rem" />
                <div className="buttons">
                    <a className="btn_lightblue" href="#be-nice">Log In</a>
                </div>
            </div>



            <div className="modal" id="be-nice">
                <div className="modal-content">
                <form className="login-form" onSubmit={this.handleFormSubmit}>
          
          <i className="input-login"><img className="logo-input border-input" src="/images/email-logo.png" alt="pixel heart"/><input className="border-input" type="email" name="email" value={email} placeholder="E-mail" onChange={this.handleChange}/></i>
  
          <i className="input-login"><img className="logo-input border-input" src="/images/password-logo.png" alt="pixel heart"/><input className="border-input" type="password" name="password" value={password} placeholder="Password" onChange={this.handleChange} /></i>
  
  <div className="align-remember">
            <input className="checkbox-login" type="checkbox" name="remember pass" />
            {/* <p>Remember me</p> */}
            <a className="forgotpass" href="#">Forgot your password?</a>
            </div>
  
            <div className="login-button-div">
            <input className="btn_lightblue" type="submit" value="Log In" />
            <a href="#close" className="button">Close</a>
            </div>
            {/* <p className="signup-login">Don´t have an account yet?  <i className="suhere"> <Link className="suhere" to={"/signup"}> Sign up here!</Link></i> </p> */}
          </form>
                    <i className="align-btn-portfolio">
                    </i>
                </div>
                <a href="#close" className="background">.</a>
            </div>

        </div>
      </div>
    );
  }
}


export default withAuth(Login);