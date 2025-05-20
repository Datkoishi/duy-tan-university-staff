// Biến toàn cục cho biểu đồ
let departmentsChart = null
let educationChart = null
let departmentsReportChart = null
let educationReportChart = null

// Khởi tạo biểu đồ
document.addEventListener("DOMContentLoaded", () => {
  console.log("Charts.js loaded")
  // Thiết lập các biểu đồ khi trang được tải
  setupCharts()

  // Thiết lập sự kiện cho nút làm mới dashboard
  const refreshDashboardBtn = document.getElementById("refresh-dashboard-btn")
  if (refreshDashboardBtn) {
    refreshDashboardBtn.addEventListener("click", () => {
      if (window.loadStatistics) {
        window.loadStatistics()
      }
    })
  }

  // Thiết lập sự kiện cho liên kết báo cáo
  const reportsLink = document.getElementById("reports-link")
  if (reportsLink) {
    reportsLink.addEventListener("click", () => {
      setTimeout(() => {
        setupCharts()
        if (window.departments && window.instructors) {
          updateDepartmentsChart(window.departments, window.instructors)
          updateEducationChart(window.instructors)
          updateStatisticsTable(window.departments, window.instructors)
        }
      }, 300)
    })
  }
})

// Thiết lập các biểu đồ
function setupCharts() {
  console.log("Setting up charts...")

  // Biểu đồ phân bố giảng viên theo Trường/Khoa
  const departmentsChartCtx = document.getElementById("departmentsChart")
  if (departmentsChartCtx) {
    console.log("Found departmentsChart element")
    if (departmentsChart) {
      departmentsChart.destroy()
    }
    departmentsChart = new window.Chart(departmentsChartCtx, {
      type: "bar",
      data: {
        labels: [],
        datasets: [
          {
            label: "Số lượng giảng viên",
            data: [],
            backgroundColor: "rgba(79, 70, 229, 0.7)",
            borderColor: "rgba(79, 70, 229, 1)",
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false, // Thay đổi thành false để biểu đồ điều chỉnh theo container
        // aspectRatio: 2, // Bỏ tỷ lệ khía cạnh vì chúng ta đã đặt chiều cao cố định
        plugins: {
          legend: {
            position: "top",
            display: false, // Ẩn legend để tiết kiệm không gian
          },
          tooltip: {
            mode: "index",
            intersect: false,
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              precision: 0,
              font: {
                size: 10, // Thu nhỏ font chữ
              },
            },
            suggestedMax: 10, // Giới hạn trục y mặc định là 10
          },
          x: {
            ticks: {
              font: {
                size: 10, // Thu nhỏ font chữ
              },
              maxRotation: 45, // Xoay nhãn để tiết kiệm không gian
              minRotation: 45,
            },
          },
        },
        layout: {
          padding: {
            left: 5,
            right: 5,
            top: 0,
            bottom: 0,
          },
        },
        barThickness: 15, // Thu nhỏ độ dày của cột
      },
    })
  } else {
    console.log("departmentsChart element not found")
  }

  // Biểu đồ trình độ học vấn
  const educationChartCtx = document.getElementById("educationChart")
  if (educationChartCtx) {
    console.log("Found educationChart element")
    if (educationChart) {
      educationChart.destroy()
    }
    educationChart = new window.Chart(educationChartCtx, {
      type: "doughnut",
      data: {
        labels: ["Cử nhân", "Thạc sĩ", "Tiến sĩ", "Phó Giáo sư", "Giáo sư"],
        datasets: [
          {
            data: [0, 0, 0, 0, 0],
            backgroundColor: [
              "rgba(14, 165, 233, 0.7)",
              "rgba(79, 70, 229, 0.7)",
              "rgba(16, 185, 129, 0.7)",
              "rgba(245, 158, 11, 0.7)",
              "rgba(239, 68, 68, 0.7)",
            ],
            borderColor: [
              "rgba(14, 165, 233, 1)",
              "rgba(79, 70, 229, 1)",
              "rgba(16, 185, 129, 1)",
              "rgba(245, 158, 11, 1)",
              "rgba(239, 68, 68, 1)",
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "right",
          },
          tooltip: {
            callbacks: {
              label: (context) => {
                const label = context.label || ""
                const value = context.raw || 0
                const total = context.dataset.data.reduce((a, b) => a + b, 0)
                const percentage = total > 0 ? Math.round((value / total) * 100) : 0
                return `${label}: ${value} (${percentage}%)`
              },
            },
          },
        },
      },
    })
  } else {
    console.log("educationChart element not found")
  }

  // Biểu đồ báo cáo phân bố giảng viên theo Trường/Khoa
  const departmentsReportChartCtx = document.getElementById("departmentsReportChart")
  if (departmentsReportChartCtx) {
    console.log("Found departmentsReportChart element")
    if (departmentsReportChart) {
      departmentsReportChart.destroy()
    }
    departmentsReportChart = new window.Chart(departmentsReportChartCtx, {
      type: "bar",
      data: {
        labels: [],
        datasets: [
          {
            label: "Số lượng giảng viên",
            data: [],
            backgroundColor: "rgba(79, 70, 229, 0.7)",
            borderColor: "rgba(79, 70, 229, 1)",
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false, // Thay đổi thành false để biểu đồ điều chỉnh theo container
        // aspectRatio: 2.5, // Bỏ tỷ lệ khía cạnh vì chúng ta đã đặt chiều cao cố định
        plugins: {
          legend: {
            position: "top",
            display: false, // Ẩn legend để tiết kiệm không gian
          },
          tooltip: {
            mode: "index",
            intersect: false,
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              precision: 0,
              font: {
                size: 10, // Thu nhỏ font chữ
              },
            },
            suggestedMax: 10, // Giới hạn trục y mặc định là 10
          },
          x: {
            ticks: {
              font: {
                size: 10, // Thu nhỏ font chữ
              },
              maxRotation: 45, // Xoay nhãn để tiết kiệm không gian
              minRotation: 45,
            },
          },
        },
        layout: {
          padding: {
            left: 5,
            right: 5,
            top: 0,
            bottom: 0,
          },
        },
        barThickness: 15, // Thu nhỏ độ dày của cột
      },
    })
  } else {
    console.log("departmentsReportChart element not found")
  }

  // Biểu đồ báo cáo trình độ học vấn
  const educationReportChartCtx = document.getElementById("educationReportChart")
  if (educationReportChartCtx) {
    console.log("Found educationReportChart element")
    if (educationReportChart) {
      educationReportChart.destroy()
    }
    educationReportChart = new window.Chart(educationReportChartCtx, {
      type: "pie",
      data: {
        labels: ["Cử nhân", "Thạc sĩ", "Tiến sĩ", "Phó Giáo sư", "Giáo sư"],
        datasets: [
          {
            data: [0, 0, 0, 0, 0],
            backgroundColor: [
              "rgba(14, 165, 233, 0.7)",
              "rgba(79, 70, 229, 0.7)",
              "rgba(16, 185, 129, 0.7)",
              "rgba(245, 158, 11, 0.7)",
              "rgba(239, 68, 68, 0.7)",
            ],
            borderColor: [
              "rgba(14, 165, 233, 1)",
              "rgba(79, 70, 229, 1)",
              "rgba(16, 185, 129, 1)",
              "rgba(245, 158, 11, 1)",
              "rgba(239, 68, 68, 1)",
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "right",
          },
          tooltip: {
            callbacks: {
              label: (context) => {
                const label = context.label || ""
                const value = context.raw || 0
                const total = context.dataset.data.reduce((a, b) => a + b, 0)
                const percentage = total > 0 ? Math.round((value / total) * 100) : 0
                return `${label}: ${value} (${percentage}%)`
              },
            },
          },
        },
      },
    })
  } else {
    console.log("educationReportChart element not found")
  }
}

// Cập nhật biểu đồ phân bố giảng viên theo Trường/Khoa
function updateDepartmentsChart(departments, instructors) {
  console.log("Updating departments chart...")
  console.log("Departments:", departments)
  console.log("Instructors:", instructors)

  // Tạo bản đồ ID Trường/Khoa đến số lượng giảng viên
  const departmentCounts = {}
  instructors.forEach((instructor) => {
    const departmentId = instructor.department_id
    departmentCounts[departmentId] = (departmentCounts[departmentId] || 0) + 1
  })

  // Chuẩn bị dữ liệu cho biểu đồ
  const labels = []
  const data = []

  departments.forEach((department) => {
    labels.push(department.name)
    data.push(departmentCounts[department.id] || 0)
  })

  console.log("Chart labels:", labels)
  console.log("Chart data:", data)

  // Thêm đoạn code này vào cuối hàm, trước khi cập nhật biểu đồ
  // Tìm giá trị lớn nhất trong dữ liệu
  const maxValue = Math.max(...data, 1) // Đảm bảo ít nhất là 1
  const suggestedMax = Math.ceil(maxValue * 1.2) // Thêm 20% không gian trên cùng

  // Cập nhật giới hạn trục y cho cả hai biểu đồ
  if (departmentsChart) {
    departmentsChart.options.scales.y.suggestedMax = suggestedMax
    // Phần cập nhật dữ liệu giữ nguyên
    departmentsChart.data.labels = labels
    departmentsChart.data.datasets[0].data = data
    departmentsChart.update()
    console.log("Dashboard chart updated with suggestedMax:", suggestedMax)
  }

  if (departmentsReportChart) {
    departmentsReportChart.options.scales.y.suggestedMax = suggestedMax
    // Phần cập nhật dữ liệu giữ nguyên
    departmentsReportChart.data.labels = labels
    departmentsReportChart.data.datasets[0].data = data
    departmentsReportChart.update()
    console.log("Report chart updated with suggestedMax:", suggestedMax)
  }
}

// Cập nhật biểu đồ trình độ học vấn
function updateEducationChart(instructors) {
  console.log("Updating education chart...")

  // Đếm số lượng giảng viên theo trình độ học vấn
  const educationCounts = {
    "Cử nhân": 0,
    "Thạc sĩ": 0,
    "Tiến sĩ": 0,
    "Phó Giáo sư": 0,
    "Giáo sư": 0,
  }

  instructors.forEach((instructor) => {
    const education = instructor.education_level
    if (education && educationCounts.hasOwnProperty(education)) {
      educationCounts[education]++
    }
  })

  const educationData = [
    educationCounts["Cử nhân"],
    educationCounts["Thạc sĩ"],
    educationCounts["Tiến sĩ"],
    educationCounts["Phó Giáo sư"],
    educationCounts["Giáo sư"],
  ]

  console.log("Education data:", educationData)

  // Cập nhật biểu đồ dashboard
  if (educationChart) {
    educationChart.data.datasets[0].data = educationData
    educationChart.update()
    console.log("Dashboard education chart updated")
  } else {
    console.log("Dashboard education chart not initialized")
  }

  // Cập nhật biểu đồ báo cáo
  if (educationReportChart) {
    educationReportChart.data.datasets[0].data = educationData
    educationReportChart.update()
    console.log("Report education chart updated")
  } else {
    console.log("Report education chart not initialized")
  }

  // Cập nhật số lượng giảng viên có trình độ cao nhất
  const highestEducation = educationCounts["Phó Giáo sư"] + educationCounts["Giáo sư"]
  const highestEducationElement = document.getElementById("highest-education")
  if (highestEducationElement) {
    highestEducationElement.textContent = highestEducation
  }
}

// Cập nhật bảng thống kê
function updateStatisticsTable(departments, instructors) {
  console.log("Updating statistics table...")
  const statisticsTable = document.getElementById("statistics-table")
  if (!statisticsTable) {
    console.log("Statistics table element not found")
    return
  }

  // Tạo bản đồ thống kê
  const statistics = {}

  // Khởi tạo thống kê cho mỗi Trường/Khoa
  departments.forEach((department) => {
    statistics[department.id] = {
      name: department.name,
      total: 0,
      "Cử nhân": 0,
      "Thạc sĩ": 0,
      "Tiến sĩ": 0,
      "Phó Giáo sư": 0,
      "Giáo sư": 0,
    }
  })

  // Đếm số lượng giảng viên theo Trường/Khoa và trình độ học vấn
  instructors.forEach((instructor) => {
    const departmentId = instructor.department_id
    const education = instructor.education_level

    if (statistics[departmentId]) {
      statistics[departmentId].total++

      if (education && statistics[departmentId].hasOwnProperty(education)) {
        statistics[departmentId][education]++
      }
    }
  })

  // Cập nhật bảng thống kê
  statisticsTable.innerHTML = ""

  // Thêm hàng cho mỗi Trường/Khoa
  Object.values(statistics).forEach((stat) => {
    const tr = document.createElement("tr")
    tr.innerHTML = `
      <td>${stat.name}</td>
      <td>${stat.total}</td>
      <td>${stat["Cử nhân"]}</td>
      <td>${stat["Thạc sĩ"]}</td>
      <td>${stat["Tiến sĩ"]}</td>
      <td>${stat["Phó Giáo sư"]}</td>
      <td>${stat["Giáo sư"]}</td>
    `
    statisticsTable.appendChild(tr)
  })

  // Thêm hàng tổng cộng
  const totalRow = document.createElement("tr")
  totalRow.className = "table-primary fw-bold"

  const totalStats = {
    total: 0,
    "Cử nhân": 0,
    "Thạc sĩ": 0,
    "Tiến sĩ": 0,
    "Phó Giáo sư": 0,
    "Giáo sư": 0,
  }

  // Tính tổng số lượng giảng viên và từng trình độ học vấn
  Object.values(statistics).forEach((stat) => {
    totalStats.total += stat.total
    totalStats["Cử nhân"] += stat["Cử nhân"]
    totalStats["Thạc sĩ"] += stat["Thạc sĩ"]
    totalStats["Tiến sĩ"] += stat["Tiến sĩ"]
    totalStats["Phó Giáo sư"] += stat["Phó Giáo sư"]
    totalStats["Giáo sư"] += stat["Giáo sư"]
  })

  // Thêm dữ liệu vào hàng tổng cộng
  totalRow.innerHTML = `
    <td>Tổng cộng</td>
    <td>${totalStats.total}</td>
    <td>${totalStats["Cử nhân"]}</td>
    <td>${totalStats["Thạc sĩ"]}</td>
    <td>${totalStats["Tiến sĩ"]}</td>
    <td>${totalStats["Phó Giáo sư"]}</td>
    <td>${totalStats["Giáo sư"]}</td>
  `
  statisticsTable.appendChild(totalRow)
  console.log("Statistics table updated")
}

// Xuất các hàm để sử dụng trong các file khác
window.ChartUtils = {
  setupCharts: setupCharts,
  updateDepartmentsChart: updateDepartmentsChart,
  updateEducationChart: updateEducationChart,
  updateStatisticsTable: updateStatisticsTable,
}
