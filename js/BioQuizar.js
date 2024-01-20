// References
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
        id: "0",
        question: "ما هِيَ البنكرياس؟",
        options: ["غدة", "عضلة", "عصب", "جزء من الجهاز التنفسي"],
        correct: "غدة",
    },
    {
        id: "1",
        question: "ما هي الوظائف الرئيسية للبنكرياس؟",
        options: ["  وظيفة الغدة خارجية الإفراز", "تفرز الهرمونات لتنظيم مستويات السكر", "وظيفة الغدة الصماء", "كل ما ذكر"],
        correct: "كل ما ذكر",
    },
    {
        id: "2",
        question: "ما هي وظيفة الغدة خارجية الإفراز للبنكرياس؟",
        options: ["افراز الإنزيمات الهاضمة", "إطلاق الهرمونات", "تنظيم مستويات السكر في الدم", "امتصاص العناصر الغذائية"],
        correct: "افراز الإنزيمات الهاضمة",
    },
    {
        id: "3",
        question: "ما هي الإنزيمات الهاضمة التي تفرزها البنكرياس؟",
        options: ["الأميليز", "البروتييز", "الليباز", "كل ما ذكر"],
        correct: "كل ما ذكر",
    },
    {
        id: "4",
        question: "وظيفة من وظائف الغدة الصماء البنكرياسية",
        options: ["إفراز هرمون النمو", "إفراز الجلوكاجون", "الهضم", "كل ما ذكر"],
        correct: "إفراز الجلوكاجون",
    },
    {
        id: "5",
        question: "ما هو دور الأنسولين في الجسم؟",
        options: ["خفض مستويات السكر في الدم", "رفع مستويات السكر في الدم", "هضم البروتينات", "تحليل الدهون"],
        correct: "خفض مستويات السكر في الدم",
    },
    {
        id: "6",
        question: "ما هو دور الجلوكاجون في الجسم؟",
        options: ["رفع مستويات السكر في الدم", "خفض مستويات السكر في الدم", "هضم الكربوهيدرات", "تحليل الدهون"],
        correct: "رفع مستويات السكر في الدم",
    },
    {
        id: "7",
        question: "ما هي أجزاءُ البنكرياس؟",
        options: ["كل ما ذكر","رأس البنكرياس", "عنق البنكرياس", "جسم البنكرياس", "ذيل البنكرياس"],
        correct: "كل ما ذكر",
    },
    {
        id: "8",
        question: "ما هو الجزء الذي يربط رأس البنكرياس بباقي البنكرياس  ",
        options: ["رأس البنكرياس", "عنق البنكرياس", "جسم البنكرياس", "ذيل البنكرياس"],
        correct: "عنق البنكرياس",
    },
    {
        id: "9",
        question: "الجزء الأوسع في الوسط و الذي يقع خلف المعدة",
        options: ["رأس البنكرياس", "عنق البنكرياس", "جسم البنكرياس", "ذيل البنكرياس"],
        correct: "جسم البنكرياس",
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
    }, 1000);   //change 1000
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
