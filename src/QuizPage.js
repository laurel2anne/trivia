function QuizPage(props) {
    return (
        <div className="question-page">
            <div className="question-list">
                {props.quiz}
            </div>
            <button className="start-button" onClick={props.checkAnswers}>Check answers</button>
        </div>
    )
}

export default QuizPage