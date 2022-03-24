const express = require("express");
const router = express.Router();

const { employeeControllers } = require("../controllers");
const requiresAuth = require("../middlewares/requiresAuth");
const validateKey = require("../middlewares/validateKey");

router.get("/", requiresAuth, employeeControllers.getAllEmployees)
router.get("/:id", employeeControllers.getEmployeeById)
router.post("/", employeeControllers.createNewEmployee)
router.patch("/:id", employeeControllers.editEmployeeById)
router.delete("/:id", employeeControllers.deleteEmployeeById)
router.delete("/", employeeControllers.deleteMultipleEmployeesById)
router.patch("/", employeeControllers.editMultipleEmployees)

module.exports = router;