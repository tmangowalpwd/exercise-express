const express = require("express")
const app = express();
const dotenv = require("dotenv")
const cors = require("cors")
const moment = require("moment")
const fs = require("fs");

// CORS = Cross Origin Resource Sharing

// Challenge
// 1. Buat CRUD API untuk sebuah todo list
// 2. Terapkan logging menggunakan middleware dengan format sbg berikut:
//    "<HTTP_METHOD> <PATH> <hh:mm DD/MM/YYYY>"
//    "GET /todos 13:01 24/03/2022"
// 3. Logs harus muncul di console/terminal setiap request
// 4. Logs harus disimpan ke dalam file bernama ".log"
// 5. Tampilkan todo list di front end (next atau create-react-app)
// 6. Connect todo list frontend ke back end

// Isi todo list
// id: generate secara random
// status: "done" || "not done"
// action: string

dotenv.config();

app.use(cors())
app.use(express.json()) // stop dulu di sini
app.use((req, res, next) => {
  const logFormat = `TIME: ${moment().format("hh:mm DD/MM/YYYY")}`

  fs.appendFileSync(`${__dirname}/../.logs`, logFormat + "\n")

  console.log(logFormat)

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