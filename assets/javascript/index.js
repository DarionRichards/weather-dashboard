const currentWeatherContainer = $('#current-weather-container');

const API_KEY = `7d9d6a42892e49768b347537bd606146`

const getCurrentDate = () => {
    let date = moment().format('MMMM Do YYYY');
    return date
};

const getWeatherData = async(cityName) => {
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
    console.log(forecastData)

    return {
        current: {
            name: name,
            temperature: forecastData.current.temp,
            wind: forecastData.current.wind_speed,
            humidity: forecastData.current.humidity,
            uvi: forecastData.current.uvi,
            date: getCurrentDate(),
            iconCode: forecastData.current.weather[0].icon,
        },
        forecast: [{
                date: "(3/30/2021)",
                temperature: 123.45,
                wind: 111.22,
                humidity: 33,
                iconCode: "04n",
            },
            {
                date: "(3/31/2021)",
                temperature: 123.45,
                wind: 111.22,
                humidity: 33,
                iconCode: "04n",
            },
            {
                date: "(3/32/2021)",
                temperature: 123.45,
                wind: 111.22,
                humidity: 33,
                iconCode: "04n",
            },
            {
                date: "(3/33/2021)",
                temperature: 123.45,
                wind: 111.22,
                humidity: 33,
                iconCode: "04n",
            },
            {
                date: "(3/34/2021)",
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
    const weatherData = await getWeatherData("London")
    getCurrentDate();
    renderWeatherCards(weatherData);
};

$(document).ready(onLoad)