capitalCity = document.getElementById("capitalDisplay");
options = document.getElementsByClassName("options");
generateNewCity = document.getElementById("restart");
message = document.getElementById("message");
restart = document.getElementById("restart");

let chosenCountries = [];
let size = 4;
let correctCity;

reset(size);

function reset(size){
    correctCity="";
    chosenCountries = [];
    let indexes = [];
    indexes = generateRandom(size);
    callApi(indexes);
}

//Randomly pick the correct country
function digitRandom(size){
    return parseInt(Math.floor(Math.random() * size),  10);
}


//call the API and get the data
async function callApi(indexes){
    //With Arrow Function
   const res = await fetch('https://restcountries.eu/rest/v2/all');
   const data =  await res.json();
    
   for (let i = 0; i < indexes.length; i++) {
    chosenCountries.push(data[indexes[i]]); 
   
  }
  updateDOM(chosenCountries);
}

function updateDOM(chosenCountries){

    pickCountry = digitRandom(size);
    correctCapital = chosenCountries[pickCountry].capital;
    correctCountry = chosenCountries[pickCountry].name;

    capitalCity.textContent = correctCapital;
  
    for (let i = 0; i < chosenCountries.length; i++) {  

        options[i].textContent = chosenCountries[i].name
        options[i].addEventListener("click", function(){
            this.classList.add("clicked");
        


            let clickedCountry = this.textContent;
            if(clickedCountry === correctCountry){
                message.textContent = "Correct! 🤗";

                options[pickCountry].classList.add("correct");
                restart.textContent = "Next"
                for (let i = 0; i < chosenCountries.length; i++) {
                    if(i !==pickCountry){options[i].classList.add("incorrect");} 
                }

            } else{
                message.textContent = "Incorrect! 😔";
                restart.textContent = "Play again?"
                options[pickCountry].classList.add("correct");


                for (let i = 0; i < chosenCountries.length; i++) {
                 
                    if(i !==pickCountry){options[i].classList.add("incorrect");} 
                }      
            }
        })
    }
}



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
