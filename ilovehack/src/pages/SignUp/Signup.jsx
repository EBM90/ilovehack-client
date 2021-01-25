import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withAuth } from "../../lib/AuthProvider";
import Test from "../../components/Test/Test";
import './SignUp.css';


class Signup extends Component {
  constructor(props) {
    super(props);
  this.state = { 
    fullname: "", 
    password: "",
    repeatPassword: "",
    birthdate: "",
    // gender: "",
    email: "",
    description: "",
    // isHorny: false,
    // searchFor: "",
    testIsShowing: false,
    isError: {
      fullname: "",
      email: "",
      password: "",
      repeatPassword: "",
      birthdate: "",
      // isHorny: "",
      // searchFor: "",
      // gender: "",
      description: "",
    },
    arrayPlaceHolder: [
        "Ej: Cher",
        "Ej: Mark Zuckerberg",
        "Ej: Mariano Rajoy",
        "Ej: Donald Trump",
        "Ej: Ellen Degeneres",
        "Ej: Lisa Simpson",
    ],
    noErrors: '',
    warning:''
  };
}

  handleChange = event => {
    const { name, value } = event.target;
    const regExp = RegExp(
      /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/
    )
    let isError = { ...this.state.isError };

        switch (name) {
            case "fullname":
                isError.fullname =
                    value.length < 1  ? "Write a valid name" : "";
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
                today = yyyy + '-' + mm + '-' + dd ;
                isError.birthdate =
                   value > today ? "You have to be 18 or older to find love here :)" : "";
            break;
            // case "isHorny":
            //     isError.isHorny =
            //        value === "" ? "Select one" : "";
            // break;
            // case "searchFor":
            //     isError.searchFor =
            //     value === "" ? "Select one" : "";
            // break;
            // case "gender":
            //     isError.gender =
            //     value === "" ? "Select one" : "";
            // break;
            case "description":
                isError.description =
                value < 20 ? "Write a description of at least 20 characters" : "";
            break;
            case "information":
                if(isError.fullname !== '' || isError.password !== '' || isError.email !== '' || 
                isError.birthdate !== '' || isError.description !== '' || isError.repeatPassword !== ''){
                  isError.information = 'Please fill in all the information before '
                }
            break;
            default:
                break;
        }
        // && fullname !== '' && email !== '' && password ==='' && description !== '' && birthdate !== ''
       
    this.setState({ 
      isError,
      [name]: value 
    });
  };

  renderQuestions = () => {
    return <Test signupInfo={this.state} hideForm={this.hideForm} />
  }

  randomPlaceHolder = () => {
    const randomPhrase = Math.floor((Math.random()) * (this.state.arrayPlaceHolder.length));
    const objPic = this.state.arrayPlaceHolder[randomPhrase];
    return objPic 
 }

 hideForm = () => {
   if(!this.state.testIsShowing){
    this.setState({testIsShowing: true });
    } else {
      this.setState({testIsShowing: false });
    }
  }

  checkForErrors = async() =>{

    const { fullname, password, email, birthdate, isError } = this.state
    if(isError.fullname === '' && isError.password === ''){

      await this.props.signup({fullname, password, email, birthdate})
      
    } else {
      this.setState({
        warning: 'Please fill in all the information correctly'
      })
    }
  }

  handleFormSubmit = async(event) => {
    try {
      event.preventDefault()
      await this.checkForErrors()
    } catch (error) {
      console.log(error)
    }
    
  };

  render() {
    const { fullname, email, password, birthdate, warning } = this.state;


    return (

      
      <div className="signup-container">
      <div className="signup-title">
         <h1 >Sign Up</h1>
      </div>
        

        <form className="signup-form-container" onSubmit={this.handleFormSubmit}>

          <div className='signup-form-field'>
              <i className="input-signup"><img className="logo-input border-input" src="/images/user-logo.png" alt="pixel heart"/><input className="border-input" type="text" name="fullname" value={fullname} onChange={e => this.handleChange(e)} placeholder={this.randomPlaceHolder()} required/></i> 
              {this.state.isError.fullname.length > 0 && (
              <span className="error-input">{this.state.isError.fullname}</span>
              )}
          </div>
          
          <div className='signup-form-field'>
              <i className="input-signup"><img className="logo-input border-input" src="/images/email-logo.png" alt="pixel heart"/><input className="border-input" type="email" name="email" value={email} placeholder="E-mail" onChange={this.handleChange} required/></i>
              {this.state.isError.email.length > 0 && (
              <span className="error-input">{this.state.isError.email}</span>
              )}
          </div>
          <div className='signup-form-field'>
                  <i className="input-signup"><img className="logo-input border-input" src="/images/password-logo.png" alt="pixel heart"/><input className="border-input" type="password" name="password" value={password} placeholder="Password" onChange={this.handleChange} required/></i> 
                  {this.state.isError.password.length > 0 && (
                  <span className="error-input">{this.state.isError.password}</span>
                  )}  
          </div>
          <div className='signup-form-field'> 
              <i className="input-signup"><img className="logo-input border-input" src="/images/calendar-logo.png" alt="pixel heart"/><input className="border-input" type="date" name="birthdate" value={birthdate} onChange={ e => this.handleChange(e)} required /></i> 
              {this.state.isError.birthdate.length > 0 && (
              <span className="error-input">{this.state.isError.birthdate}</span>
              )} 
          </div>
          {/* <div className="signup-form-field"> */}
          {/* <label>Full name:</label>
          <input type="text" name="fullname" value={fullname} onChange={e => this.handleChange(e)} placeholder={this.randomPlaceHolder()} required/> */}
          
          {/* </div> */}
          {/* <div className="signup-form-field">
          <label>Repeat Password:</label>
          <input type="password" name="repeatPassword" value={repeatPassword} onChange={ e => this.handleChange(e)} placeholder="******"  required />
          {this.state.isError.repeatPassword.length > 0 && (
          <span className="">{this.state.isError.repeatPassword}</span>
          )} 
          </div> */}
          {/* <div className="signup-form-field"> */}
          {/* <label>Birth date:</label>
          <input type="date" name="birthdate" value={birthdate} onChange={ e => this.handleChange(e)} required /> */}
          
          
          {/* </div> */}
          {/* <div className="signup-form-field">
          <label>Gender:</label>
          <select name="gender" value={gender} onChange={ e => this.handleChange(e)} required>
            <option defaultValue=""> Choose one </option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="none">Non-binary</option>
          </select>
          {this.state.isError.gender !== "" && (
          <span className="">{this.state.isError.gender}</span>
          )}
          </div>
          <div className="signup-form-field">
          <label>Id your heart already hacked?</label>
          <select name="isHorny" value={isHorny} onChange={ e => this.handleChange(e)} required>
            <option defaultValue=""> Choose one </option>
            <option value='false'>I already have my pair programming partner</option>
            <option value='true'>I want to find someone whi I can deploy with</option>
          </select>
          {this.state.isError.isHorny !== "" && (
          <span className="">{this.state.isError.isHorny}</span>
          )}
          </div>
          <div className="signup-form-field">
          <label>Looking for:</label>
          <select name="searchFor" value={searchFor} onChange={ e => this.handleChange(e)} required>
            <option defaultValue=""> Choose one </option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="none">Non binary</option>
            <option value="all">All</option>
          </select>
          {this.state.isError.searchFor !== "" && (
          <span className="">{this.state.isError.searchFor}</span>
          )}
          </div> */}
          {/* <div className="signup-form-field">
          <label>Description:</label>
          <textarea name="description" value={description} onChange={this.handleChange} placeholder="Describe yourself like your mother would" required></textarea>
          {this.state.isError.description !== "" && (
          <span className="">{this.state.isError.description}</span>
          )}
          </div> */}
          <div className="">
          {this.state.warning !== '' && (
            <p className='error-input'>{warning}</p>
              )} 
          
          <input
                className="btn_lightblue"
                type="submit"
                value="Create account"
              />
          </div>
          <p className='text'>Do you have an account? <Link to={"/login"} className='links'> Log in here!</Link></p>
          </form>
      </div>
    )
  }
}

export default withAuth(Signup);