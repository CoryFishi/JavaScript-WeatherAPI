const apiKey = "ada2ef96978611168645317c2453121b";
const apiURL =  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=berlin";

async function checkWeather() {
    const response = await fetch(apiURL + `&appid=${apiKey}`);
    var data = await response.json();

    console.log(data);

    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = data.main.temp;
    document.querySelector(".humidity").innerHTML = data.main.humidity;
    document.querySelector(".wind").innerHTML = data.wind.speed;
}