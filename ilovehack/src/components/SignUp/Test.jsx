import React, { Component } from 'react'
import './SignUp.css';

export default class Test extends Component {
    state = {
        questions: [
            {question: "1", answers: ["x", "x", "x"]},
            {question: "2", answers: ["x", "x", "x"]},
            {question: "3", answers: ["x", "x", "x"]},
            {question: "4", answers: ["x", "x", "x"]},
            {question: "5", answers: ["x", "x", "x"]},
            {question: "6", answers: ["x", "x", "x"]},
            {question: "7", answers: ["x", "x", "x"]},
            {question: "8", answers: ["x", "x", "x"]},
            {question: "9", answers: ["x", "x", "x"]},
            {question: "10", answers: ["x", "x", "x"]},
        ],
        answers: [
            {answer1: ""},
            {answer2: ""},
            {answer3: ""},
            {answer4: ""},
            {answer5: ""},
            {answer6: ""},
            {answer7: ""},
            {answer8: ""},
            {answer9: ""},
            {answer10: ""},
        ],
        percentage: 30,
    }

    handleFormSubmit = event => {
        event.preventDefault();
        const { answers } = this.state;
        this.props.signup({ answers });
      };

    

    render() {
        return (
            <div>
            <ProgressBar percentage={this.state.percentage} />
                <form onSubmit={this.handleFormSubmit}>
                    <label>{this.state.questions.map}</label>
                    { this.state.questions ? this.state.questions.map((question, index) => {
                    return (
                        <div className="" key={index}>
                            <div className="">
                            <p>Question: {question.question}</p>
                            <p>Answers:{question.answers}</p>
                            </div>
                        </div>
                    )}) : <p>There are no questions yet!</p>} 
                </form>
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