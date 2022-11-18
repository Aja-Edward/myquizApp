const question = document.getElementById("question");
// const choices = document.getElementsByClassName("choice-text");
const choices = Array.from(document.getElementsByClassName("choice-text"));
console.log(choices)
const progressText = document.getElementById('progressText');
const scoreText = document.getElementById('score');
const progressBarFul = document.getElementById('progressBarFull');
let numberOfQuestions = localStorage.getItem('numberOfQuestions') || 10;
let difficulty = localStorage.getItem('questionDifficulty') || 'easy';
const loader = document.getElementById("loader");
const game = document.getElementById("game");
const firstloader = document.getElementById("firstloader")



// const selectDifficulty = (questDifficultyLevel) => {
//     questionDifficulty = questDifficultyLevel
// }
document.querySelectorAll('.radioBtn').forEach(difficulty => {
    difficulty.addEventListener('change', (e) => {
        difficulty = e.target.dataset.difficulty;
        console.log(e.target.dataset.difficulty)
    })
})
console.log({ difficulty }, localStorage.getItem('questionDifficulty'))

let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [];


fetch(`https://opentdb.com/api.php?amount=${numberOfQuestions}&category=18&difficulty=${difficulty}&type=multiple`)
    .then(res => {
        return res.json();
    })
    .then(({ results }) => {
        console.log(results);
        questions = results.map(loadedQuestion => {
            const formattedQuestion = {
                question: loadedQuestion.question
            };

            const answerChoices = [...loadedQuestion.incorrect_answers];
            formattedQuestion.answer = Math.floor(Math.random() * 3) + 1;


            answerChoices.splice(formattedQuestion.answer - 1, 0, loadedQuestion.correct_answer
            );
            answerChoices.forEach((choice, index) => {
                formattedQuestion["choice" + (index + 1)] = choice;
            });
            return formattedQuestion;
        });
        game.classList.remove("hidden");
        loader.classList.add("hidden");
        firstloader.classList.add("hidden")
        startGame()
    })
    .catch(err => {
        console.error(err);
    })

// CONSTANT
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = numberOfQuestions;
console.log(questions);

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    console.log(availableQuestions);
    getNewQuestion();
};

getNewQuestion = () => {
    if (availableQuestions === 0 || questionCounter >= MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore1', score);
        // go to the end game page
        return window.location.assign("endfrontgamepage.html")
    }

    progressBarFul.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;
    questionCounter++;
    // update the progress bar
    // console.log((questionCounter / MAX_QUESTIONS) * 100)

    progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;
    questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach(choice => {
        const number = choice.dataset["number"];
        choice.innerText = currentQuestion["choice" + number];
    });
    availableQuestions.splice(questionIndex, 1);
    acceptingAnswers = true;
};

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if (!acceptingAnswers) return;
        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset["number"];

        console.log(selectedAnswer == currentQuestion.answer)

        classToApply =
            selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

        if (classToApply === "correct") {
            increamentScore(CORRECT_BONUS);
        }
        console.log(classToApply);
        selectedChoice.parentElement.classList.add(classToApply);



        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);

            getNewQuestion();
        }, 1000)

    });
});

increamentScore = num => {
    score += num;
    scoreText.innerText = score
}


window.addEventListener('load', () => {
    localStorage.removeItem('questionDifficulty');
})
document.querySelector('.select-number').addEventListener('input', (e) => {
    let numberOfQuestions = e.target.value;
    console.log(e.target.value)
    if (numberOfQuestions <= 0) {
        numberOfQuestions = 10
    }
    localStorage.setItem("numberOfQuestions", numberOfQuestions)
});








