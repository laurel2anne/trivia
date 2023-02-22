import React from "react"
import StartPage from "./StartPage"
import QuizPage from "./QuizPage"
import SubmitPage from "./SubmitPage"
import Question from "./Question"
import { cleanupHTML } from "./helper"

function App() {
    // Create state to represents whether the user has started the quiz
    const [started, setStarted] = React.useState(false)
  
    // Create state to represents whether the user has submitted answers for review
    const [submitted, setSubmitted] = React.useState(false)

    // Create state to hold our question data from API call
    const [questions, setQuestions] = React.useState([])

    // Number of questions to ask
    const total = 3

    // Track number of correct answers
    const [correct, setCorrect] = React.useState(0)

    // Make an API call to get 5 questions
    React.useEffect(function() {
        getQuestions()
        // eslint-disable-next-line
    }, [])

    function getQuestions() {
        fetch("https://opentdb.com/api.php?amount=" + total)
            .then(res => res.json())
            .then(data => setQuestions(data.results.map((question, index) => ({
                ...question, 
                id: index, 
                selectedAnswer: "",
                isSubmitted: submitted,
                question: cleanupHTML(question.question),
                answers: getAnswers(question),
            }))))
    }

    // Create an randomly ordered array of incorrect and correct answers
    function getAnswers(question) {
        // Add incorrect answers
        let values = []
        for (let answer of question.incorrect_answers) {
            values.push(cleanupHTML(answer))
        }

        // Generate random index withng the number of available answers
        let idx = (Math.ceil(Math.random() * question.incorrect_answers.length) - 1)

        // Randomly insert correct answer into the array
        values.splice(idx, 0, cleanupHTML(question.correct_answer));

        // Build and return an array of answer objects
        let answers = []
        for (let i = 0; i < values.length; i++) { 
            answers.push(
                {
                    id: i,
                    answer: values[i],
                    isSelected: false,
                    isSubmitted: false,
                    isCorrect: false,
                }
            )
        }
        return answers
    }

    // Start a new quiz
    function newQuiz() {
        if (submitted) {
            // Call API to get new questions if we already have a list of submitted questions
            setQuestions([])
            getQuestions()
        }

        // Reset states that determine which page to display
        setStarted(true)
        setSubmitted(false)
    }

    // Check users answers
    function checkAnswers() {
        setCorrect(0)
        for (let question of questions) {
            if (question.selectedAnswer === question.correct_answer) {
                setCorrect(prevCorrect => prevCorrect + 1)
            }
        }
        setSubmitted(true)
    }

    // Update question state with what answer the user selected
    function updateSelectedAnswer(id, answer) {
        setQuestions(prevQuestions => {
            const newQuestions = []
            for(let i = 0; i < prevQuestions.length; i++) {
                const prevQuestion = prevQuestions[i]
                if (prevQuestion.id === id) {
                    if (prevQuestion.selectedAnswer === answer) {
                        newQuestions.push({ ...prevQuestion, selectedAnswer: "" })
                    } else {
                        newQuestions.push({ ...prevQuestion, selectedAnswer: answer })
                    }
                } else {
                    newQuestions.push(prevQuestion)
                }
            }
            return newQuestions
        })
    }

    // Map over the state questions array to generate our array of Question elements
    const quiz = questions.map(question => (
        <Question 
            key={question.id}
            id={question.id}
            question={cleanupHTML(question.question)} 
            correctAnswer={cleanupHTML(question.correct_answer)}
            answers={question.answers} 
            selectedAnswer={question.selectedAnswer}
            isSubmitted={submitted}
            updateSelectedAnswer={(answer) => updateSelectedAnswer(question.id, answer)}
        />
    ))

    // Depending on state, choose which page to display
    function Page() {
        if (!started) {
            return <StartPage total={total} newQuiz={() => newQuiz()}/>;
        } else if (!submitted) {
            return <QuizPage quiz={quiz} checkAnswers={() => checkAnswers()}/>;
        } else {
            return <SubmitPage quiz={quiz} correct={correct} total={total} newQuiz={() => newQuiz()}/>;
        }
    }

    // Render
    return (
        <main>
            <Page />
        </main>
    )
}

export default App