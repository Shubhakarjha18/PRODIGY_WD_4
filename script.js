// script.js

const apiKey = 'YOUR_API_KEY'; // Replace with your OpenWeatherMap API key
const weatherInfo = document.getElementById('weatherInfo');
const fetchWeatherBtn = document.getElementById('fetchWeatherBtn');
const locationInput = document.getElementById('locationInput');

// Function to get weather data by city name
function getWeatherByCity(city) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`)
        .then(response => response.json())
        .then(data => displayWeather(data))
        .catch(error => {
            weatherInfo.innerHTML = `<p>Error fetching data. Please try again.</p>`;
            console.error('Error fetching weather data:', error);
        });
}

// Function to display weather data
function displayWeather(data) {
    if (data.cod !== 200) {
        weatherInfo.innerHTML = `<p>Location not found. Please try another city.</p>`;
        return;
    }

    const { name, main, weather } = data;
    const temperature = main.temp;
    const description = weather[0].description;
    const humidity = main.humidity;
    const windSpeed = data.wind.speed;

    weatherInfo.innerHTML = `
        <h2>Weather in ${name}</h2>
        <p>Temperature: ${temperature}°C</p>
        <p>Description: ${description}</p>
        <p>Humidity: ${humidity}%</p>
        <p>Wind Speed: ${windSpeed} m/s</p>
    `;
}

// Function to get user's current location and fetch weather
function getWeatherByLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const { latitude, longitude } = position.coords;
            fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`)
                .then(response => response.json())
                .then(data => displayWeather(data))
                .catch(error => {
                    weatherInfo.innerHTML = `<p>Error fetching data. Please try again.</p>`;
                    console.error('Error fetching weather data:', error);
                });
        }, () => {
            weatherInfo.innerHTML = `<p>Unable to get your location. Please enter a location manually.</p>`;
        });
    } else {
        weatherInfo.innerHTML = `<p>Geolocation is not supported by this browser.</p>`;
    }
}

// Event listeners
fetchWeatherBtn.addEventListener('click', () => {
    const city = locationInput.value.trim();
    if (city) {
        getWeatherByCity(city);
    } else {
        getWeatherByLocation();
    }
});

// Get weather by user's location on page load
getWeatherByLocation();
