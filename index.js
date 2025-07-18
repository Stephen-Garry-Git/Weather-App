<<<<<<< HEAD
'use strict';

// --- DOM Manipulator References ---
const searchInput = document.querySelector(".input");
const searchButton = document.querySelector(".search-btn");
const geolocationButton = document.querySelector(".geolocation-btn"); // New: Geolocation button
const cityElement = document.querySelector(".city");
const temperatureElement = document.querySelector(".temperature");
const weatherIconElement = document.querySelector(".weather-icon");
const humidityElement = document.querySelector(".humidity");
const windspeedElement = document.querySelector(".windspeed");
const weatherDisplaySection = document.querySelector(".weather");
const errorDisplay = document.querySelector(".error");

// --- API Configuration ---
const API_KEY = "d52dff770081746fc796a311ebaabfdb";
const API_BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

// --- Helper Functions for UI State ---
function displayError(message) {
    errorDisplay.textContent = message;
    errorDisplay.style.display = "block";
    weatherDisplaySection.style.display = "none";
}

function hideError() {
    errorDisplay.style.display = "none";
    errorDisplay.textContent = "";
}

function toggleWeatherDisplay(show) {
    weatherDisplaySection.style.display = show ? "block" : "none";
}

// --- Function to Fetch Weather Data ---
/**
 * Fetches weather data. Can be by city name or by coordinates.
 * @param {object} params - Object containing either 'city' (string) or 'lat' and 'lon' (numbers).
 * @returns {Promise<object|null>} A promise that resolves to weather data, or null.
 */
async function getWeatherData(params) {
    let apiUrl;
    if (params.city) {
        apiUrl = `${API_BASE_URL}?q=${params.city}&appid=${API_KEY}&units=metric`;
    } else if (params.lat && params.lon) {
        apiUrl = `${API_BASE_URL}?lat=${params.lat}&lon=${params.lon}&appid=${API_KEY}&units=metric`;
    } else {
        console.warn("Invalid parameters for getWeatherData.");
        displayError("Please provide a city name or enable geolocation.");
        return null;
    }

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "City not found or API error occurred.");
        }
        const data = await response.json();
        return {
            city: data.name,
            country: data.sys.country,
            temperature: data.main.temp,
            description: data.weather[0].description,
            icon: data.weather[0].icon,
            humidity: data.main.humidity,
            windspeed: data.wind.speed,
        };
    } catch (error) {
        console.error("Error fetching weather data:", error);
        displayError(`Error: ${error.message || "Could not retrieve weather data. Please try again."}`);
        return null;
    }
}

// --- Function to Update UI ---
function updateUI(weatherData) {
    hideError();

    if (!weatherData) {
        toggleWeatherDisplay(false);
        return;
    }

    cityElement.textContent = `${weatherData.city}, ${weatherData.country}`;
    temperatureElement.textContent = `${Math.round(weatherData.temperature)}°C`;
    weatherIconElement.src = `https://openweathermap.org/img/wn/${weatherData.icon}@2x.png`;
    weatherIconElement.alt = weatherData.description;
    humidityElement.textContent = `${weatherData.humidity}%`;
    windspeedElement.textContent = `${(weatherData.windspeed * 3.6).toFixed(1)} km/h`;

    toggleWeatherDisplay(true);
}

// --- Geolocation Success Callback ---
function geolocationSuccess(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    console.log(`Geolocation successful: Lat ${lat}, Lon ${lon}`);
    getWeatherData({ lat, lon }).then(updateUI); // Fetch and update UI
}

// --- Geolocation Error Callback ---
function geolocationError(error) {
    let errorMessage = "Could not retrieve your location.";
    switch (error.code) {
        case error.PERMISSION_DENIED:
            errorMessage = "Location access denied. Please enable location services in your browser settings to use this feature.";
            break;
        case error.POSITION_UNAVAILABLE:
            errorMessage = "Location information is unavailable.";
            break;
        case error.TIMEOUT:
            errorMessage = "The request to get user location timed out.";
            break;
        case error.UNKNOWN_ERROR:
            errorMessage = "An unknown error occurred while getting your location.";
            break;
    }
    console.error("Geolocation error:", errorMessage, error);
    displayError(errorMessage);
}

// --- Main Search Logic Handler ---
async function handleSearch() {
    const city = searchInput.value.trim();
    if (!city) {
        displayError("Please enter a city name.");
        searchInput.focus();
        return;
    }
    const weatherData = await getWeatherData({ city }); // Fetch weather data by city name
    updateUI(weatherData);
    searchInput.value = "";
    searchInput.focus();
}

// --- Event Listeners ---
searchButton.addEventListener("click", handleSearch);

searchInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        handleSearch();
    }
});

// Event listener for geolocation button
geolocationButton.addEventListener("click", () => {
    hideError(); // Clear any existing errors
    toggleWeatherDisplay(false); // Hide weather display while fetching
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(geolocationSuccess, geolocationError);
    } else {
        displayError("Geolocation is not supported by your browser.");
    }
});

// --- Initial Setup on Page Load ---
document.addEventListener("DOMContentLoaded", () => {
    toggleWeatherDisplay(false);
    hideError();
    searchInput.focus();
=======
'use strict';

// --- DOM Manipulator References ---
const searchInput = document.querySelector(".input");
const searchButton = document.querySelector(".search-btn");
const geolocationButton = document.querySelector(".geolocation-btn"); // New: Geolocation button
const cityElement = document.querySelector(".city");
const temperatureElement = document.querySelector(".temperature");
const weatherIconElement = document.querySelector(".weather-icon");
const humidityElement = document.querySelector(".humidity");
const windspeedElement = document.querySelector(".windspeed");
const weatherDisplaySection = document.querySelector(".weather");
const errorDisplay = document.querySelector(".error");

// --- API Configuration ---
const API_KEY = "d52dff770081746fc796a311ebaabfdb";
const API_BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

// --- Helper Functions for UI State ---
function displayError(message) {
    errorDisplay.textContent = message;
    errorDisplay.style.display = "block";
    weatherDisplaySection.style.display = "none";
}

function hideError() {
    errorDisplay.style.display = "none";
    errorDisplay.textContent = "";
}

function toggleWeatherDisplay(show) {
    weatherDisplaySection.style.display = show ? "block" : "none";
}

// --- Function to Fetch Weather Data ---
/**
 * Fetches weather data. Can be by city name or by coordinates.
 * @param {object} params - Object containing either 'city' (string) or 'lat' and 'lon' (numbers).
 * @returns {Promise<object|null>} A promise that resolves to weather data, or null.
 */
async function getWeatherData(params) {
    let apiUrl;
    if (params.city) {
        apiUrl = `${API_BASE_URL}?q=${params.city}&appid=${API_KEY}&units=metric`;
    } else if (params.lat && params.lon) {
        apiUrl = `${API_BASE_URL}?lat=${params.lat}&lon=${params.lon}&appid=${API_KEY}&units=metric`;
    } else {
        console.warn("Invalid parameters for getWeatherData.");
        displayError("Please provide a city name or enable geolocation.");
        return null;
    }

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "City not found or API error occurred.");
        }
        const data = await response.json();
        return {
            city: data.name,
            country: data.sys.country,
            temperature: data.main.temp,
            description: data.weather[0].description,
            icon: data.weather[0].icon,
            humidity: data.main.humidity,
            windspeed: data.wind.speed,
        };
    } catch (error) {
        console.error("Error fetching weather data:", error);
        displayError(`Error: ${error.message || "Could not retrieve weather data. Please try again."}`);
        return null;
    }
}

// --- Function to Update UI ---
function updateUI(weatherData) {
    hideError();

    if (!weatherData) {
        toggleWeatherDisplay(false);
        return;
    }

    cityElement.textContent = `${weatherData.city}, ${weatherData.country}`;
    temperatureElement.textContent = `${Math.round(weatherData.temperature)}°C`;
    weatherIconElement.src = `https://openweathermap.org/img/wn/${weatherData.icon}@2x.png`;
    weatherIconElement.alt = weatherData.description;
    humidityElement.textContent = `${weatherData.humidity}%`;
    windspeedElement.textContent = `${(weatherData.windspeed * 3.6).toFixed(1)} km/h`;

    toggleWeatherDisplay(true);
}

// --- Geolocation Success Callback ---
function geolocationSuccess(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    console.log(`Geolocation successful: Lat ${lat}, Lon ${lon}`);
    getWeatherData({ lat, lon }).then(updateUI); // Fetch and update UI
}

// --- Geolocation Error Callback ---
function geolocationError(error) {
    let errorMessage = "Could not retrieve your location.";
    switch (error.code) {
        case error.PERMISSION_DENIED:
            errorMessage = "Location access denied. Please enable location services in your browser settings to use this feature.";
            break;
        case error.POSITION_UNAVAILABLE:
            errorMessage = "Location information is unavailable.";
            break;
        case error.TIMEOUT:
            errorMessage = "The request to get user location timed out.";
            break;
        case error.UNKNOWN_ERROR:
            errorMessage = "An unknown error occurred while getting your location.";
            break;
    }
    console.error("Geolocation error:", errorMessage, error);
    displayError(errorMessage);
}

// --- Main Search Logic Handler ---
async function handleSearch() {
    const city = searchInput.value.trim();
    if (!city) {
        displayError("Please enter a city name.");
        searchInput.focus();
        return;
    }
    const weatherData = await getWeatherData({ city }); // Fetch weather data by city name
    updateUI(weatherData);
    searchInput.value = "";
    searchInput.focus();
}

// --- Event Listeners ---
searchButton.addEventListener("click", handleSearch);

searchInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        handleSearch();
    }
});

// Event listener for geolocation button
geolocationButton.addEventListener("click", () => {
    hideError(); // Clear any existing errors
    toggleWeatherDisplay(false); // Hide weather display while fetching
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(geolocationSuccess, geolocationError);
    } else {
        displayError("Geolocation is not supported by your browser.");
    }
});

// --- Initial Setup on Page Load ---
document.addEventListener("DOMContentLoaded", () => {
    toggleWeatherDisplay(false);
    hideError();
    searchInput.focus();
>>>>>>> 56f91b7e7acce14f4568ec73bbed2115944fa1c1
});