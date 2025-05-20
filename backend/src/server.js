const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const path = require("path")
require("dotenv").config()

// Import kết nối cơ sở dữ liệu
const { testConnection } = require("./models/db")

// Import routes
const departmentRoutes = require("./routes/department.routes")
const instructorRoutes = require("./routes/instructor.routes")

// Khởi tạo ứng dụng express
const app = express()

// Middleware
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// Phục vụ các file tĩnh từ thư mục frontend
app.use(express.static(path.join(__dirname, "../../frontend")))

// API routes
app.use("/api/departments", departmentRoutes)
app.use("/api/instructors", instructorRoutes)

// Phục vụ file HTML chính cho các route khác
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../../frontend/index.html"))
})

// Thiết lập cổng và khởi động server
const PORT = process.env.PORT || 3000
app.listen(PORT, async () => {
  console.log(`Server đang chạy trên cổng ${PORT}`)
  // Kiểm tra kết nối cơ sở dữ liệu
  await testConnection()
})
