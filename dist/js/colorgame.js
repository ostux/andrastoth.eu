var colors = ['aqua', 'darkblue','red', 'yellow', 'green', 'purple', 'saddlebrown'];
var buttonColorOk = 0;
var colorOk = 'white';
var colorWrong = 'white';
var colorQuestion = 'white';
var inGame = false;
var timeLeft = 0;
var score = 0;
var oldColorWrong = 'white';
var fullTime = 60;
var timePercentage = fullTime/100;
var time = 0;
var startTime = 0;
var nIntervId;

function setButtonsBgandQuestionColor(){
    if (buttonColorOk < 1) {
        document.getElementById('gameButtonLeft').style.background=colorOk;
        document.getElementById('gameButtonRight').style.background=colorWrong;
    } else {
        document.getElementById('gameButtonLeft').style.background=colorWrong;
        document.getElementById('gameButtonRight').style.background=colorOk;
    }
    document.getElementById('gameColor').style.color = colorQuestion;
}

function setQuestion() {
    if (colorOk === 'saddlebrown') {
        document.getElementById('gameColor').innerHTML = 'brown';
    } else if (colorOk === 'darkblue') {
        document.getElementById('gameColor').innerHTML = 'blue';
    } else if (!inGame) {
        document.getElementById('gameColor').innerHTML = '';
    } else
        document.getElementById('gameColor').innerHTML = colorOk;
}

function getRandomButton() {
    buttonColorOk = Math.floor((Math.random() * 2));
    setButtonsBgandQuestionColor();
    setQuestion();
}

function getRandomColor() {
    var i = Math.floor(Math.random()*colors.length);
    colorOk = colors[i];
    do {
        oldColorWrong = colorWrong;
            do {
                i = Math.floor(Math.random()*colors.length);
                colorWrong = colors[i];
            }  while (colorOk == colorWrong);
    }  while (oldColorWrong == colorWrong);
    i = Math.floor(Math.random()*colors.length);
    colorQuestion = colors[i];
}

function checkButton(side){
    if (side === buttonColorOk) {
        score++;
        return true;
    } else {
        score = score-5;
        if (score < 0) {
            score = 0;
        }
        return false;
    }
}

function writeScore(){
    document.getElementById('scoreLabel').innerHTML = score;
}

function toogleStartStopButton(state) {
    // state = true : game started need to show stop button
    if (state) {
        document.getElementById('startbutton').style.display = 'none';
        document.getElementById('stopbutton').style.display = 'block';
    } else {
        document.getElementById('startbutton').style.display = 'block';
        document.getElementById('stopbutton').style.display = 'none';
    }
}
function setStart() {
    buttonColorOk = 0;
    colorOk = 'white';
    colorWrong = 'white';
    colorQuestion = 'white';
    timeLeft = 0;
    score = 0;
    oldColorWrong = 'white';
    writeScore();
    toogleStartStopButton(true);
}

function setEnd() {
    colorOk = 'white';
    colorWrong = 'white';
    colorQuestion = 'white';
    timeLeft = 0;
    setButtonsBgandQuestionColor();
    setQuestion();
    toogleStartStopButton(false);
}

function mDown(side) {
    if (inGame) {
        if (!checkButton(side)) {
            document.getElementById('gameframe').style.backgroundColor = 'rgba(255,192,203,.75)';
            setTimeout(function(){document.getElementById('gameframe').style.backgroundColor = 'rgba(239, 251, 255,.5)';},1000);
        }
        writeScore();
    }
}

function mUp() {
    if (inGame) {
        getRandomColor();
        getRandomButton();
    }
}

function decreaseTimeLeft() {
    timeLeft = (startTime+fullTime) - Math.floor(Date.now()/1000);

    timeLeft = timeLeft / timePercentage;
    timeLeft = timeLeft * 0.9;
    document.getElementById('timebar').style.width = timeLeft+'%';
    if (!timeLeft) {
        cancelAnimationFrame(nIntervId);
        inGame = false;
        setEnd();
    }
    if (!inGame) {
        cancelAnimationFrame(nIntervId);
        document.getElementById('timebar').style.width = 0+'%';
    }
}

function repeatOften() {

    nIntervId = requestAnimationFrame(repeatOften);
    decreaseTimeLeft();
}

function startGame() {
    inGame = true;
    setStart();
    mUp();
    timeLeft = fullTime;
    startTime = Math.floor(Date.now()/1000);
    nIntervId = requestAnimationFrame(repeatOften);
}

function stopGame() {
    inGame = false;
    timeLeft = 0;
    setEnd();

}

