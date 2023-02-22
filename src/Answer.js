function Answer(props) {
    // Style op tions
    const selected = "answer-button answer-button-selected";
    const unselected = "answer-button answer-button-unselected";
    const correct = "answer-button answer-button-correct";
    const incorrect = "answer-button answer-button-incorrect";

    // Define style
    let name = "";
    if (props.isSubmitted) {
        if (props.isCorrect) {
            name = correct;
        } else if (props.isSelected) {
            name = incorrect;
        } else {
            name = unselected;
        }
    } else if (props.isSelected) {
        name = selected;
    } else {
        name = unselected;
    }

    // Render
    return (
        <button className={name} onClick={props.clickAnswer}>{props.answer}</button>
    )
}

export default Answer