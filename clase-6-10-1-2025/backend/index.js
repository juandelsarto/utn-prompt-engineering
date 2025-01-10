import express from "express"
import { mattressRoutes } from "./routes/mattressRoutes.js"

process.loadEnvFile()

const app = express()
app.use(express.json())

const PORT = process.env.PORT

app.use("/api/mattress", mattressRoutes)

app.listen(PORT, () => {
  console.log("Servidor en escucha en el puerto http://localhost:" + PORT)
})