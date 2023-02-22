function SubmitPage(props) {
    return (
        <div className="question-page">
            <div className="question-list">
                {props.quiz}
            </div>
            <div className="play-again-button-wrapper">
                <p className="play-again-results">You scored {props.correct}/{props.total} correct answers</p>
                <button className="start-button" onClick={props.newQuiz}>Play again</button>
            </div>
        </div>
    )
}

export default SubmitPage