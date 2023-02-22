import React from "react"
import Answer from './Answer'

function Question(props) {
    // Create state to hold our answers
    const [answers, setAnswers] = React.useState(props.answers)

    // Get answer text for this id
    function getAnswer(id) {
        for (let answer of answers) {
            if (answer.id === id) {
                return answer.answer
            }
        }
        return ""
    }

    // Watch for what answer the user selects
    function clickAnswer(id) {
        if (props.isSubmitted) {
            // Do not allow user to update selection if already submitted
            return
        }

        // Update selected state of answers
        setAnswers(prevAnswers => {
            // .map returns a new array without modifying the original array and will have the same length
            return prevAnswers.map(answer => {
                // Return the new array that has been modified
                return answer.id === id ? 
                    {...answer, isSelected: !answer.isSelected } : 
                    {...answer, isSelected: false}
            })
        })

        // Tell parent question which answer was selected
        props.updateSelectedAnswer(getAnswer(id))
    }

    // Map over state answer array and create an answer button for each
    const buttons = answers.map(answer => (
        <Answer 
            key={answer.id}
            id={answer.id}
            answer={answer.answer} 
            isSelected={(props.selectedAnswer === answer.answer)}
            isSubmitted={props.isSubmitted}
            isCorrect={(props.correctAnswer === answer.answer)}
            clickAnswer={() => clickAnswer(answer.id)}
        />
    ))

    // Render answer buttons
    return (
        <div className="questions-page">
            <div className="question">
                <h2 className="question--text">{props.question}</h2>
                    <div className="option-buttons-container">
                        {buttons}
                    </div>
                </div>
            <hr />
        </div>
    )
}

export default Question