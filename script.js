var apiKey = "0d85314b31a755a43bdccedd2ac4d9c4";
var geoUrl = "http://api.openweathermap.org/geo/1.0/direct?q=";
var url = "https://api.openweathermap.org/data/2.5/onecall?";
var searchForm = $("#search-form");
var cityInput = $("#cityName");
var searchBtn = $("#search");
var exclude = "&exclude=minutely,hourly,alerts&units=imperial";
var defaultCity = "Phoenix";
var day = 1;


var current = function(city) {
  // USES GEOCODING API TO TURN CITY --> LONG/LAT
  fetch(geoUrl + city + "&appid=" + apiKey).then(function (response) {
    response.json().then(function (data) {
      // TAKES LONG/LAT FROM DATA AND ENTERS INTO ONECALL API
    fetch(`${url}lat=${data[0].lat}&lon=${data[0].lon}${exclude}&appid=${apiKey}`).then(function(weather) {
      return weather.json();
    }).then(function (data1) {
      console.log(data1);
      // USE MOMENT.JS TO SHOW DATE
      var currentDate = new Date(data1.current.dt * 1000)
      // SHOW SEARCHED CITY NAME 
      $("#city-search").text(city + " " + moment(currentDate).format("dddd, MMMM Do YYYY"));
      // ADD ICON
      var iconCode = data1.current.weather[0].icon
      $(".wicon").attr("src", `http://openweathermap.org/img/w/${iconCode}.png`)
      // SHOW CURRENT TEMP
      $("#temp-now").text("Temperature: " + data1.current.temp + " \u00B0F");
      // SHOW CURRENT WIND SPEED
      $("#wind-now").text("Wind Speed: " + data1.current.wind_speed + " MPH");
      // SHOW CURRENT HUMIDITY
      $("#humidity-now").text("Humidity: " + data1.current.humidity + " %");
      // SHOW CURRENT UV INDEX
      $("#uv-now").text(data1.current.uvi);
        // ADD STYLING DEPENDING ON UV LEVEL
      var className="";
      if(data1.current.uvi < 3) {
        className = "uv-green"
      } else if (data1.current.uvi > 3 && data1.current.uvi < 6) {
        className = "uv-yellow";
      } else {
        className = "uv-red"
      };
      $("#uv-now").removeClass("uv-green uv-yellow uv-red");
      $("#uv-now").addClass(className);

      // CALL 5 DAY FORECAST
      forecast(data1);
    });
  });
});
};

var forecast = function(weatherData) {
    // LOOP THROUGH MOST RECENT 5 DAYS AND DISPLAY DATA
    $("#five-day-card").empty();
    for (var i = 1; i < 6; i++) {
      // USE MOMENT.JS TO SHOW DAY
      var date = new Date(weatherData.daily[i].dt * 1000)
      // MAKES 5 FORECAST CARDS 
      var forecastCard = $("<div class='card col-md-2 col-sm-12 mb-2 bg-primary'></div>")
      forecastCard.html(`<div class="card-body forecast">
      <h6 class="card-title" id="d1">${moment(date).format("dddd")}</h6>
      <img class="wicon" alt="weather icon" src="http://openweathermap.org/img/w/${weatherData.daily[i].weather[0].icon}.png"
      <p class="card-subtitle pb-2">Temp: ${weatherData.daily[i].temp.day} \u00B0F</p>
      <p class="card-subtitle pb-2">Wind Speed: ${weatherData.daily[i].wind_speed} MPH</p>
      <p class="card-subtitle pb-2">Humidity: ${weatherData.daily[i].humidity} %</p>
      </div>`)
      $("#five-day-card").append(forecastCard);
      day++
    }
  
}

var saveToLS = function(city) {
  var cityStorage = localStorage.getItem("cityStorage");
  if (cityStorage) {
    var cityArray = JSON.parse(cityStorage);
    console.log(cityArray);
    if (!cityArray.includes(city)) {
      cityArray.push(city);
      localStorage.setItem("cityStorage", JSON.stringify(cityArray));
    }
  } else {
    localStorage.setItem("cityStorage", JSON.stringify([city]));
  }
}

var loadFromLS = function() {
  var cityArray = localStorage.getItem("cityStorage") ? JSON.parse(localStorage.getItem("cityStorage")) : []
  console.log(cityArray);
  $("#searchHistory").empty();
  var cityLength = cityArray.length
  for (var i = cityLength-1; i >= 0; i--) { 
    if (i>cityLength-11) {
      var searchItem = $(`<p>${cityArray[i]}</p>`)
      searchItem.on("click", function() {
        console.log($(this).text())
        current($(this).text())
        // GET ACCESS TO CITY NAME THAT WAS CLICKED, INVOKE CURRENT/FORECAST W/ CITY NAME
      })
      $("#searchHistory").append(searchItem);
    }
  }
}


var search = function(search) {
  search.preventDefault();
  var cityName = document.getElementById("cityName").value;
  console.log(cityName)

  
  if (cityName) {
    current(cityName);
    cityInput.value = "";
    saveToLS(cityName);
    loadFromLS();
  } else {
    alert("Please enter a valid City");
  }
};

current(defaultCity);
loadFromLS();

searchBtn.on("click", search);