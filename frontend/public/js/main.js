// Biến toàn cục
let currentSection = "dashboard" // Thay đổi từ "home" thành "dashboard"
let departments = []
let instructors = []
let currentInstructorId = null
let currentDepartmentId = null
let previousSection = null

// URL cơ sở API
const API_BASE_URL = "/api"
window.API_BASE_URL = API_BASE_URL

// DOM Elements
const sections = {
  dashboard: document.getElementById("dashboard-section"),
  home: document.getElementById("home-section"),
  instructors: document.getElementById("instructors-section"),
  departments: document.getElementById("departments-section"),
  addInstructor: document.getElementById("add-instructor-section"),
  searchResults: document.getElementById("search-results-section"),
  bulkAdd: document.getElementById("bulk-add-section"),
  reports: document.getElementById("reports-section"),
  settings: document.getElementById("settings-section"),
}

// Khởi tạo ứng dụng
document.addEventListener("DOMContentLoaded", () => {
  // Thiết lập điều hướng
  setupNavigation()

  // Thiết lập các sự kiện lắng nghe
  setupEventListeners()

  // Tải dữ liệu ban đầu
  loadDepartments()
  loadInstructors()
  loadStatistics()

  // Hiển thị dashboard mặc định
  showSection("dashboard")
})

// Thiết lập điều hướng
function setupNavigation() {
  // Dashboard
  document.getElementById("dashboard-link").addEventListener("click", (e) => {
    e.preventDefault()
    showSection("dashboard")
  })

  // Giảng viên
  document.getElementById("instructors-link").addEventListener("click", (e) => {
    e.preventDefault()
    showSection("instructors")
  })

  // Trường/Khoa
  document.getElementById("departments-link").addEventListener("click", (e) => {
    e.preventDefault()
    showSection("departments")
  })

  // Thêm Giảng viên
  document.getElementById("add-instructor-link").addEventListener("click", (e) => {
    e.preventDefault()
    showSection("addInstructor")
    resetInstructorForm()
  })

  // Thêm hàng loạt
  document.getElementById("bulk-add-link").addEventListener("click", (e) => {
    e.preventDefault()
    showSection("bulkAdd")
  })

  // Báo cáo
  document.getElementById("reports-link").addEventListener("click", (e) => {
    e.preventDefault()
    showSection("reports")
  })

  // Cài đặt
  document.getElementById("settings-link").addEventListener("click", (e) => {
    e.preventDefault()
    showSection("settings")
  })

  // Nút xem tất cả giảng viên
  const viewAllInstructorsBtn = document.getElementById("view-all-instructors-btn")
  if (viewAllInstructorsBtn) {
    viewAllInstructorsBtn.addEventListener("click", () => {
      showSection("instructors")
    })
  }

  // Nút xem tất cả Trường/Khoa
  const viewAllDepartmentsBtn = document.getElementById("view-all-departments-btn")
  if (viewAllDepartmentsBtn) {
    viewAllDepartmentsBtn.addEventListener("click", () => {
      showSection("departments")
    })
  }

  // Nút quay lại từ kết quả tìm kiếm
  document.getElementById("back-from-search-btn").addEventListener("click", () => {
    showSection(currentSection === "searchResults" ? previousSection : currentSection)
  })
}

// Thiết lập các sự kiện lắng nghe
function setupEventListeners() {
  // Thay đổi bộ lọc Trường/Khoa
  document.getElementById("department-filter").addEventListener("change", (e) => {
    const departmentId = e.target.value
    if (departmentId) {
      loadInstructorsByDepartment(departmentId)
    } else {
      loadInstructors()
    }
  })

  // Gửi form tìm kiếm
  document.getElementById("search-form").addEventListener("submit", (e) => {
    e.preventDefault()
    const query = document.getElementById("search-input").value.trim()
    if (query) {
      searchInstructors(query)
    }
  })

  // Nút thêm Trường/Khoa
  document.getElementById("add-department-btn").addEventListener("click", () => {
    document.getElementById("department-modal-title").textContent = "Thêm Trường/Khoa"
    document.getElementById("department-id").value = ""
    document.getElementById("department-name").value = ""
    document.getElementById("department-description").value = ""

    const departmentModal = new window.bootstrap.Modal(document.getElementById("departmentModal"))
    departmentModal.show()
  })

  // Nút lưu Trường/Khoa
  document.getElementById("save-department-btn").addEventListener("click", saveDepartment)

  // Gửi form giảng viên
  document.getElementById("instructor-form").addEventListener("submit", (e) => {
    e.preventDefault()
    saveInstructor()
  })

  // Nút hủy giảng viên
  document.getElementById("cancel-instructor-btn").addEventListener("click", () => {
    showSection("instructors")
  })

  // Nút xác nhận xóa Trường/Khoa
  document.getElementById("confirm-delete-department-btn").addEventListener("click", () => {
    if (currentDepartmentId) {
      deleteDepartment(currentDepartmentId)
    }
  })

  // Nút điền ngẫu nhiên
  const fillRandomDataBtn = document.getElementById("fill-random-data-btn")
  if (fillRandomDataBtn) {
    fillRandomDataBtn.addEventListener("click", () => {
      if (typeof window.AutoFill !== "undefined" && typeof window.AutoFill.fillForm === "function") {
        window.AutoFill.fillForm()
      } else {
        console.error("AutoFill không được định nghĩa. Vui lòng kiểm tra file auto-fill.js")
      }
    })
  }

  // Nút thêm giảng viên từ trang giảng viên
  const addInstructorBtn2 = document.getElementById("add-instructor-btn-2")
  if (addInstructorBtn2) {
    addInstructorBtn2.addEventListener("click", () => {
      showSection("addInstructor")
      resetInstructorForm()
    })
  }

  // Nút làm mới dashboard
  const refreshDashboardBtn = document.getElementById("refresh-dashboard-btn")
  if (refreshDashboardBtn) {
    refreshDashboardBtn.addEventListener("click", () => {
      loadStatistics()
    })
  }

  // Nút lưu cài đặt
  const saveSettingsBtn = document.getElementById("save-settings-btn")
  if (saveSettingsBtn) {
    saveSettingsBtn.addEventListener("click", () => {
      showAlert("Cài đặt đã được lưu thành công", "success")
    })
  }

  // Nút chuyển đổi sidebar
  const sidebarToggle = document.getElementById("sidebar-toggle")
  const sidebar = document.getElementById("sidebar")
  if (sidebarToggle && sidebar) {
    sidebarToggle.addEventListener("click", () => {
      sidebar.classList.toggle("show")
    })
  }

  // Nút chuyển đổi dark mode
  const darkModeToggle = document.getElementById("dark-mode-toggle")
  if (darkModeToggle) {
    darkModeToggle.addEventListener("click", () => {
      document.body.classList.toggle("dark-mode")
      const icon = darkModeToggle.querySelector("i")
      if (icon) {
        icon.classList.toggle("bi-moon-fill")
        icon.classList.toggle("bi-sun-fill")
      }
    })
  }
}

// Sửa hàm showSection để đảm bảo biểu đồ báo cáo được cập nhật đúng cách
function showSection(sectionName) {
  console.log("Showing section:", sectionName)

  // Lưu phần trước đó nếu không phải kết quả tìm kiếm
  if (currentSection !== "searchResults") {
    previousSection = currentSection
  }

  // Cập nhật phần hiện tại
  currentSection = sectionName

  // Ẩn tất cả các phần
  Object.values(sections).forEach((section) => {
    if (section) {
      section.style.display = "none"
    }
  })

  // Hiển thị phần được chọn
  if (sections[sectionName]) {
    sections[sectionName].style.display = "block"
  }

  // Cập nhật liên kết điều hướng hoạt động
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.classList.remove("active")
  })

  const activeLink = document.getElementById(`${sectionName}-link`)
  if (activeLink) {
    activeLink.classList.add("active")
  }

  // Làm mới dữ liệu nếu cần
  if (sectionName === "departments") {
    loadDepartments()
  } else if (sectionName === "instructors") {
    loadInstructors()
  } else if (sectionName === "dashboard") {
    loadStatistics()
  } else if (sectionName === "addInstructor") {
    populateDepartmentDropdown("instructor-department")
  } else if (sectionName === "bulkAdd") {
    populateDepartmentDropdown("random-department")
  } else if (sectionName === "reports") {
    console.log("Loading reports section")

    // Đảm bảo dữ liệu đã được tải
    const loadData = async () => {
      if (!departments.length || !instructors.length) {
        console.log("Loading data for reports")
        try {
          // Tải dữ liệu nếu chưa có
          const deptPromise = fetch(`${API_BASE_URL}/departments`).then((res) => res.json())
          const instrPromise = fetch(`${API_BASE_URL}/instructors`).then((res) => res.json())

          const [deptData, instrData] = await Promise.all([deptPromise, instrPromise])

          departments = deptData
          instructors = instrData

          window.departments = departments
          window.instructors = instructors

          console.log("Data loaded for reports:", { departments, instructors })
        } catch (error) {
          console.error("Error loading data for reports:", error)
        }
      }

      // Cập nhật biểu đồ báo cáo sau khi dữ liệu đã được tải
      setTimeout(() => {
        console.log("Initializing charts from showSection")
        if (window.ChartUtils) {
          window.ChartUtils.setupCharts()
          window.ChartUtils.updateDepartmentsChart(departments, instructors)
          window.ChartUtils.updateEducationChart(instructors)
          window.ChartUtils.updateStatisticsTable(departments, instructors)
        } else {
          console.log("ChartUtils not available")
        }
      }, 300)
    }

    loadData()
  }
}

// Xuất hàm showSection ra window để các file khác có thể truy cập
window.showSection = showSection

// Tải Trường/Khoa từ API
async function loadDepartments() {
  try {
    const response = await fetch(`${API_BASE_URL}/departments`)
    if (!response.ok) {
      throw new Error("Không thể tải dữ liệu Trường/Khoa")
    }

    departments = await response.json()
    window.departments = departments // Xuất ra window để các file khác có thể truy cập

    // Cập nhật danh sách Trường/Khoa trên trang chủ
    const departmentsListHome = document.getElementById("departments-list-home")
    if (departmentsListHome) {
      departmentsListHome.innerHTML = ""

      if (departments.length === 0) {
        departmentsListHome.innerHTML = '<li class="list-group-item">Không có dữ liệu</li>'
      } else {
        departments.forEach((department) => {
          const li = document.createElement("li")
          li.className = "list-group-item d-flex justify-content-between align-items-center"
          li.innerHTML = `
            <span>${department.name}</span>
            <span class="badge bg-primary rounded-pill department-count" data-department-id="${department.id}">0</span>
          `
          li.addEventListener("click", () => {
            showSection("instructors")
            document.getElementById("department-filter").value = department.id
            loadInstructorsByDepartment(department.id)
          })
          departmentsListHome.appendChild(li)
        })
      }
    }

    // Cập nhật container Trường/Khoa trên trang Trường/Khoa
    const departmentsContainer = document.getElementById("departments-container")
    if (departmentsContainer) {
      departmentsContainer.innerHTML = ""

      if (departments.length === 0) {
        departmentsContainer.innerHTML = '<div class="col-12 text-center">Không có dữ liệu</div>'
      } else {
        departments.forEach((department) => {
          const col = document.createElement("div")
          col.className = "col-md-4 mb-4"
          col.innerHTML = `
            <div class="card department-card h-100">
              <div class="card-header d-flex justify-content-between align-items-center">
                <h5 class="mb-0">${department.name}</h5>
                <div>
                  <button class="btn btn-sm btn-light edit-department-btn" data-department-id="${department.id}">
                    <i class="bi bi-pencil"></i>
                  </button>
                  <button class="btn btn-sm btn-danger delete-department-btn" data-department-id="${department.id}">
                    <i class="bi bi-trash"></i>
                  </button>
                </div>
              </div>
              <div class="card-body">
                <p class="card-text">${department.description || "Không có mô tả"}</p>
              </div>
              <div class="card-footer bg-white">
                <button class="btn btn-primary btn-sm view-department-instructors-btn" data-department-id="${department.id}">
                  <i class="bi bi-people-fill me-2"></i>Xem giảng viên
                </button>
              </div>
            </div>
          `
          departmentsContainer.appendChild(col)
        })

        // Thêm sự kiện lắng nghe cho các nút Trường/Khoa
        document.querySelectorAll(".edit-department-btn").forEach((button) => {
          button.addEventListener("click", (e) => {
            e.stopPropagation()
            const departmentId = button.getAttribute("data-department-id")
            editDepartment(departmentId)
          })
        })

        document.querySelectorAll(".delete-department-btn").forEach((button) => {
          button.addEventListener("click", (e) => {
            e.stopPropagation()
            const departmentId = button.getAttribute("data-department-id")
            confirmDeleteDepartment(departmentId)
          })
        })

        document.querySelectorAll(".view-department-instructors-btn").forEach((button) => {
          button.addEventListener("click", () => {
            const departmentId = button.getAttribute("data-department-id")
            showSection("instructors")
            document.getElementById("department-filter").value = departmentId
            loadInstructorsByDepartment(departmentId)
          })
        })
      }
    }

    // Cập nhật dropdown bộ lọc Trường/Khoa
    populateDepartmentDropdown("department-filter")

    // Cập nhật danh sách Trường/Khoa trên dashboard
    updateDepartmentsListDashboard()
  } catch (error) {
    console.error("Lỗi khi tải Trường/Khoa:", error)
    showAlert("Lỗi khi tải dữ liệu Trường/Khoa", "danger")
  }
}

// Tải giảng viên từ API
async function loadInstructors() {
  try {
    const response = await fetch(`${API_BASE_URL}/instructors`)
    if (!response.ok) {
      throw new Error("Không thể tải dữ liệu giảng viên")
    }

    instructors = await response.json()
    window.instructors = instructors // Xuất ra window để các file khác có thể truy cập

    // Cập nhật bảng giảng viên
    updateInstructorsTable(instructors)

    // Cập nhật danh sách giảng viên gần đây
    updateRecentInstructorsList()

    // Cập nhật số lượng Trường/Khoa
    updateDepartmentCounts()

    // Cập nhật thống kê
    loadStatistics()
  } catch (error) {
    console.error("Lỗi khi tải giảng viên:", error)
    showAlert("Lỗi khi tải dữ liệu Giảng viên", "danger")
  }
}
// Xuất hàm loadInstructors ra window để các file khác có thể truy cập
window.loadInstructors = loadInstructors

// Tải giảng viên theo Trường/Khoa
async function loadInstructorsByDepartment(departmentId) {
  try {
    const response = await fetch(`${API_BASE_URL}/instructors/department/${departmentId}`)
    if (!response.ok) {
      throw new Error("Không thể tải dữ liệu giảng viên theo Trường/Khoa")
    }

    const departmentInstructors = await response.json()

    // Cập nhật bảng giảng viên
    updateInstructorsTable(departmentInstructors)
  } catch (error) {
    console.error("Lỗi khi tải giảng viên theo Trường/Khoa:", error)
    showAlert("Lỗi khi tải dữ liệu Giảng viên theo Trường/Khoa", "danger")
  }
}

// Cập nhật bảng giảng viên
function updateInstructorsTable(instructorsList) {
  const tableBody = document.getElementById("instructors-table-body")
  if (!tableBody) return

  tableBody.innerHTML = ""

  if (instructorsList.length === 0) {
    tableBody.innerHTML = '<tr><td colspan="7" class="text-center">Không có dữ liệu</td></tr>'
  } else {
    instructorsList.forEach((instructor) => {
      const tr = document.createElement("tr")
      tr.innerHTML = `
        <td>${instructor.id}</td>
        <td>${instructor.full_name}</td>
        <td>${instructor.email || "-"}</td>
        <td>${instructor.phone || "-"}</td>
        <td>${instructor.position || "-"}</td>
        <td>${instructor.department_name}</td>
        <td>
          <button class="btn btn-sm btn-info view-instructor-btn" data-instructor-id="${instructor.id}">
            <i class="bi bi-eye"></i>
          </button>
          <button class="btn btn-sm btn-primary edit-instructor-btn" data-instructor-id="${instructor.id}">
            <i class="bi bi-pencil"></i>
          </button>
          <button class="btn btn-sm btn-danger delete-instructor-btn" data-instructor-id="${instructor.id}">
            <i class="bi bi-trash"></i>
          </button>
        </td>
      `
      tableBody.appendChild(tr)
    })

    // Thêm sự kiện lắng nghe cho các nút giảng viên
    document.querySelectorAll(".view-instructor-btn").forEach((button) => {
      button.addEventListener("click", () => {
        const instructorId = button.getAttribute("data-instructor-id")
        viewInstructor(instructorId)
      })
    })

    document.querySelectorAll(".edit-instructor-btn").forEach((button) => {
      button.addEventListener("click", () => {
        const instructorId = button.getAttribute("data-instructor-id")
        editInstructor(instructorId)
      })
    })

    document.querySelectorAll(".delete-instructor-btn").forEach((button) => {
      button.addEventListener("click", () => {
        const instructorId = button.getAttribute("data-instructor-id")
        deleteInstructor(instructorId)
      })
    })
  }
}

// Cập nhật danh sách giảng viên gần đây
function updateRecentInstructorsList() {
  const recentInstructorsList = document.getElementById("recent-instructors-list")
  if (!recentInstructorsList) return

  recentInstructorsList.innerHTML = ""

  if (instructors.length === 0) {
    recentInstructorsList.innerHTML = '<li class="list-group-item">Không có dữ liệu</li>'
  } else {
    // Sắp xếp giảng viên theo created_at (mới nhất trước) và lấy 5 người đầu tiên
    const recentInstructors = [...instructors]
      .sort((a, b) => new Date(b.created_at || 0) - new Date(a.created_at || 0))
      .slice(0, 5)

    recentInstructors.forEach((instructor) => {
      const li = document.createElement("li")
      li.className = "list-group-item"
      li.innerHTML = `
        <div class="d-flex justify-content-between align-items-center">
          <div>
            <strong>${instructor.full_name}</strong>
            <div class="text-muted small">${instructor.department_name}</div>
          </div>
          <button class="btn btn-sm btn-info view-recent-instructor-btn" data-instructor-id="${instructor.id}">
            <i class="bi bi-eye"></i>
          </button>
        </div>
      `
      recentInstructorsList.appendChild(li)
    })

    // Thêm sự kiện lắng nghe cho các nút xem
    document.querySelectorAll(".view-recent-instructor-btn").forEach((button) => {
      button.addEventListener("click", () => {
        const instructorId = button.getAttribute("data-instructor-id")
        showSection("instructors")
        viewInstructor(instructorId)
      })
    })
  }
}

// Cập nhật số lượng Trường/Khoa
function updateDepartmentCounts() {
  // Tạo bản đồ ID Trường/Khoa đến số lượng giảng viên
  const departmentCounts = {}
  instructors.forEach((instructor) => {
    const departmentId = instructor.department_id
    departmentCounts[departmentId] = (departmentCounts[departmentId] || 0) + 1
  })

  // Cập nhật các badge số lượng
  document.querySelectorAll(".department-count").forEach((badge) => {
    const departmentId = badge.getAttribute("data-department-id")
    badge.textContent = departmentCounts[departmentId] || 0
  })
}

// Tải thống kê cho trang chủ
function loadStatistics() {
  // Tổng số giảng viên
  const totalInstructorsElements = document.querySelectorAll("#total-instructors, #total-instructors-dashboard")
  totalInstructorsElements.forEach((element) => {
    if (element) {
      element.textContent = instructors.length
    }
  })

  // Tổng số Trường/Khoa
  const totalDepartmentsElements = document.querySelectorAll("#total-departments, #total-departments-dashboard")
  totalDepartmentsElements.forEach((element) => {
    if (element) {
      element.textContent = departments.length
    }
  })

  // Thêm mới gần đây (trong 30 ngày qua)
  const thirtyDaysAgo = new Date()
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

  const recentAdditions = instructors.filter((instructor) => {
    const createdAt = new Date(instructor.created_at || 0)
    return createdAt >= thirtyDaysAgo
  }).length

  const recentAdditionsElements = document.querySelectorAll("#recent-additions, #recent-additions-dashboard")
  recentAdditionsElements.forEach((element) => {
    if (element) {
      element.textContent = recentAdditions
    }
  })

  // Tính phần trăm tăng trưởng
  const instructorGrowthElement = document.getElementById("instructor-growth")
  if (instructorGrowthElement) {
    const sixtyDaysAgo = new Date()
    sixtyDaysAgo.setDate(sixtyDaysAgo.getDate() - 60)

    const previousMonthAdditions = instructors.filter((instructor) => {
      const createdAt = new Date(instructor.created_at || 0)
      return createdAt >= sixtyDaysAgo && createdAt < thirtyDaysAgo
    }).length

    let growthPercentage = 0
    if (previousMonthAdditions > 0) {
      growthPercentage = Math.round(((recentAdditions - previousMonthAdditions) / previousMonthAdditions) * 100)
    } else if (recentAdditions > 0) {
      growthPercentage = 100
    }

    instructorGrowthElement.textContent = `${growthPercentage}%`
  }

  // Cập nhật biểu đồ nếu ChartUtils tồn tại
  if (window.ChartUtils) {
    window.ChartUtils.updateDepartmentsChart(departments, instructors)
    window.ChartUtils.updateEducationChart(instructors)
    window.ChartUtils.updateStatisticsTable(departments, instructors)
  }

  // Cập nhật bảng giảng viên gần đây trên dashboard
  updateRecentInstructorsTable()
}
// Xuất hàm loadStatistics ra window để các file khác có thể truy cập
window.loadStatistics = loadStatistics

// Thêm hàm mới để cập nhật bảng giảng viên gần đây trên dashboard
function updateRecentInstructorsTable() {
  const recentInstructorsTable = document.getElementById("recent-instructors-table")
  if (!recentInstructorsTable) return

  // Sắp xếp giảng viên theo ngày thêm mới nhất
  const recentInstructors = [...instructors]
    .sort((a, b) => new Date(b.created_at || 0) - new Date(a.created_at || 0))
    .slice(0, 5)

  if (recentInstructors.length === 0) {
    recentInstructorsTable.innerHTML = `
      <tr>
        <td colspan="5" class="text-center">Không có dữ liệu</td>
      </tr>
    `
    return
  }

  recentInstructorsTable.innerHTML = ""

  recentInstructors.forEach((instructor) => {
    const tr = document.createElement("tr")
    const createdDate = instructor.created_at ? new Date(instructor.created_at).toLocaleDateString("vi-VN") : "N/A"

    tr.innerHTML = `
      <td>${instructor.full_name}</td>
      <td>${instructor.email || "N/A"}</td>
      <td>${instructor.department_name || "N/A"}</td>
      <td>${createdDate}</td>
      <td>
        <button class="btn btn-sm btn-info view-instructor-btn" data-instructor-id="${instructor.id}">
          <i class="bi bi-eye"></i>
        </button>
      </td>
    `
    recentInstructorsTable.appendChild(tr)
  })

  // Thêm sự kiện cho các nút xem
  document.querySelectorAll("#recent-instructors-table .view-instructor-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const instructorId = btn.getAttribute("data-instructor-id")
      viewInstructor(instructorId)
    })
  })
}

// Điền dropdown Trường/Khoa
function populateDepartmentDropdown(dropdownId) {
  const dropdown = document.getElementById(dropdownId)
  if (!dropdown) return

  // Giữ tùy chọn đầu tiên và xóa phần còn lại
  const firstOption = dropdown.options[0]
  dropdown.innerHTML = ""
  dropdown.appendChild(firstOption)

  // Thêm tùy chọn Trường/Khoa
  departments.forEach((department) => {
    const option = document.createElement("option")
    option.value = department.id
    option.textContent = department.name
    dropdown.appendChild(option)
  })
}

// Xem chi tiết giảng viên
async function viewInstructor(instructorId) {
  try {
    const response = await fetch(`${API_BASE_URL}/instructors/${instructorId}`)
    if (!response.ok) {
      throw new Error("Không thể tải chi tiết giảng viên")
    }

    const instructor = await response.json()
    currentInstructorId = instructor.id

    // Định dạng ngày bắt đầu công tác
    const joinDate = instructor.join_date
      ? new Date(instructor.join_date).toLocaleDateString("vi-VN")
      : "Không có dữ liệu"

    // Cập nhật modal chi tiết giảng viên
    const instructorDetails = document.getElementById("instructor-details")
    instructorDetails.innerHTML = `
      <div class="row">
        <div class="col-md-6">
          <div class="instructor-detail-item">
            <div class="instructor-detail-label">Họ và tên:</div>
            <div>${instructor.full_name}</div>
          </div>
          <div class="instructor-detail-item">
            <div class="instructor-detail-label">Email:</div>
            <div>${instructor.email || "Không có dữ liệu"}</div>
          </div>
          <div class="instructor-detail-item">
            <div class="instructor-detail-label">Số điện thoại:</div>
            <div>${instructor.phone || "Không có dữ liệu"}</div>
          </div>
          <div class="instructor-detail-item">
            <div class="instructor-detail-label">Chức vụ:</div>
            <div>${instructor.position || "Không có dữ liệu"}</div>
          </div>
        </div>
        <div class="col-md-6">
          <div class="instructor-detail-item">
            <div class="instructor-detail-label">Trường/Khoa:</div>
            <div>${instructor.department_name}</div>
          </div>
          <div class="instructor-detail-item">
            <div class="instructor-detail-label">Trình độ học vấn:</div>
            <div>${instructor.education_level || "Không có dữ liệu"}</div>
          </div>
          <div class="instructor-detail-item">
            <div class="instructor-detail-label">Chuyên ngành:</div>
            <div>${instructor.specialization || "Không có dữ liệu"}</div>
          </div>
          <div class="instructor-detail-item">
            <div class="instructor-detail-label">Ngày bắt đầu công tác:</div>
            <div>${joinDate}</div>
          </div>
        </div>
      </div>
      <div class="row mt-3">
        <div class="col-12">
          <div class="instructor-detail-label">Tiểu sử:</div>
          <div>${instructor.bio || "Không có dữ liệu"}</div>
        </div>
      </div>
    `

    // Thiết lập nút chỉnh sửa
    document.getElementById("edit-instructor-btn").addEventListener("click", () => {
      const instructorModal = window.bootstrap.Modal.getInstance(document.getElementById("instructorModal"))
      instructorModal.hide()
      editInstructor(instructor.id)
    })

    // Hiển thị modal
    const instructorModal = new window.bootstrap.Modal(document.getElementById("instructorModal"))
    instructorModal.show()
  } catch (error) {
    console.error("Lỗi khi tải chi tiết giảng viên:", error)
    showAlert("Lỗi khi tải thông tin chi tiết Giảng viên", "danger")
  }
}

// Chỉnh sửa giảng viên
async function editInstructor(instructorId) {
  try {
    const response = await fetch(`${API_BASE_URL}/instructors/${instructorId}`)
    if (!response.ok) {
      throw new Error("Không thể tải chi tiết giảng viên")
    }

    const instructor = await response.json()
    currentInstructorId = instructor.id

    // Cập nhật tiêu đề form
    document.getElementById("instructor-form-title").textContent = "Chỉnh sửa thông tin Giảng viên"

    // Điền các trường form
    document.getElementById("instructor-id").value = instructor.id
    document.getElementById("instructor-name").value = instructor.full_name
    document.getElementById("instructor-email").value = instructor.email || ""
    document.getElementById("instructor-phone").value = instructor.phone || ""
    document.getElementById("instructor-position").value = instructor.position || ""
    document.getElementById("instructor-specialization").value = instructor.specialization || ""
    document.getElementById("instructor-education").value = instructor.education_level || ""
    document.getElementById("instructor-bio").value = instructor.bio || ""
    document.getElementById("instructor-join-date").value = instructor.join_date
      ? instructor.join_date.split("T")[0]
      : ""

    // Điền dropdown Trường/Khoa
    populateDepartmentDropdown("instructor-department")
    document.getElementById("instructor-department").value = instructor.department_id

    // Hiển thị phần thêm/chỉnh sửa giảng viên
    showSection("addInstructor")
  } catch (error) {
    console.error("Lỗi khi tải giảng viên để chỉnh sửa:", error)
    showAlert("Lỗi khi tải thông tin Giảng viên để chỉnh sửa", "danger")
  }
}

// Lưu giảng viên (tạo hoặc cập nhật)
async function saveInstructor() {
  try {
    const instructorId = document.getElementById("instructor-id").value
    const isUpdate = instructorId !== ""

    const instructorData = {
      department_id: document.getElementById("instructor-department").value,
      full_name: document.getElementById("instructor-name").value,
      email: document.getElementById("instructor-email").value,
      phone: document.getElementById("instructor-phone").value,
      position: document.getElementById("instructor-position").value,
      specialization: document.getElementById("instructor-specialization").value,
      education_level: document.getElementById("instructor-education").value,
      bio: document.getElementById("instructor-bio").value,
      join_date: document.getElementById("instructor-join-date").value || null,
    }

    const url = isUpdate ? `${API_BASE_URL}/instructors/${instructorId}` : `${API_BASE_URL}/instructors`

    const method = isUpdate ? "PUT" : "POST"

    const response = await fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(instructorData),
    })

    if (!response.ok) {
      throw new Error(`Không thể ${isUpdate ? "cập nhật" : "tạo"} giảng viên`)
    }

    // Tải lại giảng viên và hiển thị phần giảng viên
    await loadInstructors()
    showSection("instructors")

    showAlert(`Giảng viên đã được ${isUpdate ? "cập nhật" : "thêm"} thành công`, "success")
  } catch (error) {
    console.error("Lỗi khi lưu giảng viên:", error)
    showAlert(`Lỗi khi ${document.getElementById("instructor-id").value ? "cập nhật" : "thêm"} Giảng viên`, "danger")
  }
}

// Xóa giảng viên
async function deleteInstructor(instructorId) {
  if (!confirm("Bạn có chắc chắn muốn xóa Giảng viên này?")) {
    return
  }

  try {
    const response = await fetch(`${API_BASE_URL}/instructors/${instructorId}`, {
      method: "DELETE",
    })

    if (!response.ok) {
      throw new Error("Không thể xóa giảng viên")
    }

    // Tải lại giảng viên
    await loadInstructors()

    showAlert("Giảng viên đã được xóa thành công", "success")
  } catch (error) {
    console.error("Lỗi khi xóa giảng viên:", error)
    showAlert("Lỗi khi xóa Giảng viên", "danger")
  }
}

// Chỉnh sửa Trường/Khoa
function editDepartment(departmentId) {
  const department = departments.find((d) => d.id == departmentId)
  if (!department) return

  document.getElementById("department-modal-title").textContent = "Chỉnh sửa Trường/Khoa"
  document.getElementById("department-id").value = department.id
  document.getElementById("department-name").value = department.name
  document.getElementById("department-description").value = department.description || ""

  const departmentModal = new window.bootstrap.Modal(document.getElementById("departmentModal"))
  departmentModal.show()
}

// Xác nhận xóa Trường/Khoa
function confirmDeleteDepartment(departmentId) {
  currentDepartmentId = departmentId

  const confirmModal = new window.bootstrap.Modal(document.getElementById("confirmDeleteDepartmentModal"))
  confirmModal.show()
}

// Xóa Trường/Khoa
async function deleteDepartment(departmentId) {
  try {
    const response = await fetch(`${API_BASE_URL}/departments/${departmentId}`, {
      method: "DELETE",
    })

    if (!response.ok) {
      throw new Error("Không thể xóa Trường/Khoa")
    }

    // Đóng modal
    const confirmModal = window.bootstrap.Modal.getInstance(document.getElementById("confirmDeleteDepartmentModal"))
    confirmModal.hide()

    // Tải lại Trường/Khoa và giảng viên
    await loadDepartments()
    await loadInstructors()

    showAlert("Trường/Khoa đã được xóa thành công", "success")
  } catch (error) {
    console.error("Lỗi khi xóa Trường/Khoa:", error)
    showAlert("Lỗi khi xóa Trường/Khoa", "danger")
  }
}

// Lưu Trường/Khoa (tạo hoặc cập nhật)
async function saveDepartment() {
  try {
    const departmentId = document.getElementById("department-id").value
    const isUpdate = departmentId !== ""

    const departmentData = {
      name: document.getElementById("department-name").value,
      description: document.getElementById("department-description").value,
    }

    const url = isUpdate ? `${API_BASE_URL}/departments/${departmentId}` : `${API_BASE_URL}/departments`

    const method = isUpdate ? "PUT" : "POST"

    const response = await fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(departmentData),
    })

    if (!response.ok) {
      throw new Error(`Không thể ${isUpdate ? "cập nhật" : "tạo"} Trường/Khoa`)
    }

    // Đóng modal
    const departmentModal = window.bootstrap.Modal.getInstance(document.getElementById("departmentModal"))
    departmentModal.hide()

    // Tải lại Trường/Khoa
    await loadDepartments()

    showAlert(`Trường/Khoa đã được ${isUpdate ? "cập nhật" : "thêm"} thành công`, "success")
  } catch (error) {
    console.error("Lỗi khi lưu Trường/Khoa:", error)
    showAlert(`Lỗi khi ${document.getElementById("department-id").value ? "cập nhật" : "thêm"} Trường/Khoa`, "danger")
  }
}

// Tìm kiếm giảng viên
async function searchInstructors(query) {
  try {
    const response = await fetch(`${API_BASE_URL}/instructors/search?query=${encodeURIComponent(query)}`)
    if (!response.ok) {
      throw new Error("Không thể tìm kiếm giảng viên")
    }

    const searchResults = await response.json()

    // Cập nhật hiển thị truy vấn tìm kiếm
    document.getElementById("search-query").textContent = query

    // Cập nhật container kết quả tìm kiếm
    const searchResultsContainer = document.getElementById("search-results-container")
    searchResultsContainer.innerHTML = ""

    if (searchResults.length === 0) {
      searchResultsContainer.innerHTML = '<div class="alert alert-info">Không tìm thấy kết quả nào phù hợp.</div>'
    } else {
      const table = document.createElement("table")
      table.className = "table table-striped table-hover"
      table.innerHTML = `
        <thead class="table-primary">
          <tr>
            <th>Họ và tên</th>
            <th>Email</th>
            <th>Chức vụ</th>
            <th>Trường/Khoa</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          ${searchResults
            .map(
              (instructor) => `
            <tr>
              <td>${instructor.full_name}</td>
              <td>${instructor.email || "-"}</td>
              <td>${instructor.position || "-"}</td>
              <td>${instructor.department_name}</td>
              <td>
                <button class="btn btn-sm btn-info view-search-result-btn" data-instructor-id="${instructor.id}">
                  <i class="bi bi-eye"></i>
                </button>
                <button class="btn btn-sm btn-primary edit-search-result-btn" data-instructor-id="${instructor.id}">
                  <i class="bi bi-pencil"></i>
                </button>
              </td>
            </tr>
          `,
            )
            .join("")}
        </tbody>
      `
      searchResultsContainer.appendChild(table)

      // Thêm sự kiện lắng nghe cho các nút kết quả tìm kiếm
      document.querySelectorAll(".view-search-result-btn").forEach((button) => {
        button.addEventListener("click", () => {
          const instructorId = button.getAttribute("data-instructor-id")
          viewInstructor(instructorId)
        })
      })

      document.querySelectorAll(".edit-search-result-btn").forEach((button) => {
        button.addEventListener("click", () => {
          const instructorId = button.getAttribute("data-instructor-id")
          editInstructor(instructorId)
        })
      })
    }

    // Hiển thị phần kết quả tìm kiếm
    showSection("searchResults")
  } catch (error) {
    console.error("Lỗi khi tìm kiếm giảng viên:", error)
    showAlert("Lỗi khi tìm kiếm Giảng viên", "danger")
  }
}

// Đặt lại form giảng viên
function resetInstructorForm() {
  document.getElementById("instructor-form-title").textContent = "Thêm Giảng viên mới"
  document.getElementById("instructor-id").value = ""
  document.getElementById("instructor-name").value = ""
  document.getElementById("instructor-email").value = ""
  document.getElementById("instructor-phone").value = ""
  document.getElementById("instructor-position").value = ""
  document.getElementById("instructor-specialization").value = ""
  document.getElementById("instructor-education").value = ""
  document.getElementById("instructor-bio").value = ""
  document.getElementById("instructor-join-date").value = ""
  document.getElementById("instructor-department").value = ""

  populateDepartmentDropdown("instructor-department")
}

// Hiển thị thông báo
function showAlert(message, type) {
  // Tạo phần tử thông báo
  const alertElement = document.createElement("div")
  alertElement.className = `alert alert-${type} alert-dismissible fade show position-fixed top-0 end-0 m-3`
  alertElement.style.zIndex = "9999"
  alertElement.innerHTML = `
    ${message}
    <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
  `

  // Thêm vào tài liệu
  document.body.appendChild(alertElement)

  // Tự động đóng sau 3 giây
  setTimeout(() => {
    const bsAlert = new window.bootstrap.Alert(alertElement)
    bsAlert.close()
  }, 3000)
}
// Xuất hàm showAlert ra window để các file khác có thể truy cập
window.showAlert = showAlert

// Thêm hàm mới để cập nhật danh sách Trường/Khoa trên dashboard
function updateDepartmentsListDashboard() {
  const departmentsListDashboard = document.getElementById("departments-list-dashboard")
  if (!departmentsListDashboard) return

  departmentsListDashboard.innerHTML = ""

  if (departments.length === 0) {
    departmentsListDashboard.innerHTML = '<li class="list-group-item">Không có dữ liệu</li>'
    return
  }

  departments.forEach((department) => {
    const li = document.createElement("li")
    li.className = "list-group-item d-flex justify-content-between align-items-center"

    // Đếm số lượng giảng viên trong khoa
    const instructorCount = instructors.filter((i) => i.department_id === department.id).length

    li.innerHTML = `
      <div>
        <strong>${department.name}</strong>
        <div class="text-muted small">${department.description || "Không có mô tả"}</div>
      </div>
      <span class="badge bg-primary rounded-pill">${instructorCount}</span>
    `

    departmentsListDashboard.appendChild(li)
  })
}
