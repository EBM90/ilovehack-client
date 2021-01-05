import { withAuth } from "../../lib/AuthProvider";
import React, { Component } from 'react';
import userservice from '../../lib/user-service'

class Test extends Component {
        state = {
            questions: [
                // {question: "3?", answers: ["a", "b", "c"], inputType: "radio", isChecked: false},
                // {question: "3?", answers: ["a", "b", "c"], inputType: "radio", isChecked: false},
                // {question: "3?", answers: ["a", "b", "c"], inputType: "radio", isChecked: false},
                // {question: "4?", answers: ["d", "e", "f"], inputType: "radio", isChecked: false},
                // {question: "5?", answers: ["g", "h", "i"], inputType: "radio", isChecked: false},
                // {question: "6?", answers: ["j", "k", "l"], inputType: "radio", isChecked: false},
                // {question: "7?", answers: ["m", "n", "ñ"], inputType: "radio", isChecked: false},
                // {question: "8?", answers: ["o", "p", "q"], inputType: "radio", isChecked: false},
                // {question: "9?", answers: ["r", "s", "t"], inputType: "radio", isChecked: false},
                // {question: "10?", answers: ["u", "v", "w"], inputType: "radio", isChecked: false},
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
            isChecked: false,
            isChecked1: false,
            isChecked2: false,
            isChecked3: false,
        }

    questions = async() =>{
        const theQuestions = await userservice.getQuestions()
        console.log(theQuestions)
        this.setState({
            questions: theQuestions
        })
    }

    componentDidMount = () =>{
        this.questions()
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

    backToSignup =() =>{
        this.props.history.push('/signup')
    }

    checkCheck =(option)=>{
        console.log(option)
        if(option === 'isChecked1'){
            this.setState({
                isChecked1: !this.state.isChecked1
            })
        } else if(option === 'isChecked2'){
            this.setState({
                isChecked2: !this.state.isChecked2
            })
        } else {
            this.setState({
                isChecked3: !this.state.isChecked3
            })
        }
    }

    handleChange = event => {
        const { name, value } = event.target;
        event.target.checked = true
        this.setState({ [name]: value });
        };

    render() {
        const {questions, number, isChecked} = this.state;
        return (
            <div className="test-container">
            <form onSubmit={this.handleFormSubmit}>
            {questions.length !== 0 && questions[number].question ? <p>{questions[number].question}</p> : null}
            
                {questions.length !== 0 && questions[number].answers ? questions[number].answers.map((answer, index) => {
                    return (
                        <div key={index}>
                        <label for={answer}>{answer}</label>
                        <input onChange={e => this.handleChange(e)} id={`answer${number}`} type='radio' name={`answer${number}`} value={answer} />
                        </div>
                        )
                        }) : <p>There are no answers yet!</p>}
                        <button className={this.state.number ===  this.state.questions.length - 1?  'button-submit-signup-show' : "button-submit-signup-hide" } >Submit</button>
            </form>
            {this.state.number === 0 ?  <button className='' onClick={() => {this.backToSignup()}}>Back to sign up</button> : <button className='' onClick={() => {this.prevQuestion(); this.deletePercent()}}>Previous</button>}
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