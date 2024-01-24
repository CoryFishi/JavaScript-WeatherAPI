// API Consts
const apiKey = "ada2ef96978611168645317c2453121b";
const apiURL =  "https://api.openweathermap.org/data/2.5/weather?units=imperial&q=";
// Doc Consts
const searchBox = document.querySelector('.search input');
const searchBtn = document.querySelector('.search button');
const weatherIcon = document.querySelector('.weather-icon');

// API Call
async function checkWeather(city) {
    const response = await fetch(apiURL + city + `&appid=${apiKey}`);
    // Check if there was an error with the API call
    if (response.status == 200) {
        var data = await response.json();
        
        console.log("Successful: " + response.status);

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
    } else {
        document.querySelector(".error").style.display ="block";
        console.log("Error: " + response.status);
    }
}
// Listeners for document
searchBtn.addEventListener("click", ()=> {
    checkWeather(searchBox.value);
});
document.addEventListener("keydown", (event)=> {
    if (event.key === 'Enter') {
        checkWeather(searchBox.value);
    }
});