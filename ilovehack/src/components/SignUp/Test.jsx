import React, { Component } from 'react'

export default class Test extends Component {
    state = {
        questions: [
            question1: {question: "", answer: ""},
            question2: "",
            question3: "",
            question4: "",
            question5: "",
            question6: "",
            question7: "",
            question8: "",
            question9: "",
            question10: "",
        ],
        answers: [
            answer1: "",
            answer2: "",
            answer3: "",
            answer4: "",
            answer5: "",
            answer6: "",
            answer7: "",
            answer8: "",
            answer9: "",
            answer10: "",
        ]
    }
    render() {
        return (
            <div>
                <form>
                    <label>{this.state.questions.map}</label>

                </form>
            </div>
        )
    }
}
