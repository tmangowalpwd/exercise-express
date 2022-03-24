const express = require("express")
const app = express();
const dotenv = require("dotenv")
const cors = require("cors")
const moment = require("moment")

// CORS = Cross Origin Resource Sharing

dotenv.config();

app.use(cors())
app.use(express.json()) // stop dulu di sini
app.use((req, res, next) => {
  console.log(`TIME: ${moment().format("hh:mm DD/MM/YYYY")}`)
  next()
})

const PORT = process.env.PORT

const { employeeRoutes, authRoutes, postRoutes } = require("./routes");

app.use("/employees", employeeRoutes)
app.use("/auth", authRoutes)
app.use("/posts", postRoutes)

app.listen(PORT, () => {
  console.log("Listening in port", PORT)
})