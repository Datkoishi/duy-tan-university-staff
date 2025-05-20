const { pool } = require("./db")

// Model Giảng viên
const Instructor = {
  // Lấy tất cả giảng viên
  findAll: async () => {
    try {
      const [rows] = await pool.query(`
        SELECT i.*, d.name as department_name 
        FROM instructors i
        JOIN departments d ON i.department_id = d.id
        ORDER BY i.full_name
      `)
      return rows
    } catch (error) {
      throw error
    }
  },

  // Lấy giảng viên theo Trường/Khoa
  findByDepartment: async (departmentId) => {
    try {
      const [rows] = await pool.query(
        `
        SELECT i.*, d.name as department_name 
        FROM instructors i
        JOIN departments d ON i.department_id = d.id
        WHERE i.department_id = ?
        ORDER BY i.full_name
      `,
        [departmentId],
      )
      return rows
    } catch (error) {
      throw error
    }
  },

  // Lấy giảng viên theo ID
  findById: async (id) => {
    try {
      const [rows] = await pool.query(
        `
        SELECT i.*, d.name as department_name 
        FROM instructors i
        JOIN departments d ON i.department_id = d.id
        WHERE i.id = ?
      `,
        [id],
      )
      return rows[0]
    } catch (error) {
      throw error
    }
  },

  // Tạo giảng viên mới
  create: async (instructor) => {
    try {
      const [result] = await pool.query(
        `INSERT INTO instructors 
        (department_id, full_name, email, phone, position, specialization, education_level, bio, join_date) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          instructor.department_id,
          instructor.full_name,
          instructor.email,
          instructor.phone,
          instructor.position,
          instructor.specialization,
          instructor.education_level,
          instructor.bio,
          instructor.join_date,
        ],
      )
      return { id: result.insertId, ...instructor }
    } catch (error) {
      throw error
    }
  },

  // Cập nhật giảng viên
  update: async (id, instructor) => {
    try {
      await pool.query(
        `UPDATE instructors SET 
        department_id = ?, full_name = ?, email = ?, phone = ?, position = ?, 
        specialization = ?, education_level = ?, bio = ?, join_date = ?
        WHERE id = ?`,
        [
          instructor.department_id,
          instructor.full_name,
          instructor.email,
          instructor.phone,
          instructor.position,
          instructor.specialization,
          instructor.education_level,
          instructor.bio,
          instructor.join_date,
          id,
        ],
      )
      return { id, ...instructor }
    } catch (error) {
      throw error
    }
  },

  // Xóa giảng viên
  delete: async (id) => {
    try {
      await pool.query("DELETE FROM instructors WHERE id = ?", [id])
      return true
    } catch (error) {
      throw error
    }
  },

  // Tìm kiếm giảng viên
  search: async (query) => {
    try {
      const searchQuery = `%${query}%`
      const [rows] = await pool.query(
        `
        SELECT i.*, d.name as department_name 
        FROM instructors i
        JOIN departments d ON i.department_id = d.id
        WHERE i.full_name LIKE ? OR i.email LIKE ? OR i.specialization LIKE ?
        ORDER BY i.full_name
      `,
        [searchQuery, searchQuery, searchQuery],
      )
      return rows
    } catch (error) {
      throw error
    }
  },
}

module.exports = Instructor
