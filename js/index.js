const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };
  
  function success(pos) {
    const crd = pos.coords;

    var coordinate = `${crd.latitude}`+ "," + `${crd.longitude}`;
    diasplayUserDate(coordinate);
  }
  
  function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }
  
navigator.geolocation.getCurrentPosition(success, error, options);


async function diasplayUserDate(coordinate) {
    try {
        var response = await fetch(`http://api.weatherapi.com/v1/search.json?key=c3ec39087b6b4288b58141457241706&q=${coordinate}`);
        var data = await response.json(response);
        getTodayWeather(data[0].name);
        getForcastWeather(data[0].name);
    }catch {
        
    }
}

// get search data from the API
async function getUserLocation(kayword) {
    try {
        var response = await fetch(`http://api.weatherapi.com/v1/search.json?key=c3ec39087b6b4288b58141457241706&q=${kayword}`);
        var data = await response.json(response);
        getTodayWeather(data[0].name);
        getForcastWeather(data[0].name);
    }catch {
        
    }
}

  
// get search data from the API
async function search(kayword) {
    try {
        var response = await fetch(`http://api.weatherapi.com/v1/search.json?key=c3ec39087b6b4288b58141457241706&q=${kayword}`);
        var data = await response.json(response);
        getTodayWeather(data[0].name);
        getForcastWeather(data[0].name);
    }catch {
        
    }
}

// get today data from the API
async function getTodayWeather(location) {
    var response = await fetch(`https://api.weatherapi.com/v1/current.json?key=c3ec39087b6b4288b58141457241706&q=${location}`);
    var data = await response.json(response);
    display(data);
}

function display(data) {
    document.getElementById("day").innerHTML = `${getDayAsText(data.location.localtime)}`;
    document.getElementById("date").innerHTML = `${formatDate(data.location.localtime)}`;
    document.getElementById("location").innerHTML = `${data.location.name}`;
    document.getElementById("degree").innerHTML = `${data.current.temp_c}<sup>o</sup>C`;
    document.getElementById("weather").innerHTML = `${data.current.condition.text}`;
    
    // if we are in the morining then the sun icaon will appear, else the night icon will
    if (data.current.is_day) {
        document.getElementById("today-icon").setAttribute("src", `images/113.png`);
    }else {
        document.getElementById("today-icon").setAttribute("src", `images/113 (1).png`);
    }

    document.getElementById("today-cloud-coverage").innerHTML = `<img src="images/icon-umberella.png" alt="">${data.current.cloud}%`;
    document.getElementById("today-wind-speed").innerHTML = `<img src="images/icon-wind.png" alt="">${data.current.wind_kph}Km/h`;
    document.getElementById("today-wind-direction").innerHTML = `<img src="images/icon-compass.png" alt="">${data.current.wind_dir}`;
}


// get forecast data from the API
async function getForcastWeather(location) {
    var response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=c3ec39087b6b4288b58141457241706&days=3&q=${location}`);
    var data = await response.json(response);
    console.log(data);
    forcastDisplay(data);
}

function forcastDisplay(data) {
    // change the forecast day for tommorrow forecast
    document.getElementsByClassName("forecast-day")[0].innerHTML = `${getDayAsText(data.forecast.forecastday[1].date)}`;
    // change the forecast day for tommorrow forecast
    document.getElementsByClassName("forecast-day")[1].innerHTML = `${getDayAsText(data.forecast.forecastday[2].date)}`;

    /* // if we are in the morining then the sun icaon will appear, else the night icon will
    if (data.forecast.forecastday[1].day.condition.text == "Sunny") {
        document.getElementsByClassName("forecast-icon")[0].setAttribute("src", `images/113.png`);
    }else {
        document.getElementsByClassName("forecast-icon")[0].setAttribute("src", `images/113 (1).png`);
    } 

    // if we are in the morining then the sun icaon will appear, else the night icon will
    if (data.forecast.forecastday[1].day.condition.text == "Sunny") {
        document.getElementsByClassName("forecast-icon")[1].setAttribute("src", `images/113.png`);
    }else {
        document.getElementsByClassName("forecast-icon")[1].setAttribute("src", `images/113 (1).png`);
    }*/

    // change the forecast max temp for tommorrow forecast
    document.getElementsByClassName("forecast-degree")[0].innerHTML = `${data.forecast.forecastday[1].day.maxtemp_c}<sup>o</sup>C`;
    // change the forecast max temp for day after tommorrow forecast
    document.getElementsByClassName("forecast-degree")[1].innerHTML = `${data.forecast.forecastday[2].day.maxtemp_c}<sup>o</sup>C`;

    // change the forecast min temp for tommorrow forecast
    document.getElementsByClassName("small-forecast-degree")[0].innerHTML = `${data.forecast.forecastday[1].day.mintemp_c}<sup>o</sup>C`;
    // change the forecast min temp for day after tommorrow forecast
    document.getElementsByClassName("small-forecast-degree")[1].innerHTML = `${data.forecast.forecastday[2].day.mintemp_c}<sup>o</sup>C`;

    // change the forecast weather condition for tommorrow forecast
    document.getElementsByClassName("forecast-weather")[0].innerHTML = `${data.forecast.forecastday[1].day.condition.text}`;
    // change the forecast weather condition for day after tommorrow forecast
    document.getElementsByClassName("forecast-weather")[1].innerHTML = `${data.forecast.forecastday[2].day.condition.text}`;
}



/* Global functions */
// function to take date as this format (2024-06-17 19:00) and retun the day as a text
function getDayAsText(date) {
    const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

    const d = new Date(date);
    var day = days[d.getDay()];
    return day;
}
// function to take date as this format (2024-06-17 19:00) and retun the day as this format (17June)
function formatDate(dateString) {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const date = new Date(dateString);
    const day = date.getDate();
    const month = months[date.getMonth()];
    return `${day} ${month}`;
  }
  

  