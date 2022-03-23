const express = require("express")
const app = express();

app.use(express.json())

const PORT = 2000

const { employeeRoutes, authRoutes } = require("./routes");

app.use("/employees", employeeRoutes)
app.use("/auth", authRoutes)

app.listen(PORT, () => {
  console.log("Listening in port", PORT)
})