const messageForm = document.querySelector("#Weather_form")

function getInfo(event) {

    event.preventDefault();

    const Weathersection = document.querySelector("#list_for_temp")

    const CityHeader = document.querySelector("#nearest_city")

    const ul_for_temps = Weathersection.querySelector("ul")

    ul_for_temps.innerHTML = '';
    CityHeader.innerText = '';

    let latitude = event.target.lattitude.value
    let longtitude = event.target.longtitude.value

    fetch(`https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longtitude}&apiKey=a1cd90b524be46759041571fdeea33cf`)
    .then(function(response) {
        return response.json()
    }) .then(function(response) {
        CityHeader.innerText = response.features[0].properties.formatted;
    }) .catch(function(error) {
        CityHeader.innerText = "Could not find city"; 
    })

    fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longtitude}&current_weather=true&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m,precipitation,weather_code`) //https://api.open-meteo.com/v1/forecast?latitude=45.0&longitude=-93.0&current_weather=true&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m,precipitation,weather_code

    .then(function(response) {
        return response.json()
    }) .then(function(response) {

        let Temp_List = []

        for (let i = 0; i < response.hourly.time.length; i++) {
            Temp_List.push(`Time: ${response.hourly.time[i]} \u00A0 \u00A0 Temperature (Celcius): ${response.hourly.temperature_2m[i]}`)
        }

        for (let i = 0; i < Temp_List.length;i++) {
            let Temp = document.createElement("li")
            Temp.innerHTML = Temp_List[i]
            ul_for_temps.appendChild(Temp)
        }

    }) .catch(function(error) {
        console.log(error)
        let Temp = document.createElement("li")
        Temp.innerText = "An error occurred";
        ul_for_temps.appendChild(Temp)
    })

    messageForm.reset()

}

messageForm.addEventListener("submit", getInfo);