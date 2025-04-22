var input = document.getElementById('cityInput');
var cardsContainer = document.getElementById('weatherCards');
var buttonFind = document.getElementById('button-find');
var city;

input.addEventListener('input', function () {
    city = input.value.trim();
    if (city) {
        getWeatherData(city);
    }
});
buttonFind.addEventListener('click', function () {
    city = input.value.trim();
    if (city) {
        getWeatherData(city);
    }
});

async function getWeatherData(city) {
    try {
        var result = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=67ed43dd78aa4212958213248252104&q=${city}&days=3`);
        const data = await result.json()
       // console.log(data);
        displayWeather(data);
    } catch (error) {
        console.log(error);

    }

}



function displayWeather(data) {
    cardsContainer.innerHTML = '';
 
    var days = data.forecast.forecastday;
    for (let i = 0; i < days.length; i++) {
    
        var date = new Date(days[i].date);
        var dayName = date.toLocaleDateString('en-US', { weekday: 'long' });
        var card = `
            <div class="card w-100 h-100 rounded-4 ">

               <h3 class="card-header text-primary-emphasis p-3 fw-bold">${dayName} </h3>
           
                <div class="card-body p-4">
              <img class="weather-icon"  src="https:${days[i].day.condition.icon}" alt="icon" />
              <p class="text-primary">${days[i].day.condition.text}</p>
          <div class=d-flex align-items-center justify-content-around >
          <i class="fa-solid fa-temperature-three-quarters fs-5 text-danger"></i>    <p class="text-danger px-1"> ${days[i].day.avgtemp_c}°C</p>
          </div>

           </div>
          <div class="card-footer p-3">
                    <p class="card-text"><small class="text-primary-emphasis">${data.location.localtime}</small></p>
          </div>
            </div>



            
          `;
        cardsContainer.innerHTML += card;
        
    }
}


window.addEventListener('load', function () {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        var lat = position.coords.latitude;
        var lon = position.coords.longitude;
        getWeatherData(`${lat},${lon}`);
      }, function () {
       
        getWeatherData('Cairo');
      });
    } else {
      getWeatherData('Cairo');
    }
  });
