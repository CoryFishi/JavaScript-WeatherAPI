const apiKey = "ada2ef96978611168645317c2453121b";
const apiURL =  "https://api.openweathermap.org/data/2.5/weather?units=imperial&q=";

const searchBox = document.querySelector('.search input');
const searchBtn = document.querySelector('.search button');
const weatherIcon = document.querySelector('.weather-icon');

async function checkWeather(city) {
    const response = await fetch(apiURL + city + `&appid=${apiKey}`);
    if (response.status == 200) {
        console.log("Successful: " + response.status);
    } else {
        console.log("Error: " + response.status);
    }

    if(response.status == 404){
        document.querySelector(".error").style.display ="block";
    } else if (response.status == 400){
        document.querySelector(".error").style.display ="block";
    } else {
        var data = await response.json();
        
        console.log(data);

        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°F";
        document.querySelector(".humidity").innerHTML = Math.round(data.main.humidity) + "%";
        document.querySelector(".wind").innerHTML = Math.round(data.wind.speed,1) + " mi/h";
        document.querySelector(".feels-like").innerHTML = "Feels like " + Math.round(data.main.feels_like) + "°F";

        if(data.weather[0].main == "Clouds"){
            weatherIcon.src = "src/clouds.png";
        } else if (data.weather[0].main == "Clear"){
            weatherIcon.src = "src/clear.png";
        } else if (data.weather[0].main == "Rain"){
            weatherIcon.src = "src/rain.png";
        } else if (data.weather[0].main == "Drizzle"){
            weatherIcon.src = "src/drizzle.png";
        } else if (data.weather[0].main == "Mist"){
            weatherIcon.src = "src/mist.png";
        }

        document.querySelector(".error").style.display ="none";
        document.querySelector(".weather").style.display ="block";
    }
}

searchBtn.addEventListener("click", ()=> {
    checkWeather(searchBox.value);
});
document.addEventListener("keydown", (event)=> {
    if (event.key === 'Enter') {
        checkWeather(searchBox.value);
    }
});