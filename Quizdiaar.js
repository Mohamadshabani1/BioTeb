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
        question: "ما هي بعض الأعراض الشائعة لمرض السكري؟",
        options: [
            "العطش الزائد",
            "رؤية غير واضحة",
            "التبول المتكرر",
            "الكل مما ذكر"
        ],
        correct: "الكل مما ذكر",
    },
    {
        id: "1",
        question: "أين يتم إنتاج الإنسولين في الجسم؟",
        options: [
            "البنكرياس",
            "الكبد",
            "الكلى",
            "القلب"
        ],
        correct: "البنكرياس",
    },
    {
        id: "2",
        question: "ما هو الدور الذي يلعبه الإنسولين في الجسم؟",
        options: [
            "يرفع مستويات السكر في الدم",
            "يخفض مستويات السكر في الدم",
            "يهضم الكربوهيدرات",
            "ينتج أجسام المضادات"
        ],
        correct: "يخفض مستويات السكر في الدم",
    },
    {
        id: "3",
        question: "ما هو الفحص الذي يستخدم لتشخيص مرض السكري؟",
        options: [
            "تصوير الرنين المغناطيسي",
            "اختبار الضغط الدم",
            "تحليل البول",
            "فحص السكر في الدم"
        ],
        correct: "فحص السكر في الدم",
    },
    {
        id: "4",
        question: "ما النصيحة التي يمكن أن تقدمها لشخص يعيش مع مرض السكري؟",
        options: [
            "تناول الحلويات بكثرة للتسلية",
            "تجنب ممارسة الرياضة",
            "التزام بنظام غذائي صحي",
            "الابتعاد عن فحص السكر بانتظام"
        ],
        correct: "التزام بنظام غذائي صحي",
    },
    {
        id: "5",
        question: "ما هو التأثير المباشر لنقص إنتاج الإنسولين على الجسم؟",
        options: [
            "تكوين حصى في المرارة",
            "تراكم الدهون في الكبد",
            "ارتفاع مستويات السكر في الدم",
            "ضعف إفراز اللعاب"
        ],
        correct: "ارتفاع مستويات السكر في الدم",
    },
    {
        id: "6",
        question: "ما العامل الذي يؤدي إلى تطور مضاعفات مرض السكري على المدى الطويل؟",
        options: [
            "تنظيم فعال لمستويات السكر في الدم",
            "استخدام المضادات الحيوية بشكل دوري",
            " ممارسة الرياضة",
            "عدم الالتزام بالعلاج الطبي"
        ],
        correct: "عدم الالتزام بالعلاج الطبي",
    },
    {
        id: "7",
        question: "ما هو التأثير الرئيسي لارتفاع مستويات السكر في الدم على الجهاز العصبي؟",
        options: [
            "تحسين وظائف الذاكرة",
            "تدني وظائف الجهاز العصبي",
            "تسريع سرعة الإشارات العصبية",
            "تقليل الإحساس بالألم"
        ],
        correct: "تدني وظائف الجهاز العصبي",
    },
    {
        id: "8",
        question: "ما هو الجانب الرئيسي لعلاج مرض السكري النوع 2؟",
        options: [
            "تحفيز إنتاج الإنسولين",
            "تحسين حركة الأمعاء",
            "تقليل مقاومة الأنسولين",
            "تعزيز عمل الغدة الدرقية"
        ],
        correct: "تقليل مقاومة الأنسولين",
    },
    {
        id: "9",
        question: "ما هو تأثير ارتفاع مستويات السكر في الدم على العينين؟",
        options: [
            "تحسين حالة الشبكية",
            "تسريع عملية الرؤية",
            "عدم وضوح الرؤية",
            "تقليل الإجهاد البصري"
        ],
        correct: "عدم وضوح الرؤية",
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
