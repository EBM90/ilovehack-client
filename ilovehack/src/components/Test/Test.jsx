import { withAuth } from "../../lib/AuthProvider";
import React, { Component } from 'react';
import userservice from '../../lib/user-service'
import Loading from '../Loading/loading'
import './Test.css'

class Test extends Component {
        state = {
            questions: [],
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
            button: 'btn_inverted'
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

    backHome =() =>{
        this.props.history.push('/home')
    }


    handleChange = event => {
        const { name, value } = event.target;
        if(event.target.className === 'btn_inverted'){
            event.target.className = 'btn_lightblue'
        } else {
            event.target.className = 'btn_inverted'
        }

        this.setState({ [name]: value });

        this.nextQuestion()
        
    };
    

    render() {
        const {questions, number, button} = this.state;
        return (
            <>
            <div className="top-test">
            <h3>Personality Test</h3> <a className='text'>Exit test</a>
            </div>
            <ProgressBar percentage={this.state.percentage} />
            <div className="test-container">
            <form onSubmit={this.handleFormSubmit} className='theTest'>
            {questions.length !== 0 && questions[number].question ? <p>{questions[number].question}</p> : null}
            
                {questions.length !== 0 && questions[number].answers ? questions[number].answers.map((answer, index) => {
                    return (
                            <input className={button} name={`answer${number}`} value={answer} onClick={(e) => this.handleChange(e)}></input>
                        
                        )
                        }) : <Loading/>}
                        <button className={this.state.number ===  this.state.questions.length - 1?  'button-submit-signup-show' : "button-submit-signup-hide" } >Submit</button>
            </form>
            {this.state.number === 0 ?  <button className='btn_inverted' onClick={() => {this.backHome()}}>Back to your homepage</button> : <button className='btn_inverted' onClick={() => {this.prevQuestion(); this.deletePercent()}}>Back</button>}
            <button className='btn_lightblue' onClick={() => {this.nextQuestion(); this.addPercent()}}>Next</button>
            
            </div>
            </>
        )
    }
}

const ProgressBar = (props) => {
    return (
        <div className="progress_bar">
            <Filler percentage={props.percentage}/>
        </div>
    )
}

const Filler = (props) => {
    return <div className="filler" style={{width: `${props.percentage}%`}}/>
}

export default withAuth(Test)