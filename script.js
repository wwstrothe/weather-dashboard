var apiKey = "0d85314b31a755a43bdccedd2ac4d9c4";
var geoUrl = "http://api.openweathermap.org/geo/1.0/direct?q=";
var url = "https://api.openweathermap.org/data/2.5/onecall?";
var searchForm = document.querySelector("#search-form");
var cityInput = document.querySelector("#cityName");
var searchBtn = $("#search");
var exclude = "&exclude=minutely,hourly,alerts&units=imperial";
var defaultCity = "Phoenix";

var forecast = function(city) {
  fetch(geoUrl + city + "&appid=" + apiKey).then(function (response) {
    response.json().then(function (data) {
    fetch(url + "lat=" + data[0].lat + "&lon=" + data[0].lon + exclude + "&appid=" + apiKey).then(function(weather) {
      return weather.json();
    }).then(function (data1) {
      console.log(data1);
      $("#city-search").text(city);
      $("#temp-now").text("Temperature: " + data1.current.temp + " \u00B0F");
      $("#wind-now").text("Wind Speed: " + data1.current.wind_speed + " MPH");
      $("#humidity-now").text("Humidity: " + data1.current.humidity + " %");
      $("#uv-now").text(data1.current.uvi);

      if(data1.current.uvi < 3) {
        $("#uv-now").addClass("uv-favorable");
      } else if (data1.current.uvi > 3 && data1.current.uvi < 6) {
        $("#uv-now").removeClass("uv-favorable");
        $("#uv-now").addClass("uv-moderate");
      } else {
        $("#uv-now").removeClass("uv-favorable");
        $("#uv-now").removeClass("uv-moderate");
        $("#uv-now").addClass("uv-severe");
      };

      var s = 1;

      for (var i = 0; i < data1.daily.length && i < 5; i++) {
        $("#temp-" + s).text("Temp: " + data1.daily[i].temp.day + " \u00B0F");
        $("#wind-" + s).text("Wind Speed: " + data1.daily[i].wind_speed + " MPH");
        $("#humidity-" + s).text("Humidity: " + data1.daily[i].humidity + " %")
        s++
      }
    });
  });
});
};

var search = function(search) {
  search.preventDefault();
  var cityName = document.getElementById("cityName").value;
  console.log(cityName)

  if (cityName) {
    forecast(cityName);
    cityInput.value = "";
  } else {
    window.alert("Please enter a valid City");
  }
};

forecast(defaultCity);

searchBtn.on("click", search);