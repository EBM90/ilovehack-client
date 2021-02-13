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
            unselected: 'btn_inverted',
            selected: 'btn_lightblue',
            count: 0,
        }

    questions = async() =>{
        const theQuestions = await userservice.getQuestions()
        console.log(theQuestions)
        this.setState({
            questions: theQuestions,
            answers: [this.state.answer0, this.state.answer1, this.state.answer2, this.state.answer3, this.state.answer4,
                this.state.answer5, this.state.answer6, this.state.answer7, this.state.answer8, this.state.answer9]
        })
    }

    componentDidMount = () =>{
        this.questions()
    }

    
    handleFormSubmit = async(event) => {
        try {
            event.preventDefault();
          
            const { answers } = this.state;
         
            await userservice.getAnswers(answers)
            this.props.history.push('/home')
        } catch (error) {
            console.log(error)
        }
        
    };
    
    checkPercent = () => {
        this.setState({
            percentage: this.state.number * 10
        }) 
    }

    

    nextQuestion = () => {
        const number = this.state.number;
        let i = 0;
        
        if(i < this.state.questions.length) {
            this.setState({number: number + 1,
                answers: [this.state.answer0, this.state.answer1, this.state.answer2, this.state.answer3, this.state.answer4,
                    this.state.answer5, this.state.answer6, this.state.answer7, this.state.answer8, this.state.answer9]})
            
        } else if (i === this.state.questions.length ){
            return i = 0
        }
       
    }

    prevQuestion = () => {
        const number = this.state.number;
        let i = 0;
        
        if(i < this.state.questions.length ) {
            this.setState({number: number - 1,
                answers: [this.state.answer0, this.state.answer1, this.state.answer2, this.state.answer3, this.state.answer4,
                    this.state.answer5, this.state.answer6, this.state.answer7, this.state.answer8, this.state.answer9]
            }
            
            )
        } else if (i === 1 ){
            this.backToSignup()
        }
       
    }

    backHome =() =>{
        this.props.history.push('/home')
    }


    handleChange = event => {
        const { name, value } = event.target;
        this.setState({ [name]: value });

        this.setState({
            answers: [this.state.answer0, this.state.answer1, this.state.answer2, this.state.answer3, this.state.answer4,
                this.state.answer5, this.state.answer6, this.state.answer7, this.state.answer8, this.state.answer9]
        })

        if(this.state.number < 8){
            this.nextQuestion()
        }
        
        this.checkPercent()
    };
    

    render() {
        const {questions, number, unselected, selected} = this.state;
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
                            <input className={this.state.answers[number] === answer ? selected : unselected} name={`answer${number}`} value={answer} onClick={(e) => this.handleChange(e)}></input>
                        
                        )
                        }) : <Loading/>}
                        <button className={this.state.number ===  this.state.questions.length - 1 ?  'btn_darkblue' : "button-submit-signup-hide" } >Submit</button>
            </form>
            <div className='test-buttons'>
                    {this.state.number === 0 ?  <button className='btn_inverted' onClick={() => {this.backHome()}}>Back to homepage</button> : <button className='btn_inverted' onClick={() => {this.prevQuestion()}}>Back</button>}
                    <button className='btn_lightblue' onClick={() => {this.nextQuestion()}}>Next</button>
            </div>
            
            
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