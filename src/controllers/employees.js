const { employeeDB } = require("../database")
const { nanoid } = require("nanoid")

const employeeControllers = {
  getAllEmployees: (req, res) => {
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
  },
  getEmployeeById: (req, res) => {
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
  },
  createNewEmployee: (req, res) => {
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
  },
  editEmployeeById: (req, res) => {
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
  },
  deleteEmployeeById: (req, res) => {
    const employeeId = req.params.id

    console.log(req.query)

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
  },
  deleteMultipleEmployeesById: (req, res) => {
    const employeeIds = req.query.ids

    // console.log(employeeIds.split(","))
    // console.log(employeeIds)

    for (let i = 0; i < employeeIds.length; i++) {
      const currentEmployeeId = employeeIds[i]

      const findIndex = employeeDB.findIndex((employee) => {
        return employee.id == currentEmployeeId
      })

      if (findIndex == -1) {
        continue
      }

      employeeDB.splice(findIndex, 1)
    }

    res.status(200).json({
      message: "Employees deleted"
    })
  },
  editMultipleEmployees: (req, res) => {
    const employeeIds = req.query.ids
    const editEmployeeData = req.body

    for (let i = 0; i < employeeIds.length; i++) {
      const currentEmployeeId = employeeIds[i]

      const findIndex = employeeDB.findIndex((employee) => {
        return employee.id == currentEmployeeId
      })

      if (findIndex == -1) {
        continue
      }

      employeeDB[findIndex] = {
        ...employeeDB[findIndex],
        ...editEmployeeData
      }
    }

    res.status(200).json({
      message: "Employees edited"
    })
  }
}

module.exports = employeeControllers