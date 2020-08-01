capitalCity = document.getElementById("capitalDisplay");
options = document.getElementsByClassName("options");
message = document.getElementById("message");
restart = document.getElementById("restart");
answerStreak = document.getElementById("answer-streak");

let chosenCountries = [];
let size = 4;
let correctCity;
let data = [];
let correctAnswerStreak = 0;

//initiliazte the game
init(size);

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
    capitalCity.textContent = correctCapital;
    displayEvertything(chosenCountries);
}

function displayEvertything(chosenCountries) {

    for (let i = 0; i < chosenCountries.length; i++) {
        options[i].textContent = chosenCountries[i].name;
        options[i].addEventListener("click", function () {
            this.classList.add("clicked");
            let clickedCountry = this.textContent;
            displayCorrectAnswer();
            displayWrongAnswers(chosenCountries);
            displayResult(clickedCountry, chosenCountries);
        }); 
    }
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
    correctAnswerStreak = 0;
    answerStreak.textContent = "";
    restart.textContent = "Play again?";
}

function displayVictory(chosenCountries) {
    correctAnswerStreak = correctAnswerStreak + 1;
    // answerStreak.textContent = "Correct answer streak " + correctAnswerStreak +"🔥";
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
    correctCity="";
    chosenCountries = [];
    let indexes = [];
    size = 4;
    message.textContent = "";
    resetClassList();
    correctAnswerStreak = 0;
    answerStreak.textContent = "";
    init(size);
})


function resetClassList() {
    for (let i = 0; i < size; i++) {
        options[i].classList.remove("incorrect");
        options[i].classList.remove("correct");
        options[i].classList.remove("clicked");
    }
}
