let timeLeft = document.querySelector(".time-left");
let quizContainer = document.getElementById("container");
let nextBtn = document.getElementById("next-button");
let countOfQuestion = document.querySelector(".number-of-question");
let displayContainer = document.getElementById("display-container");
let scoreContainer = document.querySelector(".score-container");
let restart = document.getElementById("restart");
let userScore = document.getElementById("user-score");
let startScreen = document.querySelector(".start-screen");
let startButton = document.getElementById("start-button");
let questionCount;
let scoreCount = 0;
let count = 21; //chang 11
let countdown;

// Questions and Options array
const quizArray = [
    {
        id: "5",
        question: "What are some common symptoms of diabetes?",
        options: [
            "Excessive Thirst",
            "Blurry Vision",
            "Frequent Urination",
            "All of the above"
        ],
        correct: "All of the above",
    },
    {
        id: "6",
        question: "How is Type 2 diabetes different from Type 1?",
        options: [
            "Type 2 is an autoimmune condition, while Type 1 is not",
            "Type 1 is more common in adults, while Type 2 is more common in children",
            "Type 1 is insulin-dependent, while Type 2 is not",
            "There is no difference"
        ],
        correct: "Type 1 is insulin-dependent, while Type 2 is not",
    },
    {
        id: "7",
        question: "What lifestyle modifications are recommended for managing diabetes?",
        options: [
            "Regular exercise",
            "Balanced diet",
            "Monitoring blood sugar levels",
            "All of the above"
        ],
        correct: "All of the above",
    },
    {
        id: "8",
        question: "How can diabetes be prevented?",
        options: [
            "Maintaining a healthy weight",
            "Regular physical activity",
            "Getting enough sleep",
            "All of the above"
        ],
        correct: "All of the above",
    },
    {
        id: "9",
        question: "Where is insulin produced in the body?",
        options: [
            "Pancreas",
            "Liver",
            "Kidneys",
            "Heart"
        ],
        correct: "Pancreas",
    },
    {
        id: "10",
        question: "What role does insulin play in the body?",
        options: [
            "Raises blood sugar levels",
            "Lowers blood sugar levels",
            "Digests carbohydrates",
            "Produces antibodies"
        ],
        correct: "Lowers blood sugar levels",
    },
];

// Restart Quiz
restart.addEventListener("click", () => {
    initial();
    displayContainer.classList.remove("hide");
    scoreContainer.classList.add("hide");
});

// Next Button
nextBtn.addEventListener(
    "click",
    (displayNext = () => {
        // Increment questionCount
        questionCount += 1;
        // If the last question
        if (questionCount == quizArray.length) {
            // Hide the question container and display the score
            displayContainer.classList.add("hide");
            scoreContainer.classList.remove("hide");
            // User score
            userScore.innerHTML = "Your score is " + scoreCount + " out of " + questionCount;
        } else {
            // Display questionCount
            countOfQuestion.innerHTML = questionCount + 1 + " of " + quizArray.length + " Question";
            // Display quiz
            quizDisplay(questionCount);
            count = 21; //change 11
            clearInterval(countdown);
            timerDisplay();
        }
    })
);

// Timer
const timerDisplay = () => {
    countdown = setInterval(() => {
        count--;
        timeLeft.innerHTML = `${count}s`;
        if (count == 0) {
            clearInterval(countdown);
            displayNext();
        }
    }, 1000);   //change 1000 2000
};

// Display quiz
const quizDisplay = (questionCount) => {
    let quizCards = document.querySelectorAll(".container-mid");
    // Hide other cards
    quizCards.forEach((card) => {
        card.classList.add("hide");
    });
    // Display the current question card
    quizCards[questionCount].classList.remove("hide");
};

// Quiz Creation
function quizCreator() {
    // Randomly sort questions
    quizArray.sort(() => Math.random() - 0.5);
    // Generate the quiz
    for (let i of quizArray) {
        // Randomly sort options
        i.options.sort(() => Math.random() - 0.5);
        // Quiz card creation
        let div = document.createElement("div");
        div.classList.add("container-mid", "hide");
        // Question number
        countOfQuestion.innerHTML = 1 + " of " + quizArray.length + " Question";
        // Question
        let question_DIV = document.createElement("p");
        question_DIV.classList.add("question");
        question_DIV.innerHTML = i.question;
        div.appendChild(question_DIV);
        // Options
        div.innerHTML += `
            <button class="option-div" onclick="checker(this)">${i.options[0]}</button>
            <button class="option-div" onclick="checker(this)">${i.options[1]}</button>
            <button class="option-div" onclick="checker(this)">${i.options[2]}</button>
            <button class="option-div" onclick="checker(this)">${i.options[3]}</button>
        `;
        quizContainer.appendChild(div);
    }
}

// Checker Function to check if the option is correct or not
function checker(userOption) {
    let userSolution = userOption.innerText;
    let question = document.getElementsByClassName("container-mid")[questionCount];
    let options = question.querySelectorAll(".option-div");

    // If the user clicked answer == the correct option stored in the object
    if (userSolution === quizArray[questionCount].correct) {
        userOption.classList.add("correct");
        scoreCount++;
    } else {
        userOption.classList.add("incorrect");
        // For marking the correct option
        options.forEach((element) => {
            if (element.innerText == quizArray[questionCount].correct) {
                element.classList.add("correct");
            }
        });
    }

    // Clear interval(stop the timer)
    clearInterval(countdown);
    // Disable all options
    options.forEach((element) => {
        element.disabled = true;
    });
}

// Initial setup
function initial() {
    quizContainer.innerHTML = "";
    questionCount = 0;
    scoreCount = 0;
    count = 21;  //chamge11
    clearInterval(countdown);
    timerDisplay();
    quizCreator();
    quizDisplay(questionCount);
}

// When the user clicks on the start button
startButton.addEventListener("click", () => {
    startScreen.classList.add("hide");
    displayContainer.classList.remove("hide");
    initial();
});

// Hide the quiz and display the start screen
window.onload = () => {
    startScreen.classList.remove("hide");
    displayContainer.classList.add("hide");
};
