import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withAuth } from "../../lib/AuthProvider";
import Test from "./Test";
/* import Filler from "./Test";
import ProgressBar from "./Test"; */
import './SignUp.css';

class Signup extends Component {
  constructor(props) {
    super(props);
  this.state = { 
    fullname: "", 
    password: "",
    repeatPassword: "",
    birthdate: "",
    gender: "",
    email: "",
    description: "",
    answers: [],
    isHorny: false,
    searchFor: "",
    isError: {
      fullname: "",
      email: "",
      password: "",
      repeatPassword: "",
      birthdate: "",
    },
    arrayPlaceHolder: [
        "Ej: Cher",
        "Ej: Mark Zuckerberg",
        "Ej: Mariano Rajoy",
        "Ej: Donald Trump",
        "Ej: Ellen Degeneres",
        "Ej: Lisa Simpson",
    ],
  };
}

  handleFormSubmit = event => {
    event.preventDefault();
    const { fullname, password, repeatPassword, birthdate, gender, email, description, isHorny, searchFor } = this.state;
    /* this.props.signup({ fullname, password, repeatPassword, birthdate, gender, email, description, isHorny, searchFor }); */
  };

  handleChange = event => {
    const { name, value } = event.target;
    const regExp = RegExp(
      /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/
    )
    let isError = { ...this.state.isError };

        switch (name) {
            case "username":
                isError.fullname =
                    value.length < 1  ? "Introduce your name " : "";
                break;
            case "email":
                isError.email = regExp.test(value) ? "" : "Email address is invalid";
            break;
            case "password":
                isError.password =
                    value.length < 6 ? "Introduce a password with at least 6 characters" : "";
            break;
            case "repeatPassword":
                isError.repeatPassword =
                   value !== this.state.password ? "Passwords don't match" : "";
            break;
            case "birthdate":
                var today = new Date();
                var dd = String(today.getDate()).padStart(2, '0');
                var mm = String(today.getMonth() + 1).padStart(2, '0'); 
                var yyyy = today.getFullYear() - 18;
                today = mm + dd + yyyy;
                isError.birthdate =
                   value < today ? "You have to be 18 or older to find love here :)" : "";
            break;
            default:
                break;
        }
    this.setState({ 
      isError,
      [name]: value 
    });
  };

  renderQuestions = () => {
        return <Test />
  }

  randomPlaceHolder = () => {
    const randomPhrase = Math.floor((Math.random()) * (this.state.arrayPlaceHolder.length));
    const objPic = this.state.arrayPlaceHolder[randomPhrase];
    return  objPic 
 }

  render() {
    const { fullname, email, password, repeatPassword, birthdate, gender, description, isHorny, searchFor } = this.state;
    return (
      <div className="">
        <h1 className="">Sign Up</h1>

        <form className="" onSubmit={this.handleFormSubmit} >
          <div className="">
          <label>Full name:</label>
          <input type="text" name="fullname" value={fullname} onChange={this.handleChange} placeholder={this.randomPlaceHolder()} /*required*//>
          {this.state.isError.fullname.length > 0 && (
           <span className="">{this.state.isError.fullname}</span>
          )}
          </div>
          <div className="">
          <label>Email:</label>
          <input type="email" name="email" value={email} onChange={ e => this.handleChange(e)} placeholder="ej: bill@gates.com"  /*required*/ />
          {this.state.isError.email.length > 0 && (
          <span className="">{this.state.isError.email}</span>
          )}
          
          </div>
          <div className="">
          <label>Password:</label>
          <input type="password" name="password" value={password} onChange={ e => this.handleChange(e)} placeholder="******"  /*required*/ />
          {this.state.isError.password.length > 0 && (
          <span className="">{this.state.isError.password}</span>
          )}  
          </div>
          <div className="">
          <label>Repeat Password:</label>
          <input type="password" name="repeatPassword" value={repeatPassword} onChange={ e => this.handleChange(e)} placeholder="******"  /*required*/ />
          {this.state.isError.repeatPassword.length > 0 && (
          <span className="">{this.state.isError.repeatPassword}</span>
          )} 
          </div>
          <div className="">
          <label>Birth date:</label>
          <input type="date" name="birthdate" value={birthdate} onChange={ e => this.handleChange(e)} /*required*/ />
          {this.state.isError.birthdate.length > 0 && (
          <span className="">{this.state.isError.birthdate}</span>
          )} 
          </div>
          <div className="">
          <label>Gender:</label>
          <select name="gender" value={gender} onChange={ e => this.handleChange(e)}>
            <option defaultValue=""> Choose one </option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="none">Non-binary</option>
          </select>
          </div>
          <div className="">
          <label>Id your heart already hacked?</label>
          <select name="isHorny" value={isHorny} onChange={ e => this.handleChange(e)}>
            <option defaultValue=""> Choose one </option>
            <option value='false'>I already have my pair programming partner</option>
            <option value='true'>I want to find someone whi I can deploy with</option>
          </select>
          </div>
          <div className="">
          <label>Looking for:</label>
          <select name="searchFor" value={searchFor} onChange={ e => this.handleChange(e)}>
            <option defaultValue=""> Choose one </option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="none">Non binary</option>
            <option value="all">All</option>
          </select>
          </div>
          <div className="">
          <label>Description:</label>
          <textarea name="description" value={description} onChange={this.handleChange} placeholder="Describe yourself like your mother would" /*required*/></textarea>
          </div>
          <div className="">
         {this.renderQuestions()}
          </div>
          <p>Already have account? <Link to={"/login"}> Login</Link></p>
          </form>
      </div>
    );
  }
}

export default withAuth(Signup);