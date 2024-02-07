async function fetchWeather() {
  const weatherPromise = await fetch('https://api.weather.gov/gridpoints/MFL/110,50/forecast')
  const weatherData = await weatherPromise.json()
  const ourTemp = weatherData.properties.periods[0].temperature

  document.querySelector('#temperature-output').textContent = ourTemp
}

fetchWeather()
