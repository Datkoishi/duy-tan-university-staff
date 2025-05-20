const express = require("express")
const router = express.Router()
const departmentController = require("../controllers/department.controller")

// Routes Trường/Khoa
router.get("/", departmentController.getAllDepartments)
router.get("/:id", departmentController.getDepartmentById)
router.post("/", departmentController.createDepartment)
router.put("/:id", departmentController.updateDepartment)
router.delete("/:id", departmentController.deleteDepartment)

module.exports = router
