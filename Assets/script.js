var startQuizEl = document.querySelector("#start-quiz");
var timerEl = document.querySelector("#timer");
var timer =75;
var finalScore = 0;
var buttonEl = document.getElementById("buttons");
var questionEl = document.querySelector ("#question");
var instrucionsEl = document.querySelector ("#instructions");
var currentQuestion = 0;


startQuizEl.addEventListener("click", startQuiz)


var questions = [

    {
        title: 'Commonly used data types DO NOT include:',
        choices: ['1. strings', '2. booleans', '3. alerts', '4. numbers'],
        answer: '3. alerts',
    },

    {
        title: 'The condition in an if / else statement is enclosed within ____.',
        choices: ['1. quotes', '2. curly brackets', '3. parentheses', '4. square brackets'],
        answer: '5. parentheses',
    },
    
    {
        title: 'Which of the following is not a primitive data set?',
        choices: ['1. boolean', '2. number', '3. object', '4. string'],
        answer: '4. string',
    },

    {
        title: 'Which of the following are used when invoking a function?',
        choices: ['1. quotes', '2. curly brackets', '3. parentheses', '4. square brackets'],
        answer: '5. parentheses',
    },

    {  
        title: 'Complex data types include:',
        choices: ['1. strings', '2. booleans', '3. objects', '4. numbers'],
        answer: '3. objects',
    },
];

var index = -1

    function nextQuestion (){
        index ++
        questionEl.textContent = questions[index].title;
        var previousButtons = document.querySelectorAll(".option")
        if (previousButtons){
            for (var i = 0; i < previousButtons.length; i++){
                previousButtons[i].style = "display: none";
            }
        }
    
        for (var i = 0; i < questions[index].choices.length; i++) {
            var newButtonEl =  document.createElement('button');
            var choice = questions[index].choices[i];
            newButtonEl.textContent = choice;
            newButtonEl.classList.add("option")
            buttonEl.appendChild(newButtonEl)
            newButtonEl.addEventListener("click", nextQuestion)
        }} 

    function startQuiz(){
        timerEl.textContent = "Time Left: " + timer;
        nextQuestion();
        startQuizEl.setAttribute("style", "display: none");
        instrucionsEl.setAttribute("style", "display: none");
        var timerInterval = setInterval(function(){
            timer--;
            if(questions.choices !== questions.answer){
                timer
            }
        }, 1000)

    }
    
        
    

    


