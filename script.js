
        async function getWeather() {
            const apiKey = '97078c3d25dc86fb8db15992a99b786d';
            const city = document.getElementById('city').value;

            if (!city) {
                alert('Please enter a city');
                return;
            }

            const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

            try {
                const response = await fetch(apiUrl);
                const data = await response.json();
                displayWeather(data);
            } catch (error) {
                console.error('Error fetching weather data:', error);
                alert('Error fetching weather data. Please try again.');
            }
        }

        function displayWeather(data) {
            const weatherInfoElement = document.getElementById('weather-info');

            if (data.cod !== '404') {
                const cityName = data.name;
                const temperature = Math.round(data.main.temp - 273.15); // Convert Kelvin to Celsius
                const description = data.weather[0].description;
                const icon = data.weather[0].icon;

                const weatherHtml = `
                    <h2>${cityName}</h2>
                    <p>Temperature: ${temperature}°C</p>
                    <p>Description: ${description}</p>
                    <div class="icon"><img src="http://openweathermap.org/img/wn/${icon}.png" alt="${description} icon"></div>
                `;

                weatherInfoElement.innerHTML = weatherHtml;
                weatherInfoElement.classList.add('show');
            } else {
                weatherInfoElement.innerHTML = '<p>City not found. Please enter a valid city.</p>';
                weatherInfoElement.classList.remove('show');
            }
        }