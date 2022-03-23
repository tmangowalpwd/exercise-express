const express = require("express");
const { employeeDB } = require("../database");
const router = express.Router();
const { nanoid } = require("nanoid")

router.get("/", (req, res) => {
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

router.get("/:id", (req, res) => {
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

router.post("/", (req, res) => {
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

router.patch("/:id", (req, res) => {
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

router.delete("/:id", (req, res) => {
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

module.exports = router;