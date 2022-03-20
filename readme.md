# 5-day Weather Dashboard

## Description

Create a Weather Dashboard

Display weather for entered City.

Displays current Date, Temperature, Wind Speed, Humidity, UV Index, and weather icon.

UV Index Icon changes color depending on the current UVI.

Below it displays 5 Days weather forecast with day, date, icon, temperature, wind speed, and humidity.

When a city is searched, it is saved to the local storage, as well as on the Search History list.

When clicking a city from the Search History list, it will display the current data for that City.

## Site Process

1. Created index.html with basic layout for dashboard
2. Added bootstrap layout and updated style.css for preference
3. Used openweathermap geocoding API to obtain Lon + Lat for OneCallAPI
4. Entered Lon+Lat to OneCallAPI to get weather data.
5. Took weather data for current day and made it replace what was in the previous id
6. Linked the submit button to start functions
7. Used Template literals to create full HTML in the JS for the future forecast cards
8. Used a for loop to cycle through the days and start on array-1 rather than array-0, and to not go beyond 5 days array-6
9. Created a save to Local Storage. 
10. Created a pull from local Storage

## GitHub URL: 

- https://github.com/wwstrothe/weather-dashboard

## Deployed Application

- https://wwstrothe.github.io/weather-dashboard/

## Screenshot

![weather_dashboard](/assets/images/weatherdashboard.png)

## Review

You are required to submit the following for review:

* The URL of the deployed application.

* The URL of the GitHub repository. Give the repository a unique name and include a README describing the project.