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