const weatherContainer = $("#weather-container");

const API_KEY = `7d9d6a42892e49768b347537bd606146`;

const getFormattedDate = (unixTimeStamp, formatDate = "MMMM Do YYYY") => {
    return moment.unix(unixTimeStamp).format(formatDate);
};

const getCurrentData = (name, currentData) => {
    return {
        name: name,
        temperature: currentData.current.temp,
        wind: currentData.current.wind_speed,
        humidity: currentData.current.humidity,
        uvi: currentData.current.uvi,
        date: getFormattedDate(currentData.current.dt),
        iconCode: currentData.current.weather[0].icon,
    };
};

const getForecastData = (forecastData) => {
    const callback = (each) => {
        return {
            date: getFormattedDate(each.dt),
            temperature: each.temp.day,
            wind: each.wind_speed,
            humidity: each.humidity,
            iconCode: each.weather[0].icon,
        };
    };
    return forecastData.daily.slice(1, 6).map(callback);
};

const getWeatherData = async(cityName) => {
    const currentDataUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}`;
    const currentDataResponse = await fetch(currentDataUrl);
    const currentData = await currentDataResponse.json();

    const lat = currentData.coord.lat;
    const lon = currentData.coord.lon;
    const name = currentData.name;

    const forecastDataUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=imperial`;

    const forecastDataResponse = await fetch(forecastDataUrl);
    const forecastData = await forecastDataResponse.json();

    const current = getCurrentData(name, forecastData);
    const forecast = getForecastData(forecastData);

    return {
        current: current,
        forecast: forecast,
    };
};

const getFromLS = () => {
    const cities = JSON.parse(localStorage.getItem("recentCities")) ?
        JSON.parse(localStorage.getItem("recentCities")) :
        [];

    return cities;
};

const setCitiesInLS = (cityName) => {
    const cities = getFromLS();

    if (!cities.includes(cityName)) {
        cities.push(cityName);
        localStorage.setItem("recentCities", JSON.stringify(cities));
    }
};

const renderCurrentWeatherContainer = () => {
    const currentWeatherContainer = `<section class="container current-weather-container" id="current-weather-container"></section>`;
    weatherContainer.append(currentWeatherContainer);
};

const renderCurrentWeather = (currentWeather) => {
    renderCurrentWeatherContainer();

    const currentWeatherContainer = $("#current-weather-container");

    const currentWeatherCard = `<h2>${currentWeather.name} | ${currentWeather.date} | <img src="https://openweathermap.org/img/w/${currentWeather.iconCode}.png"/></h2>
        <p>Temp: ${currentWeather.temperature} &degF;</p>
        <p>Wind: ${currentWeather.wind}MPH</p>
        <p>Humidity: ${currentWeather.humidity}%</p>
        <p>UV Index: ${currentWeather.uvi}</p>`;

    currentWeatherContainer.append(currentWeatherCard);
};

const renderForecastCardsContainer = () => {
    const constructForecastContainer = `<section class="daily-forecast-container" id="daily-forecast-container"></section>`;
    weatherContainer.append(constructForecastContainer);

    const forecastContainer = $("#daily-forecast-container");

    const forecastHeader = `<h3>5-day Forecast:</h3>`;
    forecastContainer.append(forecastHeader);

    const constructCardsContainer = `<section class="weather-cards" id="cards-container"></section>`;
    forecastContainer.append(constructCardsContainer);
};

const renderForecastCards = (forecastData) => {
    renderForecastCardsContainer();

    const constructCard = (forecastDay) => {
        return `<div class="cards">
            <h4>${forecastDay.date}</h4>
            <i><img src="https://openweathermap.org/img/w/${forecastDay.iconCode}.png"/></i>
            <p>Temp: ${forecastDay.temperature} &degF</p>
            <p>Wind: ${forecastDay.wind} MPH</p>
            <p>Humidity: ${forecastDay.humidity}</p>
        </div>`;
    };

    const cardsContainer = $("#cards-container");

    const forecastCard = forecastData.map(constructCard);
    cardsContainer.append(forecastCard);
};

const renderWeatherCards = (weatherData) => {
    renderCurrentWeather(weatherData.current);
    renderForecastCards(weatherData.forecast);
};

const renderRecentCities = () => {
    const cities = getFromLS();

    const cityContainer = $("#city-container");

    cityContainer.empty();

    const constructCityButton = (city) => {
        const button = `<button class="btn">${city}</button>`;

        cityContainer.append(button);
    };

    cities.forEach(constructCityButton);
};

const renderWeatherInfo = async(cityName) => {
    const weatherData = await getWeatherData(cityName);

    weatherContainer.empty();

    renderWeatherCards(weatherData);
};

const handleSearch = async(event) => {
    event.preventDefault();

    const cityName = $("#search-input").val();

    if (cityName) {
        renderWeatherInfo(cityName);

        setCitiesInLS(cityName);

        renderRecentCities();
    }
};

const handleReady = () => {
    renderRecentCities();

    const cities = getFromLS();

    if (cities.length) {
        const cityName = cities.pop();
        renderWeatherInfo(cityName);
    }
};

$("#form-container").on("submit", handleSearch);

$(document).ready(handleReady);