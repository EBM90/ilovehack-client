import { withAuth } from "../../lib/AuthProvider";
import React, { Component } from 'react';
import userservice from '../../lib/user-service'

class Test extends Component {
        state = {
            questions: [
                {question: "1?", answers: ["x1", "x2", "x3"], inputType: "radio"},
                {question: "2?", answers: ["ok", "mal", "y a ti ke"], inputType: "radio"},
                {question: "3?", answers: ["a", "b", "c"], inputType: "radio"},
                {question: "4?", answers: ["d", "e", "f"], inputType: "radio"},
                {question: "5?", answers: ["g", "h", "i"], inputType: "radio"},
                {question: "6?", answers: ["j", "k", "l"], inputType: "radio"},
                {question: "7?", answers: ["m", "n", "ñ"], inputType: "radio"},
                {question: "8?", answers: ["o", "p", "q"], inputType: "radio"},
                {question: "9?", answers: ["r", "s", "t"], inputType: "radio"},
                {question: "10?", answers: ["u", "v", "w"], inputType: "radio"},
            ],
            answer0:'',
            answer1:'',
            answer2:'',
            answer3:'',
            answer4:'',
            answer5:'',
            answer6:'',
            answer7:'',
            answer8:'',
            answer9:'',
            answers: [],
            percentage: 0,
            number: 0,
        }

    handleFormSubmit = async(event) => {
        try {
            event.preventDefault();
            const {answer0, answer1, answer2, answer3, answer4, answer5, answer6, answer7, answer8, answer9} = this.state
            const { answers } = this.state;
            answers.push(answer0)
            answers.push(answer1)
            answers.push(answer2)
            answers.push(answer3)
            answers.push(answer4)
            answers.push(answer5)
            answers.push(answer6)
            answers.push(answer7)
            answers.push(answer8)
            answers.push(answer9)
            console.log(answers)
            await userservice.getAnswers(answers)
            this.props.history.push('/home')
        } catch (error) {
            console.log(error)
        }
        
    };
    
    addPercent = (event) => {
        const percPerQuestion = 100 / this.state.questions.length
        const percentage = this.state.percentage;
        this.setState({percentage: percentage + percPerQuestion});
    }

    deletePercent = (event) => {
        const percPerQuestion = 100 / this.state.questions.length
        const percentage = this.state.percentage;
        this.setState({percentage: percentage - percPerQuestion});
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

    prevQuestion = () => {
        const number = this.state.number;
        let i = 0;
        if(i < this.state.questions.length ) {
            return this.setState({number: number - 1});
        } else if (i === 1 ){
            return this.backToSignup()
        }
    }

    handleChange = event => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
        };

    render() {
        const {questions, number} = this.state;
        return (
            <div className="test-container">
            <form onSubmit={this.handleFormSubmit}>
            <p>{questions[number].question}</p>
                { questions[number].answers ? questions[number].answers.map((answer, index) => {
                    return (
                        <div key={index}>
                        <label for={answer}>{answer}</label>
                        <input onChange={e => this.handleChange(e)} id={answer} type={questions[number].inputType} name={`answer${number}`} value={answer} />
                        </div>
                        )
                        }) : <p>There are no answers yet!</p>}
                        <button className={this.state.number ===  this.state.questions.length - 1?  'button-submit-signup-show' : "button-submit-signup-hide" } >Submit</button>
            </form>
            {this.state.number === 0 ?  <button className='' onClick={() => {this.props.hideForm()}}>Back to sign up</button> : <button className='' onClick={() => {this.prevQuestion(); this.deletePercent()}}>Previous</button>}
            <button className={this.state.number ===  this.state.questions.length - 1?  'button-submit-signup-hide' : "button-submit-signup-show" } onClick={() => {this.nextQuestion(); this.addPercent()}}>Next</button>
            <ProgressBar percentage={this.state.percentage} />
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