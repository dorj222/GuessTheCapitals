capitalCity = document.getElementById("capitalDisplay");
options = document.getElementsByClassName("options");
selected = document.getElementsByClassName("selected");
message = document.getElementById("message");
restart = document.getElementById("restart");
buttonModes = document.getElementsByClassName("mode");
answerStreak = document.getElementById("answer-streak");
flags = document.getElementsByClassName("flag-image");


let chosenCountries = [];
//Default number of countries to display
let size = 4;  
let correctCity;
let correctAnswerStreak = 0;
const flagLink = "https://www.countryflags.io/";



//initiliazte the game
init(size);

setUpDisplay();

function init(size){
    indexes = generateRandom(size);
    callApi().then((result)=>{
        for (let i = 0; i < indexes.length; i++) {
            chosenCountries.push(result[indexes[i]]); 
             }
             //console.log(chosenCountries);
             updateDOM(chosenCountries);
    }) 
}

//setting up the display when the game is first opened
function setUpDisplay(){
    for (var i = 4; i < options.length; i++) {
        options[i].style.display = "none";
    }
}

//Randomly pick the correct country
function digitRandom(size){
    return parseInt(Math.floor(Math.random() * size),  10);
}


//call the API and get the data
async function callApi(){
    //With Arrow Function
   const res = await fetch('https://restcountries.eu/rest/v2/all');
   const result =  await res.json();
   return result;
}

function updateDOM(chosenCountries){
    pickCountry = digitRandom(size);
    correctCapital = chosenCountries[pickCountry].capital;
    correctCountry = chosenCountries[pickCountry].name;
    if(correctCapital === "" || correctCountry ===""){reset(size);}
    capitalCity.textContent = correctCapital;
    updateGameProgress(chosenCountries);
}

//this function sets the game respone and update the game progress
function updateGameProgress(chosenCountries) {

    for (let i = 0; i < chosenCountries.length; i++) {
        selected[i].textContent = chosenCountries[i].name;
        flags[i].setAttribute('src', flagLink + chosenCountries[i].alpha2Code+ "/flat/64.png");
        getUserAnswer(i, chosenCountries); 
    }
}

// this function receives a player's response
function getUserAnswer(i, chosenCountries) {
    options[i].addEventListener("click", function () {
        this.classList.add("clicked");
        let clickedCountry = selected[i].textContent;
        displayCorrectAnswer();
        displayWrongAnswers(chosenCountries);
        displayResult(clickedCountry, chosenCountries);
    });
}

function displayResult(clickedCountry, chosenCountries) {
    if (clickedCountry === correctCountry) {
        displayVictory(chosenCountries);
    }
    else {
        displayDefeat(chosenCountries);
    }
}

//show which answer is correct
function displayCorrectAnswer() {
    options[pickCountry].classList.add("correct");
}

//show which answers are wrong 
function displayWrongAnswers(chosenCountries) {
    for (let i = 0; i < chosenCountries.length; i++) {
        if (i !== pickCountry) { options[i].classList.add("incorrect"); }
    }
}

function displayDefeat(chosenCountries) {
    message.textContent = "Incorrect! 😔";
    restart.textContent = "Play again?";
}

function displayVictory(chosenCountries) {
    message.textContent = "Correct! 🤗";
    restart.textContent = "Next";
}

//Randomly choose next four countries
function generateRandom(size){
    let tempArray = [];
    while(tempArray.length < size){
        var i = Math.floor(Math.random() * 250);
        if(tempArray.includes(i) === false){
            tempArray.push(i);
        } 
    }
    return tempArray;
}

//Restart Button
restart.addEventListener("click", function(){
    reset(size);
});

//Reset everything
function reset(size) {
    correctCity = "";
    chosenCountries = [];
    message.textContent = "";
    restart.textContent = "Restart";
    resetClassList();
    answerStreak.textContent = "";
    init(size);
}

function resetClassList() {
    for (let i = 0; i < size; i++) {
        options[i].classList.remove("incorrect");
        options[i].classList.remove("correct");
        options[i].classList.remove("clicked");
    }
}

//whenever a player changes difficulty, this function listens that and changes

for (let i = 0; i < buttonModes.length; i++) {
 
    buttonModes[i].addEventListener("click", function(){

       correctAnswerStreak = 0;
       removeClicked();

        if(this.textContent==="Easy"){
            this.classList.add("clicked");
            size = 2;
            displayMode(size, 0);
        }
        else if(this.textContent==="Medium"){
            size = 4;
            this.classList.add("clicked");
            displayMode(size, 0);
        }
        else if(this.textContent==="Hard"){
            size = 6;
            this.classList.add("clicked");
            displayMode(size, 0);
        }
        reset(size);
    })
}


function removeClicked() {
    for (let i = 0; i < buttonModes.length; i++) {
        buttonModes[i].classList.remove("clicked");
    }
}

//this function decides number of answers to show according to difficulty level
function displayMode(size, size2) {
    for (var i = size; i < options.length; i++) {
        options[i].style.display = "none";
    }

    for (var i = size2; i < size; i++) {
        options[i].style.display = "block";
    }
    return i;
}

