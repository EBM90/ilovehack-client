<<<<<<< HEAD
// import React, { Component } from 'react'
// import './SignUp.css';
// import { withAuth } from "../../lib/AuthProvider";

// class Test extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             questions: [
//                 {question: "1", answers: ["x1", "x2", "x3"], inputType: "radio"},
//                 {question: "hola ke tal", answers: ["ok", "mal", "y a ti ke"], inputType: "radio"},
//                 {question: "3", answers: ["x", "x", "x"], inputType: "radio"},
//                 {question: "4", answers: ["x", "x", "x"], inputType: "radio"},
//                 {question: "5", answers: ["x", "x", "x"], inputType: "radio"},
//                 {question: "6", answers: ["x", "x", "x"], inputType: "radio"},
//                 {question: "7", answers: ["x", "x", "x"], inputType: "radio"},
//                 {question: "8", answers: ["x", "x", "x"], inputType: "radio"},
//                 {question: "9", answers: ["x", "x", "x"], inputType: "radio"},
//                 {question: "10", answers: ["x", "x", "x"], inputType: "radio"},
//             ],
//             userAnswers: [],
//             percentage: 0,
//             testIsShowing: false,
//         }
//     }

//     /* componentDidMount() {
//         const {questions, answers} = this.state;
//         this.setState({
//             questions: questions[0].question,
//             answers: questions[0].answers[0],
//         });
//     } */

//     toggleForm = () => {
//         if(!this.state.testIsShowing){
//             this.setState({testIsShowing: true});
//         } else {
//           this.setState({testIsShowing: false});
//         }
//     }

//     handleChange = (event) => {
//         const {name, value} = event.target;
//         this.setState({[name]: value});
//     }

//     handleFormSubmit = event => {
//         event.preventDefault();
//         const { answers } = this.state;
//         /* this.props.signup({ answers }); */
//       };
    
//     addPercent = (event) => {
//         const percentage = this.state.percentage;
//         this.setState({percentage: percentage + 10});
//         console.log(percentage, ' está')
//     }

//     hideQuestions = () => {

//     }

//     showQuestions = () => {
        
//         if(this.state.testIsShowing){
//             return (
//                 <div>            
//                 <ProgressBar percentage={this.state.percentage} />
//                     <form onSubmit={this.handleFormSubmit}>
//                         <label>preguntas</label>
//                         { this.state.questions ? this.state.questions.map((question, index) => {
//                         return (
//                             <div className="" key={index}>
//                                 <div className="">
//                                 <label for={index}>Question: {question.question}</label>
//                                 { this.state.questions[index].answers ? this.state.questions[index].answers.map((answer, index) => {
//                                     console.log(answer, 'el index')
//                                     return (
//                                         <div key={index}>
//                                         <label for={index}>Answer: {answer}</label>
//                                         <input id={answer} type="radio" name={index} value={answer} />
//                                         </div>
//                                     )
//                                 }) : <p>There are no answers yet!</p>}
                                
//                                 </div>
//                                 <button className="" onClick={() => this.addPercent()} >Next question</button>
//                             </div>
//                         )}) : <p>There are no questions yet!</p>} 
//                                 <input className="" type="submit" value="Sign up" />
//                     </form>
//                 </div>
//             )
//         }
//     }

//     render() {
//         return (
//             <div>
//                 <hr />
//                 <button onClick={() => this.toggleForm()}> Take the test </button>
//                 { this.showQuestions() }
//         </div>
//         )
//     }
// }
=======
import { withAuth } from "../../lib/AuthProvider";
import React, { Component } from 'react';
import './SignUp.css';

class Test extends Component {
    constructor(props) {
        super(props);
        this.state = {
            questions: [
                {question: "1", answers: ["x1", "x2", "x3"], inputType: "radio"},
                {question: "2", answers: ["ok", "mal", "y a ti ke"], inputType: "radio"},
                {question: "3", answers: ["a", "b", "c"], inputType: "radio"},
                {question: "4", answers: ["d", "e", "f"], inputType: "radio"},
                {question: "5", answers: ["g", "h", "i"], inputType: "radio"},
                {question: "6", answers: ["j", "k", "l"], inputType: "radio"},
                {question: "7", answers: ["m", "n", "ñ"], inputType: "radio"},
                {question: "8", answers: ["o", "p", "q"], inputType: "radio"},
                {question: "9", answers: ["r", "s", "t"], inputType: "radio"},
                {question: "10", answers: ["u", "v", "w"], inputType: "radio"},
            ],
            answers: [],
            percentage: 0,
            number: 0,
            signupInfo: props.signupInfo,
        }
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
        const { value } = event.target;
        this.setState({ answers: [...this.state.answers, value] });
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
                        <input onChange={e => this.handleChange(e)} id={answer} type={questions[number].inputType} name={number} value={answer} />
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
>>>>>>> 1944d102986ff3dbb3d33ba3bf9d0d507639b6c7

// const ProgressBar = (props) => {
//     return (
//         <div className="progress-bar">
//             <Filler percentage={props.percentage}/>
//         </div>
//     )
// }

// const Filler = (props) => {
//     return <div className="filler" style={{width: `${props.percentage}%`}}/>
// }

// export default withAuth(Test)