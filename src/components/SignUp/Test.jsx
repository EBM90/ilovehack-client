import React, { Component } from 'react';
import './SignUp.css';
import { withAuth } from "../../lib/AuthProvider";

class Test extends Component {
    constructor(props) {
        super(props);
        this.state = {
            questions: [
                {question: "1", answers: ["x1", "x2", "x3"], inputType: "radio"},
                {question: "hola ke tal", answers: ["ok", "mal", "y a ti ke"], inputType: "radio"},
                {question: "3", answers: ["x", "x", "x"], inputType: "radio"},
                {question: "4", answers: ["x", "x", "x"], inputType: "radio"},
                {question: "5", answers: ["x", "x", "x"], inputType: "radio"},
                {question: "6", answers: ["x", "x", "x"], inputType: "radio"},
                {question: "7", answers: ["x", "x", "x"], inputType: "radio"},
                {question: "8", answers: ["x", "x", "x"], inputType: "radio"},
                {question: "9", answers: ["x", "x", "x"], inputType: "radio"},
                {question: "10", answers: ["x", "x", "x"], inputType: "radio"},
            ],
            answers: [],
            percentage: 0,
            testIsShowing: false,
            number: 0,
            signupInfo: props.signupInfo,
        }
    }

    componentDidMount() {
        console.log(this.state)
    }

    toggleForm = () => {
        if(!this.state.testIsShowing){
            this.setState({testIsShowing: true});
        } else {
          this.setState({testIsShowing: false});
        }
    }

    handleChange = (event) => {
        const {name, value} = event.target;
        this.setState({[name]: value});
    }

    handleFormSubmit = event => {
        event.preventDefault();
        const { answers } = this.state;
        const { fullname, password, repeatPassword, birthdate, gender, email, description, isHorny, searchFor } = this.state.signupInfo;
        this.props.signup({ answers, fullname, password, repeatPassword, birthdate, gender, email, description, isHorny, searchFor });
        console.log(this.state)
      };
    
    addPercent = (event) => {
        const percPerQuestion = 100 / this.state.questions.length
        const percentage = this.state.percentage;
        this.setState({percentage: percentage + percPerQuestion});
    }

    nextQuestion = () => {
        const number = this.state.number;
        let i = 0;
        if(i < this.state.questions.length) {
            return this.setState({number: number + 1});
        } else if (i === this.state.questions.length ){
            return i = 0;
        }
    }

    handleChange = event => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
        };

    render() {
        const {questions, number} = this.state;
        return (
            <div>
            <ProgressBar percentage={this.state.percentage} />
            <form onSubmit={this.handleFormSubmit}>
                <h3>{questions[number].question}</h3>
                { questions[number].answers ? questions[number].answers.map((answer, index) => {
                    return (
                        <div key={index}>
                        <label for={index}>Answer: {answer}</label>
                        <input onChange={e => this.handleChange(e)} id={index} type="radio" name={answer} value={answer} />
                        </div>
                        )
                        }) : <p>There are no answers yet!</p>}
                        <button className={this.state.number ===  this.state.questions.length - 1?  'button-submit-signup-show' : "button-submit-signup-hide" } >Submit</button>
            </form>
            <button className={this.state.number ===  this.state.questions.length - 1?  'button-submit-signup-hide' : "button-submit-signup-show" } onClick={() => {this.nextQuestion(); this.addPercent()}}>next</button>
            </div>
        )
    }
}

const ProgressBar = (props) => {
    return (
        <div className="progress-bar">
            <Filler percentage={props.percentage}/>
        </div>
    )
}

const Filler = (props) => {
    return <div className="filler" style={{width: `${props.percentage}%`}}/>
}

export default withAuth(Test)