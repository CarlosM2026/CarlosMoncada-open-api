fetch('https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41')

.then(function(response) {
    return response.json()
}) .then(function(response) {
    console.log(response)
}) .catch(function(error) {
    console.log(error)
})