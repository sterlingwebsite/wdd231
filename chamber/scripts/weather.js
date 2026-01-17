const myKey = "dfb7e2819bdcd91b921317bd812cd8a5";
const myLat = "40.49";
const myLong = "-111.94";
const myUnits = "imperial";

const url = `https://api.openweathermap.org/data/2.5/weather?lat=${myLat}&lon=${myLong}&units=${myUnits}&appid=${myKey}`;

async function getWeather() {
    try {
        const response = await fetch(url);
        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        console.error("Weather fetch error:", error);
    }
}

function displayWeather(data) {
    document.querySelector("#temp").textContent = Math.round(data.main.temp);
    document.querySelector("#description").textContent = data.weather[0].description;

    const iconSrc = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
    document.querySelector("#weather-icon").setAttribute("src", iconSrc);

    document.querySelector("#humidity").textContent = data.main. humidity;

    document.querySelector("#high").textContent = Math.round(data.main.temp_max);
    document.querySelector("#low").textContent = Math.round(data.main.temp_min);

    const sunrise = new Date(data.sys.sunrise * 1000);
    const sunset = new Date(data.sys.sunset * 1000);

    document.querySelector("#sunrise").textContent = sunrise.toLocaleTimeString([], {
        hour: "numeric",
        minute: "2-digit"
    });

    document.querySelector("#sunset").textContent = sunset.toLocaleTimeString([], {
        hour: "numeric",
        minute: "2-digit"
    });
}

getWeather();