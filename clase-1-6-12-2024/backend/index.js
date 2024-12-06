import express from "express"
import cors from "cors"

const app = express()
const PORT = process.env.PORT ?? 3000

// Cors
app.use(cors())

const characters = [
  {
    id: 1,
    name: "Rick Sanchez",
    status: "Alive",
    species: "Human",
    gender: "Male",
    image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
  },
  {
    id: 2,
    name: "Morty Smith",
    status: "Alive",
    species: "Human",
    gender: "Male",
    image: "https://rickandmortyapi.com/api/character/avatar/2.jpeg",
  },
  {
    id: 3,
    name: "Summer Smith",
    status: "Alive",
    species: "Human",
    gender: "Female",
    image: "https://rickandmortyapi.com/api/character/avatar/3.jpeg",
  },
];

app.get("/api/characters", (req, res) => {
  res.json(characters)
})

app.listen(PORT, () => {
  console.log("Servidor en escucha en el puerto http://localhost:" + PORT)
})
