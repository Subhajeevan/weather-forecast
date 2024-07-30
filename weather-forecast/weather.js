const apiKey = 'd3aa7838efabcd5ff9151a4e2fc25487';
async function getWeatherData(city) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
        if (!response.ok) {
            throw new Error('Weather data not available');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}
function displayWeather(data) {
    const location = data.name;
    const temperature = Math.round(data.main.temp);
    const description = data.weather[0].description;
    const wind=data.wind.speed;
    document.getElementById('location').textContent = location;
    document.getElementById('temperature').textContent = `${temperature}°C`;
    document.getElementById('description').textContent = description;
    document.getElementById('wind').textContent = "windspeed:"+wind;
}
function searchWeather() {
    const city = document.getElementById('searchInput').value;
    if (city.trim() === '') {
        alert('Please enter a city name');
        return;
    }
    getWeatherData(city)
        .then(data => {
            displayWeather(data);
            console.log(data);
        })
        .catch(error => {
            console.error('Error displaying weather data:', error);
            alert('Could not fetch weather data for that city. Please try again.');
        });
}
