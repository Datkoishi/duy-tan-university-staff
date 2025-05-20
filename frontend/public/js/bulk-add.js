// Biến toàn cục cho danh sách giảng viên hàng loạt
let bulkInstructors = []
const departments = [] // Declare departments variable
const API_BASE_URL = "https://api.example.com" // Declare API_BASE_URL variable
const loadInstructors = async () => {} // Declare loadInstructors variable
const showAlert = (message, type) => {} // Declare showAlert variable

// Khởi tạo khi trang được tải
document.addEventListener("DOMContentLoaded", () => {
  // Thiết lập sự kiện cho các nút
  setupBulkAddEventListeners()
})

// Thiết lập sự kiện cho các nút
function setupBulkAddEventListeners() {
  // Nút tạo ngẫu nhiên
  const generateRandomInstructorsBtn = document.getElementById("generate-random-instructors-btn")
  if (generateRandomInstructorsBtn) {
    generateRandomInstructorsBtn.addEventListener("click", generateRandomInstructors)
  }

  // Nút lưu tất cả
  const saveBulkInstructorsBtn = document.getElementById("save-bulk-instructors-btn")
  if (saveBulkInstructorsBtn) {
    saveBulkInstructorsBtn.addEventListener("click", saveBulkInstructors)
  }

  // Nút xóa tất cả
  const clearBulkListBtn = document.getElementById("clear-bulk-list-btn")
  if (clearBulkListBtn) {
    clearBulkListBtn.addEventListener("click", clearBulkList)
  }

  // Điền dropdown Trường/Khoa cho tùy chọn tạo ngẫu nhiên
  populateRandomDepartmentDropdown()
}

// Điền dropdown Trường/Khoa cho tùy chọn tạo ngẫu nhiên
function populateRandomDepartmentDropdown() {
  const randomDepartmentDropdown = document.getElementById("random-department")
  if (!randomDepartmentDropdown) return

  // Xóa tất cả các tùy chọn trừ tùy chọn đầu tiên
  while (randomDepartmentDropdown.options.length > 1) {
    randomDepartmentDropdown.remove(1)
  }

  // Thêm các Trường/Khoa vào dropdown
  if (departments && departments.length > 0) {
    departments.forEach((department) => {
      const option = document.createElement("option")
      option.value = department.id
      option.textContent = department.name
      randomDepartmentDropdown.appendChild(option)
    })
  }
}

// Tạo giảng viên ngẫu nhiên
function generateRandomInstructors() {
  // Lấy các tùy chọn
  const count = Number.parseInt(document.getElementById("random-count").value) || 5
  const departmentId = document.getElementById("random-department").value
  const educationLevel = document.getElementById("random-education").value

  // Kiểm tra nếu không có Trường/Khoa
  if (departments.length === 0) {
    showAlert("Không có Trường/Khoa nào. Vui lòng thêm Trường/Khoa trước.", "warning")
    return
  }

  // Xóa danh sách hiện tại
  bulkInstructors = []

  // Tạo giảng viên ngẫu nhiên
  for (let i = 0; i < count; i++) {
    // Chọn Trường/Khoa ngẫu nhiên nếu chọn "Tất cả các khoa"
    let selectedDepartmentId = departmentId
    if (departmentId === "all") {
      const randomIndex = Math.floor(Math.random() * departments.length)
      selectedDepartmentId = departments[randomIndex].id
    }

    // Chọn trình độ học vấn ngẫu nhiên nếu chọn "Ngẫu nhiên"
    let selectedEducation = educationLevel
    if (educationLevel === "all") {
      const educationLevels = ["Cử nhân", "Thạc sĩ", "Tiến sĩ", "Phó Giáo sư", "Giáo sư"]
      const randomIndex = Math.floor(Math.random() * educationLevels.length)
      selectedEducation = educationLevels[randomIndex]
    }

    // Tạo giảng viên ngẫu nhiên
    const fullName = window.AutoFill.generateFullName()
    const email = window.AutoFill.generateEmail(fullName)
    const phone = window.AutoFill.generatePhoneNumber()
    const position = window.AutoFill.getRandomItem(window.AutoFill.positions)
    const specialization = window.AutoFill.getRandomItem(window.AutoFill.specializations)
    const joinDate = window.AutoFill.generateJoinDate()
    const bio = window.AutoFill.generateBio(specialization)

    // Thêm vào danh sách
    bulkInstructors.push({
      id: `temp_${Date.now()}_${i}`,
      department_id: selectedDepartmentId,
      full_name: fullName,
      email: email,
      phone: phone,
      position: position,
      specialization: specialization,
      education_level: selectedEducation,
      join_date: joinDate,
      bio: bio,
      department_name: departments.find((d) => d.id == selectedDepartmentId)?.name || "Unknown",
    })
  }

  // Cập nhật bảng
  updateBulkInstructorsTable()
}

// Cập nhật bảng giảng viên hàng loạt
function updateBulkInstructorsTable() {
  const tableBody = document.getElementById("bulk-instructors-table")
  if (!tableBody) return

  if (bulkInstructors.length === 0) {
    tableBody.innerHTML = `
      <tr>
        <td colspan="7" class="text-center py-4">
          Chưa có dữ liệu. Nhấn "Tạo ngẫu nhiên" để tạo danh sách giảng viên.
        </td>
      </tr>
    `
    return
  }

  tableBody.innerHTML = ""

  bulkInstructors.forEach((instructor, index) => {
    const tr = document.createElement("tr")
    tr.innerHTML = `
      <td>${index + 1}</td>
      <td>${instructor.full_name}</td>
      <td>${instructor.email}</td>
      <td>${instructor.phone}</td>
      <td>${instructor.department_name}</td>
      <td>${instructor.education_level}</td>
      <td>
        <button class="btn btn-sm btn-danger remove-bulk-instructor-btn" data-index="${index}">
          <i class="bi bi-trash"></i>
        </button>
      </td>
    `
    tableBody.appendChild(tr)
  })

  // Thêm sự kiện cho các nút xóa
  document.querySelectorAll(".remove-bulk-instructor-btn").forEach((button) => {
    button.addEventListener("click", (e) => {
      const index = Number.parseInt(e.currentTarget.getAttribute("data-index"))
      removeBulkInstructor(index)
    })
  })
}

// Xóa một giảng viên khỏi danh sách
function removeBulkInstructor(index) {
  if (index >= 0 && index < bulkInstructors.length) {
    bulkInstructors.splice(index, 1)
    updateBulkInstructorsTable()
  }
}

// Xóa tất cả giảng viên khỏi danh sách
function clearBulkList() {
  if (bulkInstructors.length === 0) return

  if (confirm("Bạn có chắc chắn muốn xóa tất cả giảng viên khỏi danh sách?")) {
    bulkInstructors = []
    updateBulkInstructorsTable()
  }
}

// Lưu tất cả giảng viên
async function saveBulkInstructors() {
  if (bulkInstructors.length === 0) {
    showAlert("Không có giảng viên nào để lưu", "warning")
    return
  }

  try {
    // Hiển thị thông báo đang xử lý
    showAlert("Đang lưu dữ liệu...", "info")

    // Lưu từng giảng viên
    let successCount = 0
    let errorCount = 0

    for (const instructor of bulkInstructors) {
      // Chuẩn bị dữ liệu
      const instructorData = {
        department_id: instructor.department_id,
        full_name: instructor.full_name,
        email: instructor.email,
        phone: instructor.phone,
        position: instructor.position,
        specialization: instructor.specialization,
        education_level: instructor.education_level,
        bio: instructor.bio,
        join_date: instructor.join_date,
      }

      try {
        // Gửi yêu cầu API
        const response = await fetch(`${API_BASE_URL}/instructors`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(instructorData),
        })

        if (response.ok) {
          successCount++
        } else {
          errorCount++
          console.error(`Lỗi khi lưu giảng viên ${instructor.full_name}:`, await response.text())
        }
      } catch (error) {
        errorCount++
        console.error(`Lỗi khi lưu giảng viên ${instructor.full_name}:`, error)
      }
    }

    // Hiển thị kết quả
    if (errorCount === 0) {
      showAlert(`Đã lưu thành công ${successCount} giảng viên`, "success")
      // Xóa danh sách sau khi lưu thành công
      bulkInstructors = []
      updateBulkInstructorsTable()
      // Tải lại danh sách giảng viên
      await loadInstructors()
    } else {
      showAlert(`Đã lưu ${successCount} giảng viên, ${errorCount} giảng viên bị lỗi`, "warning")
    }
  } catch (error) {
    console.error("Lỗi khi lưu giảng viên hàng loạt:", error)
    showAlert("Lỗi khi lưu giảng viên hàng loạt", "danger")
  }
}
