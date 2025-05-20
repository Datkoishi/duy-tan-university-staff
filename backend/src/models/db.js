const mysql = require("mysql2/promise")
const dbConfig = require("../config/db.config")

// Tạo pool kết nối
const pool = mysql.createPool({
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
})

// Kiểm tra kết nối
async function testConnection() {
  try {
    const connection = await pool.getConnection()
    console.log("Kết nối cơ sở dữ liệu thành công")
    connection.release()
  } catch (err) {
    console.error("Kết nối cơ sở dữ liệu thất bại:", err)
    process.exit(1)
  }
}

module.exports = {
  pool,
  testConnection,
}
