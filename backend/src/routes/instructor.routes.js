const express = require("express")
const router = express.Router()
const instructorController = require("../controllers/instructor.controller")

// Routes Giảng viên
router.get("/", instructorController.getAllInstructors)
router.get("/search", instructorController.searchInstructors)
router.get("/department/:departmentId", instructorController.getInstructorsByDepartment)
router.get("/:id", instructorController.getInstructorById)
router.post("/", instructorController.createInstructor)
router.put("/:id", instructorController.updateInstructor)
router.delete("/:id", instructorController.deleteInstructor)

module.exports = router

