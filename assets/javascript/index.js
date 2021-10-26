const currentWeatherContainer = $('#current-weather-container');

const API_KEY = `7d9d6a42892e49768b347537bd606146`

const getFormattedDate = (unixTimeStamp, formatDate = 'MMMM Do YYYY') => {
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
    }
};

const getWeatherData = async cityName => {
    const currentDataUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}`;
    const currentDataResponse = await fetch(currentDataUrl);
    const currentData = await currentDataResponse.json();
    console.log(currentData);

    const lat = currentData.coord.lat;
    const lon = currentData.coord.lon;
    const name = currentData.name;

    const forecastDataUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=imperial`;

    const forecastDataResponse = await fetch(forecastDataUrl);
    const forecastData = await forecastDataResponse.json();

    const current = getCurrentData(name, forecastData);

    return {
        current: current,
        forecast: [{
                date: getFormattedDate(forecastData.daily[1].dt),
                temperature: forecastData.daily.temp,
                wind: 111.22,
                humidity: 33,
                iconCode: "04n",
            },
            {
                date: getFormattedDate(forecastData.daily[2].dt),
                temperature: 123.45,
                wind: 111.22,
                humidity: 33,
                iconCode: "04n",
            },
            {
                date: getFormattedDate(forecastData.daily[3].dt),
                temperature: 123.45,
                wind: 111.22,
                humidity: 33,
                iconCode: "04n",
            },
            {
                date: getFormattedDate(forecastData.daily[4].dt),
                temperature: 123.45,
                wind: 111.22,
                humidity: 33,
                iconCode: "04n",
            },
            {
                date: getFormattedDate(forecastData.daily[5].dt),
                temperature: 123.45,
                wind: 111.22,
                humidity: 33,
                iconCode: "04n",
            },
        ],
    }
};

const renderCurrentWeather = currentWeather => {
    const currentWeatherCard = `<h2>${currentWeather.name} | ${currentWeather.date} | <img src="https://openweathermap.org/img/w/${currentWeather.iconCode}.png"/></h2>
        <p>Temp: ${currentWeather.temperature} &degF;</p>
        <p>Wind: ${currentWeather.wind}MPH</p>
        <p>Humidity: ${currentWeather.humidity}%</p>
        <p>UV Index: ${currentWeather.uvi}</p>`;

    currentWeatherContainer.append(currentWeatherCard);
};

const renderForecastCardsContainer = () => {

    const forecastContainer = $('#daily-forecast-container');

    const forecastHeader = `<h3>5-day Forecast:</h3>`;
    forecastContainer.append(forecastHeader);

    const constructCardsContainer = `<section class="weather-cards" id="cards-container"></section>`;
    forecastContainer.append(constructCardsContainer);
};

const renderForecastCards = forecastData => {

    renderForecastCardsContainer();

    const constructCard = forecastDay => {

        return `<div class="cards">
            <h4>${forecastDay.date}</h4>
            <i><img src="https://openweathermap.org/img/w/${forecastDay.iconCode}.png"/></i>
            <p>Temp: ${forecastDay.temperature} &degF</p>
            <p>Wind: ${forecastDay.wind} MPH</p>
            <p>Humidity: ${forecastDay.humidity}</p>
        </div>`
    };

    const cardsContainer = $('#cards-container');

    const forecastCard = forecastData.map(constructCard);
    cardsContainer.append(forecastCard)
};

const renderWeatherCards = weatherData => {
    renderCurrentWeather(weatherData.current)
    renderForecastCards(weatherData.forecast)
};

const onLoad = async() => {
    const weatherData = await getWeatherData("London");
    renderWeatherCards(weatherData);
};

$(document).ready(onLoad)