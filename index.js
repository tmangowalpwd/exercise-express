const express = require("express")
const app = express();
const { nanoid } = require("nanoid")

app.use(express.json())

const PORT = 2000

const employeeDB = [
  {
    id: 1,
    full_name: "John Doe",
    occupation: "Software Engineer",
    gender: "Male"
  },
  {
    id: 2,
    full_name: "Jane Doe",
    occupation: "Digital Marketer",
    gender: "Female"
  },
  {
    id: 3,
    full_name: "Seto Siseto",
    occupation: "CEO",
    gender: "Male"
  },
]

const userDB = [
  {
    username: "seto",
    password: "password"
  },
  {
    username: "bill",
    password: "password"
  },
  {
    username: "mark",
    password: "password"
  },
]

app.post("/auth", (req, res) => {
  const newUserData = req.body;

  const findUserByUsername = userDB.find((user) => {
    return user.username === newUserData.username
  })

  if (findUserByUsername) {
    res.status(400).json({
      message: "Username has been taken"
    })
    return
  }

  if (newUserData?.password?.length < 8) {
    res.status(400).json({
      message: "Password needs 8 characters or more"
    })
    return
  }

  employeeDB.push(newUserData);

  res.status(201).json({
    message: "Registered new user",
  })
})

app.get("/auth", (req, res) => {
  // GET localhost:2000/auth?username=seto&password=password
  const loginData = req.query;
  // username: seto
  // password: password

  const findUser = userDB.find((val) => {
    return val.username === loginData.username
  })

  if (!findUser) {
    res.status(404).json({
      message: "Wrong username"
    })
    return
  }

  if (loginData.password !== findUser.password) {
    res.status(401).json({
      message: "Wrong password"
    })
  }

  res.status(200).json({
    message: "Logged in",
    result: findUser,
    token: nanoid()
  })
})

app.get("/employees", (req, res) => {
  if (!employeeDB.length) {
    res.status(404).json({
      message: "No employees found"
    })
    return
  }

  res.status(200).json({
    message: "Get employees",
    result: employeeDB
  })
})

app.get("/employees/:id", (req, res) => {
  const employeeId = req.params.id

  const findIndex = employeeDB.findIndex(val => {
    return val.id == employeeId
  })

  if (findIndex == -1) {
    res.status(404).json({
      message: "Employee not found"
    })
    return
  }

  const foundEmployee = employeeDB[findIndex]

  res.status(200).json({
    message: "Employee found",
    result: foundEmployee
  });
})

app.post("/employees", (req, res) => {
  const newEmployeeData = req.body;

  if (!newEmployeeData) {
    res.status(400).json({
      message: "Employee data is required"
    })
    return;
  }

  if (!newEmployeeData.full_name) {
    res.status(400).json({
      message: "Employee full name is required"
    })
    return;
  }

  if (!newEmployeeData.occupation) {
    res.status(400).json({
      message: "Employee occupation is required"
    })
    return;
  }

  if (!newEmployeeData.gender) {
    res.status(400).json({
      message: "Employee gender is required"
    })
    return;
  }

  newEmployeeData.id = nanoid();

  employeeDB.push(newEmployeeData);

  res.status(201).json({
    message: "Created employee",
    result: newEmployeeData
  })
})

app.patch("/employees/:id", (req, res) => {
  const employeeId = req.params.id
  const editEmployeeData = req.body;

  const findIndex = employeeDB.findIndex(val => {
    return val.id == employeeId
  })

  if (findIndex == -1) {
    res.status(404).json({
      message: "Employee not found"
    })
    return
  }

  employeeDB[findIndex] = {
    ...employeeDB[findIndex],
    ...editEmployeeData
  }

  res.status(200).json({
    message: "Edited employee",
    result: employeeDB[findIndex]
  })
})

app.delete("/employees/:id", (req, res) => {
  const employeeId = req.params.id

  const findIndex = employeeDB.findIndex(val => {
    return val.id == employeeId
  })

  if (findIndex == -1) {
    res.status(404).json({
      message: "Employee not found"
    })
    return
  }

  employeeDB.splice(findIndex, 1)

  res.status(200).json({
    message: "Deleted employee"
  })
})

app.listen(PORT, () => {
  console.log("Listening in port", PORT)
})