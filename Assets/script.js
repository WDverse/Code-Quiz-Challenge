var mainEl = document.getElementById("main");
var startQuizEl = document.querySelector("#start-quiz");
var timerEl = document.querySelector("#timer");
var timer = 75;
var finalScore = 0;
var finalScoreEl = document.getElementById("final-score");
var buttonEl = document.getElementById("buttons");
var questionEl = document.querySelector("#question");
var instrucionsEl = document.querySelector("#instructions");
var headingEl = document.querySelector("#heading");
var quizEl = document.querySelector("#quiz-screen");
var resultsEl = document.querySelector("#results");
var highScoreEl = document.getElementById("highscore");
var timerInterval;



//Adds a click event listener to the "Start Quiz" button
startQuizEl.addEventListener("click", startQuiz)


// Sets an object with properties containing questions, choices, and the answers
var questions = [
    {
        title: 'Commonly used data types DO NOT include:',
        choices: ['A. alerts', 'B. strings', 'C. booleans', 'D. numbers'],
        answer: 'A. alerts',
    },

    {
        title: 'The condition in an if / else statement is enclosed within ____.',
        choices: ['A. quotes', 'B. curly brackets', 'C. parentheses', 'D. square brackets'],
        answer: 'C. parentheses',
    },

    {
        title: 'Which of the following is not a primitive data set?',
        choices: ['A. boolean', 'B. object', 'C. number', 'D. string'],
        answer: 'B. object',
    },

    {
        title: 'Which of the following is used when invoking a function?',
        choices: ['A. quotes', 'B. curly brackets', 'C. square brackets', 'D. parentheses'],
        answer: 'D. parentheses',
    },

    {
        title: 'Complex data types include:',
        choices: ['A. arrays', 'B. strings', 'C. booleans', 'D. numbers'],
        answer: 'A. arrays',
    },
];

//Declares a variable which will select the objects in the "questions" array starting with the first object
var index = 0

//Prints answer results and deducts 10 seconds when answer is wrong
function checkQuestion(event) {
    console.log(event.target);
    var currentQuestion = questions[index]

    //Handles scenario when answer is correct
    if (event.target.textContent === currentQuestion.answer) {
        resultsEl.textContent = "Correct!";
        finalScore += 5;
    }
    //Handles scenario when answer is wrong
    if (event.target.textContent !== currentQuestion.answer) {
        resultsEl.textContent = "Wrong!";
        timer = timer - 10;
        timerEl.textContent = "Time Left: " + timer;
    }
    index++;
    if (index === questions.length) {
        endQuiz();
    }
    nextQuestion();
    resultsTimer();
}
// Displays new quetion when a button is clicked
function nextQuestion() {
    if (questions[index]) {

        questionEl.textContent = questions[index].title;
        var previousButtons = document.querySelectorAll(".option")
        if (previousButtons) {
            for (var i = 0; i < previousButtons.length; i++) {
                previousButtons[i].style = "display: none";
            }
        }
        buttonEl.innerHTML = '';

        // Displays new buttons with possible answers when a button is clicked
        for (var i = 0; i < questions[index].choices.length; i++) {
            var newButtonEl = document.createElement('button');
            var choice = questions[index].choices[i];
            newButtonEl.textContent = choice;
            newButtonEl.classList.add("option");
            buttonEl.appendChild(newButtonEl);
            newButtonEl.addEventListener("click", checkQuestion);
        }
    }

}


//Removes "Start Quiz" button and instuctions when "Start Quiz" is clicked
function startQuiz() {
    timerEl.textContent = "Time Left: " + timer;
    nextQuestion();
    headingEl.textContent = " ";
    startQuizEl.setAttribute("style", "display: none");
    instrucionsEl.setAttribute("style", "display: none");
    highScoreEl.setAttribute("style", "display: none");
    //Starts timer 
    timerInterval = setInterval(function () {
        timer--;
        timerEl.textContent = "Time Left: " + timer;

        //Handles scenario when timer runs out
        if (timer <= 0) {
            endQuiz();
        }
    }, 1000);

}


// Displays results for one second when a choice is clicked
function resultsTimer() {
    var resultsTimerInterval = setInterval(function () {
        var displayResultsTimer = 1;
        displayResultsTimer--;
        if (displayResultsTimer <= 0) {
            clearInterval(resultsTimerInterval);
            resultsEl.textContent = " ";
        }
    }, 1000);
}

function endQuiz() {
    //Ends timer
    clearInterval(timerInterval);

    //Handles scenario when quiz ends
    timerEl.textContent = " ";
    quizEl.setAttribute("style", "display: none");
    headingEl.textContent = "All done!";
    finalScoreEl.textContent = "Your final score is: " + finalScore;
    var saveInitialsDiv = document.createElement("div");
    saveInitialsDiv.classList.add("card");
    var formEl = document.createElement("form");
    formEl.classList.add("form");
    var initialsListEl = document.createElement("ul");
    var listEl = document.createElement("li");
    listEl.classList.add("initials-list");
    var inputLabel = document.createElement("label");
    inputEl = document.createElement("input");
    inputEl.classList.add("initials");
    submitButtonEl = document.createElement("button");
    submitButtonEl.classList.add("submit");
    submitButtonEl.textContent = "Submit";
    listEl.appendChild(inputLabel);
    listEl.appendChild(inputEl);
    initialsListEl.appendChild(listEl);
    inputLabel.textContent = "Enter your initials";
    formEl.appendChild(initialsListEl);
    formEl.appendChild(submitButtonEl);
    saveInitialsDiv.appendChild(formEl);
    mainEl.appendChild(saveInitialsDiv);
    highScoreEl.setAttribute("style", "display: block");


    var submitForm = document.querySelector(".form");
    var submitButton = document.querySelector(".submit");
    var initialsInput = document.querySelector(".initials");
    submitButton.addEventListener("click", function (event) {
        event.preventDefault();

        var userInitials = {
            initials: initialsInput.value.trim(),
        }

        localStorage.setItem("userInitials", JSON.stringify(userInitials));

        function renderHighscores() {
            var lastScore = JSON.parse(localStorage.getItem("userInitials"));
            // console.log(lastScore);
            if (lastScore.initials !== "") {
                finalScoreEl.setAttribute("style", "display: none");
                headingEl.setAttribute("style", "display: none");
                submitForm.setAttribute("style", "display: none");
                var highScoreHeading = document.createElement("h1");
                var highScoreList = document.createElement("ol");
                var userInitialsList = document.createElement("li");
                highScoreHeading.textContent = "Highscores";
                userInitialsList.textContent = lastScore.initials + " - " + finalScore;
                highScoreList.setAttribute("style", "text-align: left");
                highScoreList.appendChild(userInitialsList);
                saveInitialsDiv.appendChild(highScoreHeading);
                saveInitialsDiv.appendChild(highScoreList);
            }
            // else{
            //     var errorMessageEl = document.createElement("p");
            //     errorMessageEl.classList.add("error");
            //     errorMessageEl.textContent = "Enter your initials";
            //     saveInitialsDiv.appendChild(errorMessageEl);
            // }
        }
        renderHighscores();
    })
}

// highScoreEl.addEventListener("click", renderHighscores);