const express = require("express")
const app = express();
const dotenv = require("dotenv")

dotenv.config();

app.use(express.json())

const PORT = process.env.PORT

const { employeeRoutes, authRoutes } = require("./routes");

app.use("/employees", employeeRoutes)
app.use("/auth", authRoutes)

app.listen(PORT, () => {
  console.log("Listening in port", PORT)
})