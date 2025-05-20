const Instructor = require("../models/instructor.model")

// Controller Giảng viên
const InstructorController = {
  // Lấy tất cả giảng viên
  getAllInstructors: async (req, res) => {
    try {
      const instructors = await Instructor.findAll()
      res.json(instructors)
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  },

  // Lấy giảng viên theo Trường/Khoa
  getInstructorsByDepartment: async (req, res) => {
    try {
      const instructors = await Instructor.findByDepartment(req.params.departmentId)
      res.json(instructors)
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  },

  // Lấy giảng viên theo ID
  getInstructorById: async (req, res) => {
    try {
      const instructor = await Instructor.findById(req.params.id)
      if (!instructor) {
        return res.status(404).json({ message: "Không tìm thấy giảng viên" })
      }
      res.json(instructor)
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  },

  // Tạo giảng viên mới
  createInstructor: async (req, res) => {
    try {
      const { department_id, full_name, email, phone, position, specialization, education_level, bio, join_date } =
        req.body

      if (!department_id || !full_name) {
        return res.status(400).json({ message: "ID Trường/Khoa và họ tên là bắt buộc" })
      }

      const newInstructor = await Instructor.create({
        department_id,
        full_name,
        email,
        phone,
        position,
        specialization,
        education_level,
        bio,
        join_date,
      })

      res.status(201).json(newInstructor)
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  },

  // Cập nhật giảng viên
  updateInstructor: async (req, res) => {
    try {
      const { department_id, full_name, email, phone, position, specialization, education_level, bio, join_date } =
        req.body

      if (!department_id || !full_name) {
        return res.status(400).json({ message: "ID Trường/Khoa và họ tên là bắt buộc" })
      }

      const instructor = await Instructor.findById(req.params.id)
      if (!instructor) {
        return res.status(404).json({ message: "Không tìm thấy giảng viên" })
      }

      const updatedInstructor = await Instructor.update(req.params.id, {
        department_id,
        full_name,
        email,
        phone,
        position,
        specialization,
        education_level,
        bio,
        join_date,
      })

      res.json(updatedInstructor)
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  },

  // Xóa giảng viên
  deleteInstructor: async (req, res) => {
    try {
      const instructor = await Instructor.findById(req.params.id)
      if (!instructor) {
        return res.status(404).json({ message: "Không tìm thấy giảng viên" })
      }

      await Instructor.delete(req.params.id)
      res.json({ message: "Xóa giảng viên thành công" })
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  },

  // Tìm kiếm giảng viên
  searchInstructors: async (req, res) => {
    try {
      const { query } = req.query
      if (!query) {
        return res.status(400).json({ message: "Từ khóa tìm kiếm là bắt buộc" })
      }

      const instructors = await Instructor.search(query)
      res.json(instructors)
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  },
}

module.exports = InstructorController
