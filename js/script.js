var currentWeather;
var userLocation;
var humidity;
var cityName;
var stateCode;
var url;
var lat;
var lon;
var dailyUrl
var hour;

$(".submit").click(function() {
  cityName = $(".city").val();
  stateCode = $(".state").val();
  url = `https://api.openweathermap.org/data/2.5/weather?q=`+cityName+`,`+stateCode+`&units=imperial&appid=3bb00f30e525b91a1deb9cbd20254379`;
  
  fetch(url)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
    
            if (data.main) {
              currentWeather = data.main.temp;
              userLocation = data.name;
              humidity = data.main.humidity;
              lat = data.coord.lat;
              lon = data.coord.lon;

              $(".tempDisplay").html("Temp: " + currentWeather);
              $(".locationDisplay").html("Location: " + userLocation);
              $(".humidityDisplay").html("Humidity: " + humidity);
              $(".error").html("");
              dailyUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=`+ lat +`&lon=`+ lon +`&exclude=current,minutely,alerts&units=imperial&appid=3bb00f30e525b91a1deb9cbd20254379`;
              console.log(dailyUrl);
              
              return fetch(dailyUrl)
            }
            else {$(".error").html(data.message);}
      
        })
        .then(function(response) {
            return response.json();
        })
        .then(function(dailyData) {
            for (let day of dailyData.daily) {
              //new Date().toISOString().split('T')[0];
              var date = new Date(day.dt*1000).toISOString().split('T')[0];
              var dailyTemp = day.temp.day;
              $(".weekly").append(`<tr><td>`+date.slice(5)+": "+dailyTemp+`</tr></td>`);
            }
            
            console.log(dailyData);
        });
  
  
  
  
});

$(".weeklyToggle").click(function() {
  $(".weeklyToggle").text("Weekly Forecast (show)");
  $(".weekly").toggle();
});

$(".hourlyToggle").click(function() {
  $(".hourlyToggle").text("Hourly Forecast (show)");
  $(".hourly").toggle();
});