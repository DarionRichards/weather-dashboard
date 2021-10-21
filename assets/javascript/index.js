const mainContentWrapper = $('#main-content-wrapper')

const mockData = {
    current: {
        name: "London",
        temperature: 123.45,
        wind: 111.22,
        humidity: 33,
        uvi: 2.5,
        date: "(3/30/2021)",
        iconCode: "04n",
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
};

const renderCurrentWeather = currentWeather => {
    const currentWeatherContainer = `
    <section class="container current-weather-container">
        <h2>${currentWeather.name} | ${currentWeather.date} | <img src="https://openweathermap.org/img/w/${currentWeather.iconCode}.png" /></h2>
        <p>Temp: ${currentWeather.temperature} &degF;</p>
        <p>Wind: ${currentWeather.wind}MPH</p>
        <p>Humidity: ${currentWeather.humidity}%</p>
        <p>UV Index: ${currentWeather.uvi}</p>
    </section>`;

    mainContentWrapper.append(currentWeatherContainer);
};

const renderForecastCardsContainer = () => {
    const constructForecastContainer = `<section class="daily-forecast-container" id="daily-forecast-container"></section>`;
    mainContentWrapper.append(constructForecastContainer);

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

renderWeatherCards(mockData);