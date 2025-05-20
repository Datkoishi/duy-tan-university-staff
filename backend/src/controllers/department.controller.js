const Department = require("../models/department.model")

// Controller Trường/Khoa
const DepartmentController = {
  // Lấy tất cả Trường/Khoa
  getAllDepartments: async (req, res) => {
    try {
      const departments = await Department.findAll()
      res.json(departments)
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  },

  // Lấy Trường/Khoa theo ID
  getDepartmentById: async (req, res) => {
    try {
      const department = await Department.findById(req.params.id)
      if (!department) {
        return res.status(404).json({ message: "Không tìm thấy Trường/Khoa" })
      }
      res.json(department)
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  },

  // Tạo Trường/Khoa mới
  createDepartment: async (req, res) => {
    try {
      const { name, description } = req.body
      if (!name) {
        return res.status(400).json({ message: "Tên Trường/Khoa là bắt buộc" })
      }

      const newDepartment = await Department.create({ name, description })
      res.status(201).json(newDepartment)
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  },

  // Cập nhật Trường/Khoa
  updateDepartment: async (req, res) => {
    try {
      const { name, description } = req.body
      if (!name) {
        return res.status(400).json({ message: "Tên Trường/Khoa là bắt buộc" })
      }

      const department = await Department.findById(req.params.id)
      if (!department) {
        return res.status(404).json({ message: "Không tìm thấy Trường/Khoa" })
      }

      const updatedDepartment = await Department.update(req.params.id, { name, description })
      res.json(updatedDepartment)
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  },

  // Xóa Trường/Khoa
  deleteDepartment: async (req, res) => {
    try {
      const department = await Department.findById(req.params.id)
      if (!department) {
        return res.status(404).json({ message: "Không tìm thấy Trường/Khoa" })
      }

      await Department.delete(req.params.id)
      res.json({ message: "Xóa Trường/Khoa thành công" })
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  },
}

module.exports = DepartmentController
