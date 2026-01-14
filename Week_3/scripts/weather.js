const myTown = document.querySelector('#town');
const myDescription = document.querySelector('#description');
const myTemperature = document.querySelector('#temperature');
const myGraphic = document.querySelector('#graphic');

const myKey = "dfb7e2819bdcd91b921317bd812cd8a5";
const myLat = "49.75";
const myLong = "6.63";
const myUnits = "imperial";

const myURL = `https://api.openweathermap.org/data/2.5/weather?lat=${myLat}&lon=${myLong}&units=${myUnits}&appid=${myKey}`;

async function apiFetch() {
  try {
    const response = await fetch(myURL);
    if (response.ok) {
      const data = await response.json();
    //   console.log(data); // testing only
      displayResults(data); // uncomment when ready
    } else {
        throw Error(await response.text());
    }
  } catch (error) {
      console.log(error);
  }
}

function displayResults(data) {
    // console.log('hello');
    myTown.innerHTML = data.name;
    myDescription.innerHTML = data.weather[0].description;
    myTemperature.innerHTML = `${data.main.temp}&deg;F`;
    const iconsrc = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    myGraphic.setAttribute('SRC', iconsrc);
    myGraphic.setAttribute('alt', data.weather[0].description);
}

apiFetch();

// const currentTemp = document.querySelector('#current-temp');
// const weatherIcon = document.querySelector('#weather-icon');
// const captionDesc = document.querySelector('figcaption');
// // const iconCode = data.weather[0].icon;
// // const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

// const url = "https://api.openweathermap.org/data/2.5/weather?lat=49.75&lon=6.64&units=imperial&appid=api_here";

// async function apiFetch() {
//     try {
//         const response = await fetch(url);

//         if (response.ok) {
//             const data = await response.json();
//             console.log(data);

//             console.log("Temperature:", data.main.temp);
//             console.log("Description:", data.weather[0].description);
//             console.log("Icon code:", data.weather[0].icon);

//             displayResults(data);

//         } else {
//             throw new Error(await response.text());
//         }

//     } catch (error) {
//         console.error(error);
//     }
// }

// function displayResults(data) {
//     currentTemp.innerHTML = `${data.main.temp}&deg;F`;
//     const iconsrc = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
//     let desc = data.weather[0].description;
//     weatherIcon.setAttribute('src', iconsrc);
//     weatherIcon.setAttribute('alt', desc);
//     captionDesc.textContent = `${desc}`;
// }

// apiFetch();