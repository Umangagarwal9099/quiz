const questions = [
    {
        question: "What is the capital of India?",
        answers: [
            { text: "Delhi", correct: true },
            { text: "Hyderabad", correct: false },
            { text: "Telangana", correct: false },
            { text: "Gujarat", correct: false }
        ]
    },
    {
        question: "What is the capital of France?",
        answers: [
            { text: "Paris", correct: true },
            { text: "London", correct: false },
            { text: "Berlin", correct: false },
            { text: "Madrid", correct: false }
        ]
    },
    {
        question: "which is the smallest country in the world?",
        answers: [
             { text: "Bhutan", correct: false},
             { text: "Nepal", correct: false},
             { text: "vatican city", correct: true},
             { text: "Shri Lanka", correct: false}
        ]
    },
    {
        question: "which is the largest desert bin the world?",
        answers: [
            { text: "kalahari", correct: false},
            { text: "Sahara", correct: true},
            { text: "Gobi", correct: false},
            { text: "Antarctica", correct: false}
        ]
    }
];

const questionElement = document.getElementById("question");
const ansButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const timerElement = document.getElementById('timer');
const timeElement = document.getElementById('time');

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    timeLeft = 30;
    nextButton.innerHTML = "Next";
    showQuestion();
    startTimer();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        ansButtons.appendChild(button);
        if(answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState() {
    nextButton.style.display = "none";
    while(ansButtons.firstChild) {
        ansButtons.removeChild(ansButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    }else {
        selectedBtn.classList.add("incorrect");
    }
    Array.from(ansButtons.children).forEach(button => {
        if(button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "play again";
    nextButton.style.display = "block";

}

function handleNextButton() {
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else {
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if(currentQuestionIndex < questions.length) {
        handleNextButton();
    }else {
        startQuiz();
    }
});

function startTimer() {
    timerInterval = setInterval(() => {
        timeLeft--;
        timeElement.innerText = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            setNextQuestion();
        }
    }, 1000);
}

startQuiz();