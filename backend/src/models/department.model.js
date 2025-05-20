const { pool } = require("./db")

// Model Trường/Khoa
const Department = {
  // Lấy tất cả Trường/Khoa
  findAll: async () => {
    try {
      const [rows] = await pool.query("SELECT * FROM departments ORDER BY name")
      return rows
    } catch (error) {
      throw error
    }
  },

  // Lấy Trường/Khoa theo ID
  findById: async (id) => {
    try {
      const [rows] = await pool.query("SELECT * FROM departments WHERE id = ?", [id])
      return rows[0]
    } catch (error) {
      throw error
    }
  },

  // Tạo Trường/Khoa mới
  create: async (department) => {
    try {
      const [result] = await pool.query("INSERT INTO departments (name, description) VALUES (?, ?)", [
        department.name,
        department.description,
      ])
      return { id: result.insertId, ...department }
    } catch (error) {
      throw error
    }
  },

  // Cập nhật Trường/Khoa
  update: async (id, department) => {
    try {
      await pool.query("UPDATE departments SET name = ?, description = ? WHERE id = ?", [
        department.name,
        department.description,
        id,
      ])
      return { id, ...department }
    } catch (error) {
      throw error
    }
  },

  // Xóa Trường/Khoa
  delete: async (id) => {
    try {
      await pool.query("DELETE FROM departments WHERE id = ?", [id])
      return true
    } catch (error) {
      throw error
    }
  },
}

module.exports = Department
