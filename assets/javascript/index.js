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

const renderCurrentWeather = (currentDay) => {
    const currentWeatherContainer = `<section class="container current-weather-container">
        <h2>${currentDay.current.name} | ${currentDay.current.date} | <img src="https://openweathermap.org/img/w/${currentDay.current.iconCode}.png"/></h2>
        <p>Temp: ${currentDay.current.temperature}</p>
        <p>Wind: ${currentDay.current.wind} MPH</p>
        <p>Humidity: ${currentDay.current.humidity}%</p>
        <p>UV Index: ${currentDay.current.uvi}</p>
    </section>`

    mainContentWrapper.append(currentWeatherContainer)


}

renderCurrentWeather(mockData);