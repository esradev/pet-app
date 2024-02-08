const template = document.querySelector('#pet-card-template')
const wrapper = document.createDocumentFragment()

async function fetchWeather() {
  const weatherPromise = await fetch('https://api.weather.gov/gridpoints/MFL/110,50/forecast')
  const weatherData = await weatherPromise.json()
  const ourTemp = weatherData.properties.periods[0].temperature

  document.querySelector('#temperature-output').textContent = ourTemp
}

fetchWeather()

async function petsArea() {
  const petsPromise = await fetch('https://pet-app-server.netlify.app/.netlify/functions/pets')
  const petsData = await petsPromise.json()

  petsData.forEach((pet) => {
    const clone = template.content.cloneNode(true)
    clone.querySelector('.pet-card').dataset.species = pet.species
    clone.querySelector('h3').textContent = pet.name
    clone.querySelector('.pet-description').textContent = pet.description
    clone.querySelector('.pet-age').textContent = createAgeText(pet.birthYear)

    if (!pet.photo) pet.photo = './images/fallback.jpg'
    clone.querySelector('.pet-card-photo img').src = pet.photo
    clone.querySelector('.pet-card-photo img').alt = `A ${pet.species} named ${pet.name}`
    wrapper.appendChild(clone)
  })

  document.querySelector('.list-of-pets').appendChild(wrapper)
}

petsArea()

function createAgeText(birthYear) {
  const currentYear = new Date().getFullYear()
  const age = currentYear - birthYear
  if (age == 1) return `${age} year old`
  if (age == 0) return `Baby`

  return `${age} years old`
}

// pet filter functionality
const allButtons = document.querySelectorAll('.pet-filter button')

allButtons.forEach((button) => {
  button.addEventListener('click', handleButtonClick)
})

function handleButtonClick(e) {
  //remove active class from all buttons
  allButtons.forEach((button) => {
    button.classList.remove('active')
  })

  //add active class to the clicked button
  e.target.classList.add('active')

  //get the species from the clicked button
  const currentFilter = e.target.dataset.filter
  document.querySelectorAll('.pet-card').forEach((card) => {
    if (currentFilter === card.dataset.species || currentFilter === 'all') {
      card.style.display = 'grid'
    } else {
      card.style.display = 'none'
    }
  })
}
