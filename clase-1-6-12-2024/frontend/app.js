document.addEventListener("DOMContentLoaded", () => {
  const charactersList = document.getElementById("characters-list")

  const API_URL = "http://localhost:3000/api/characters"

  fetch(API_URL)
    .then(response => response.json())
    .then(characters => {
      characters.forEach((character) => {
        const { name, image, status, gender } = character

        const card = document.createElement("div")
        card.className = "character-card"
        card.innerHTML = `
        <img src="${image}" alt="imagen de ${name}">
        <h3></h3>
        <p><strong>Status:</strong> ${status}</p>
        <p><strong>Gender:</strong> ${gender}</p>  
        `

        charactersList.appendChild(card)
      })

    }).catch((error) => {
      console.error("Error to fetching data:", error)
    })
})