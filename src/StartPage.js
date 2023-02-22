function StartPage(props) {
    return (
        <div className="start-page">
            <h1 className="start-title">Quizzical</h1>
            <p className="start-description">See if you can answer {props.total} trivia questions correctly!</p>
            <button className="start-button" onClick={props.newQuiz}>Start quiz</button>
        </div>
    )
}

export default StartPage