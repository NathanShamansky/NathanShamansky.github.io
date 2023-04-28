const apiKey = '143f09360ac15bfa6ac7201bdcdc7c19';
const countrySelect = document.getElementById('countrySelect');
const citySelect = document.getElementById('citySelect');
const getWeatherBtn = document.getElementById('getWeatherBtn');
const weatherDescription = document.getElementById('weatherDescription');
const temperature = document.getElementById('temperature');
const weatherIcon = document.getElementById('weatherIcon');
const countryInput = document.getElementById('countryInput');

let temps = "";
let sky = "";
let loc = "";
let CanErace = true;

// Fetch country data from countriesnow.space API
fetch('https://countriesnow.space/api/v0.1/countries')
    .then(response => response.json())
    .then(data => {
        // Populate country dropdown with options
        const countries = data.data;
        countries.forEach(country => {
            const option = document.createElement('option');
            option.value = country.country;
            option.text = country.country;
            countrySelect.add(option);
        });
    })
    .catch(error => {
        console.error(error);
    });

// Fetch city data based on selected country
function fetchCities() {
    const country = countrySelect.value;

    // Fetch city data for selected country from countriesnow.space API
    fetch(`https://countriesnow.space/api/v0.1/countries/`)
        .then(response => response.json())
        .then(data => {
            // Populate city dropdown with options
            const cities = data.data[countrySelect.selectedIndex - 1].cities;
            cities.forEach(city => {
                const option = document.createElement('option');
                option.value = city;
                option.text = city;
                citySelect.add(option);
            });
        })
        .catch(error => {
            console.error(error);
        });
}

function handleInput() {
    var input = document.getElementById('countryInput').value;
    suggestCountries(input)
        .then(suggestions => {
            var suggestionList = document.getElementById('suggestionList');
            suggestionList.innerHTML = '';
            for (var i = 0; i < suggestions.length; i++) {
                var suggestion = document.createElement('li');
                suggestion.className = "selectItem";
                suggestion.innerHTML = suggestions[i];
                suggestion.onclick = (function(index) {
                    return function() {
                        ChooseCity(suggestions[index]);
                    };
                })(i);


                suggestionList.appendChild(suggestion);
            }
        })
        .catch(error => {
            console.error(error);
        });
}

function ChooseCity(input) {
    document.getElementById('countryInput').value = input;
    document.getElementById('suggestionList').innerHTML = '';
}

function suggestCountries(input) {
    return fetch(`https://countriesnow.space/api/v0.1/countries/`)
        .then(response => response.json())
        .then(data => {
            // Populate city dropdown with options
            const cities = data.data[countrySelect.selectedIndex - 1].cities;
            var suggestions = [];
            for (var i = 0; i < cities.length; i++) {
                if (cities[i].toLowerCase().startsWith(input.toLowerCase())) {
                    suggestions.push(cities[i]);
                }
            }
            return suggestions;
        })
        .catch(error => {
            console.error(error);
        });
}

getWeatherBtn.addEventListener('click', fetchWeather);

function fetchWeather() {
    ShowHideLocation();
    const country = countrySelect.value;
    const state = countryInput.value;
    const location = state ? `${state}, ${country}` : country;

    if(document.getElementsByName("CanShowImagesCheckbox").checked)
    {
      fetch(`https://api.unsplash.com/photos/random?query=${cities} ${countries.country}&orientation=landscape&client_id=W95mciHHW1KaHED7uoefrqfT7e5YACSUU9hjIewW0s8`)
            .then(response => {
                // Check if the response is valid
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then(data => {
                // Extract the image URL
                const imageUrl = data.urls.regular;
            
                // Update the background image of the element with class name "Background"
                const cardElements = document.getElementsByClassName("Background");
                if (cardElements.length > 0) {
                    cardElements[0].src = imageUrl;
                }
            })
            .catch(error => console.error(error));
    }
    
    document.getElementsByClassName("LocationText")[0].textContent = state + ", " + country;

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.weather && data.weather.length > 0) {
                const weather = data.weather[0];
                const temp = data.main.temp;
                const icon = weather.icon;

                temps = temperature.textContent;
                sky = weatherDescription.textContent;
                loc = location;

                weatherDescription.textContent = weather.description;
                temperature.textContent = `Temperature: ${Math.round((temp * 9/5) + 32)}°F`;
                weatherIcon.src = `https://openweathermap.org/img/wn/${icon}.png`;
                CanErace = true;
            } else {
                weatherDescription.textContent = 'No weather data found';
                temperature.textContent = '';
                weatherIcon.src = '';
            }
        })
        .catch(error => {
            weatherDescription.textContent = 'Error fetching weather data';
            temperature.textContent = '';
            weatherIcon.src = '';
            console.error(error);
        });
}

function GetRandomWeather() {
    fetch(`https://countriesnow.space/api/v0.1/countries/`)
        .then(response => response.json())
        .then(data => {
            const tempnum = Math.floor(Math.random() * data.data.length);
            const countries = data.data[tempnum];
            const cities = data.data[tempnum].cities[Math.floor(Math.random() * data.data[tempnum].cities.length)];
            document.getElementsByClassName("LocationText")[0].textContent = cities + ", " + countries.country;
            const location = cities ? `${cities}, ${countries.country}` : countries.country;
            fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`)
                .then(response => response.json())
                .then(data => {
                    if (data.weather && data.weather.length > 0) {
                        const weather = data.weather[0];
                        const temp = data.main.temp;
                        const icon = weather.icon;

                        temps = temperature.textContent;
                        sky = weatherDescription.textContent;
                        loc = location;

                        weatherDescription.textContent = weather.description;
                        temperature.textContent = `Temperature: ${Math.round((temp * 9/5) + 32)}°F`;
                        weatherIcon.src = `https://openweathermap.org/img/wn/${icon}.png`;
                        CanErace = true;
                    } else {
                        GetRandomWeather();
                    }
                })
                .catch(error => {
                    GetRandomWeather();
                });
        })
        .catch(error => {
            GetRandomWeather();
        });

}


function ShowHideLocation() {

    if (document.getElementsByClassName("locationParentHiden").length !== 0) {
        var locationParents = document.getElementsByClassName("locationParent");
        for (var i = 0; i < locationParents.length; i++) {
            locationParents[i].className = "locationParent";
        }
    } else {
        var locationParents = document.getElementsByClassName("locationParent");
        for (var i = 0; i < locationParents.length; i++) {
            locationParents[i].className = "locationParent locationParentHiden";
        }
    }
}

function ShowHideOpenAi() {

    if (document.getElementsByClassName("OpenAiTextBoxHiden").length !== 0) {
        var OpenAiTextBox = document.getElementsByClassName("OpenAiTextBox");
        for (var i = 0; i < OpenAiTextBox.length; i++) {
            OpenAiTextBox[i].className = "OpenAiTextBox";
            if (CanErace) {
                var elements = document.getElementsByClassName("OpenAiOL");
                if (elements.length > 0) {
                    elements[0].innerHTML = '<img class="LoadingImage" src="Images/SpinnerLoading.png" alt="">';
                }
                CallRequest(loc, sky, temps);
                CanErace = false;
            }
        }
    } else {
        var OpenAiTextBox = document.getElementsByClassName("OpenAiTextBox");
        for (var i = 0; i < OpenAiTextBox.length; i++) {
            OpenAiTextBox[i].className = "OpenAiTextBox OpenAiTextBoxHiden";
        }
    }
}

function ForwadTOCallRequest() {
    CallRequest(loc, sky, temps);
}