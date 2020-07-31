capitalCity = document.getElementById("capitalDisplay");
options = document.getElementsByClassName("options");


generateNewCity = document.getElementById("restart");

var chosenCountries = [];

let size = 4;
let correctCity;

reset(size);

function reset(size){
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
    {
   for (let i = 0; i < indexes.length; i++) {
    chosenCountries.push(data[indexes[i]]); 
   }
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
            let clickedCountry = this.textContent;
            if(clickedCountry === correctCountry){
                alert("You are right!");
            } else{
                alert("Oops!");
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
