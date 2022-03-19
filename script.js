var apiKey = "0d85314b31a755a43bdccedd2ac4d9c4";
var geoUrl = "http://api.openweathermap.org/geo/1.0/direct?q=";
var url = "https://api.openweathermap.org/data/2.5/onecall?";
var userFormEl = document.querySelector("#user-form");
var cityInputEl = document.querySelector("#cityName");
var exclude = "&exclude=minutely,hourly,alerts&units=imperial"

var forecast = function(city) {
  fetch(geoUrl + city + "&appid=" + apiKey).then(function (response) {
    response.json().then(function (data) {
    fetch(url + "lat=" + data[0].lat + "&lon=" + data[0].lon + exclude + "&appid=" + apiKey).then(function(weather) {
      return weather.json();
    }).then(function (data1) {
      console.log(data1);
    })
  });
});
}

var formSubmitHandler = function(event) {
  event.preventDefault();

  var cityName = cityInputEl.value.trim();

  if (cityName) {
    forecast(cityName);
    cityInputEl.value = "";
  } else {
    window.alert("Please enter a valid City");
  }
};

forecast("Phoenix");

userFormEl.addEventListener("submit", formSubmitHandler);