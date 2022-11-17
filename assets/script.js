const date = document.querySelector("#date");
const time = document.querySelector("#time");
const dayOfWeek = document.querySelector("#today");

const input = document.querySelector("#userInput");

const cityName = document.querySelector("#cityName");
const temperature = document.querySelector("#temperature");
const humidity = document.querySelector("#humidity");
const windSpeed = document.querySelector("#windspeed");
const feelsLike = document.querySelector("#feelslike");
const tempHigh = document.querySelector("#tempHigh");
const tempLow = document.querySelector("#tempLow");

date.innerText = moment().format("MMMM Do YYYY");
time.innerText = moment().format("h:mm A");
dayOfWeek.innerText = moment().format("dddd");

input.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    getApi();
    input.value = "";
  }
});

function getApi() {
  let cityName = document.querySelector("#userInput").value;

  let requestURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=b169b31281ffa2a2b70b9e8ac22c3e88&units=imperial`;
  //   let sunConvert = [];
  fetch(requestURL)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      console.log(data);
      displayWeather(data);
    });
}

let displayWeather = function (weatherData) {
  cityName.innerText = weatherData.name;
  temperature.innerText = Math.floor(weatherData.main.temp) + "\u00B0";
  humidity.innerText = weatherData.main.humidity + "%";
  windSpeed.innerText = weatherData.wind.speed + " MPH";
  feelsLike.innerText = weatherData.main.feels_like + "\u00B0 F";
  tempHigh.innerText = weatherData.main.temp_max + "\u00B0 F";
  tempLow.innerText = weatherData.main.temp_min + "\u00B0 F";

  let fiveDayURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${weatherData.coord.lat}&lon=${weatherData.coord.lon}&appid=b169b31281ffa2a2b70b9e8ac22c3e88&units=imperial`;
  fetch(fiveDayURL)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      console.log(data);
      fiveDayWeather(data);
    });
};

let fiveDayWeather = function (weatherValue) {
  let todaysMonth = dayjs().$M;
  [...Array(5).keys()] // generate array with indexes[ 0, 1, 2, 3, 4]
    .map((k) => `date${k + 1}`) // map each element to the format "date1" "date2" etc
    .forEach((id, index) => { // iterate the array with both the generated ids in the format you want and the index
      // get the elements
      const date = document.getElementById(id);
      const dateTemp = document.getElementById(id + "Temp");
      // set the day
      const day = dayjs().$D + index + 1;
      // edit html content
      date.innerText = `${todaysMonth}/${day}`;
      dateTemp.innerText = weatherValue.list[index + 1].main.temp + "\u00B0 F";
    });
};