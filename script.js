

//With Arrow Function
    fetch('http://api.worldbank.org/v2/country/ru?format=json')
    .then((res) => res.text())
    .then((data) => console.log(data));