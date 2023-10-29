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
        question: "أين يقع رأس البنكرياس بالنسبة للأعضاء الأخرى؟",
        options: ["الجهة اليسرى، بالقرب من الطحال", "الجهة اليمنى، بالقرب من المعدة", "خلف المعدة", "في وسط البطن"],
        correct: "الجهة اليمنى، بالقرب من المعدة",
    },
    {
        id: "1",
        question: "أي جزء من البنكرياس يربط الرأس ببقية العضو؟",
        options: ["العنق", "الذيل", "الجسم", "التقاطع"],
        correct: "العنق",
    },
    {
        id: "2",
        question: "يقع جسم البنكرياس:",
        options: ["خلف الطحال", "على الجهة اليمنى من البطن", "على الجهة اليسرى من البطن", "أمام المعدة"],
        correct: "على الجهة اليسرى من البطن",
    },
    {
        id: "3",
        question: "ما هو وظيفة ذيل البنكرياس؟",
        options: ["إفراز الإنزيمات الهاضمة", "تنظيم مستوى السكر في الدم", "الوصول نحو الكبد", "الوصول نحو الطحال"],
        correct: "الوصول نحو الطحال",
    },
    {
        id: "4",
        question: "العنق في البنكرياس يربط بين أي جزئين من العضو؟",
        options: ["الرأس والذيل", "الذيل والجسم", "الرأس والجسم", "الجسم والذيل"],
        correct: "الرأس والجسم",
    },
    {
        id: "5",
        question: "أي عضو قريب من الجهة اليمنى للبنكرياس؟",
        options: ["الطحال", "المعدة", "الكبد", "الأمعاء الدقيقة"],
        correct: "الكبد",
    },
    {
        id: "6",
        question: "في أي جزء من البطن يقع جسم البنكرياس؟",
        options: ["البطن العلوي", "البطن السفلي", "البطن اليمنى", "البطن اليسرى"],
        correct: "البطن اليسرى",
    },
    {
        id: "7",
        question: "ما هي الوظيفة الرئيسية لرأس البنكرياس؟",
        options: ["إنتاج الأنسولين", "هضم البروتينات", "إفراز الإنزيمات الهاضمة", "تنظيم مستوى السكر في الدم"],
        correct: "إفراز الإنزيمات الهاضمة",
    },
    {
        id: "8",
        question: "يصل ذيل البنكرياس نحو أي عضو؟",
        options: ["الكبد", "الطحال", "الكلية", "المرارة"],
        correct: "الطحال",
    },
    {
        id: "9",
        question: "أي جزء من البنكرياس هو الأقرب إلى الجزء الأول من الأمعاء الدقيقة؟",
        options: ["الرأس", "العنق", "الجسم", "الذيل"],
        correct: "الرأس",
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
    }, 2000);   //change 1000
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
