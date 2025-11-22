import { apiKey } from './config.js';


    document.getElementById("getWeather").addEventListener("click", fetchWeather);

    document.getElementById("city").addEventListener("keypress", function(e) {
        if(e.key === "Enter") {
            fetchWeather();
        }
    });

    function fetchWeather() {
        const city = document.getElementById("city").value.trim();
        const loader = document.getElementById("loader");
        const resultDiv = document.getElementById("weatherResult");

        if(city === "") {
            alert("Please enter a city name!");
            return;
        }

        resultDiv.innerHTML = "";
        loader.style.display = "block";

        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

        fetch(url)
            .then(response => {
                loader.style.display = "none";
                if(!response.ok) {
                    throw new Error("City not found");
                }
                return response.json();
            })
            .then(data => {
                resultDiv.innerHTML = `
                    <h2>${data.name}, ${data.sys.country}</h2>
                    <p><strong>Temperature:</strong> ${data.main.temp} °C</p>
                    <p><strong>Weather:</strong> ${data.weather[0].description}</p>
                    <p><strong>Humidity:</strong> ${data.main.humidity}%</p>
                    <p><strong>Wind Speed:</strong> ${data.wind.speed} m/s</p>
                `;
            })
            .catch(error => {
                loader.style.display = "none";
                alert(error.message);
            });
    }
