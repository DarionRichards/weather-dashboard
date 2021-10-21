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
            date: "(3/30/2021)",
            temperature: 123.45,
            wind: 111.22,
            humidity: 33,
            iconCode: "04n",
        },
        {
            date: "(3/30/2021)",
            temperature: 123.45,
            wind: 111.22,
            humidity: 33,
            iconCode: "04n",
        },
        {
            date: "(3/30/2021)",
            temperature: 123.45,
            wind: 111.22,
            humidity: 33,
            iconCode: "04n",
        },
        {
            date: "(3/30/2021)",
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
        <h2>${currentWeather.name} | ${currentWeather.date} | ${currentWeather.iconCode}</h2>
        <p>Temp: ${currentWeather.temperature}&deg;</p>
        <p>Wind: ${currentWeather.wind}MPH</p>
        <p>Humidity: ${currentWeather.humidity}%</p>
        <p>UV Index: ${currentWeather.uvi}</p>
    </section>`
    mainContentWrapper.append(currentWeatherContainer)
};

const renderWeatherCards = weatherData => {
    renderCurrentWeather(weatherData.current)
};

renderWeatherCards(mockData);