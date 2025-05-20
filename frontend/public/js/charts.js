import { ChartStyle } from "@/components/ui/chart"
import { ChartLegendContent } from "@/components/ui/chart"
import { ChartLegend } from "@/components/ui/chart"
import { ChartTooltipContent } from "@/components/ui/chart"
import { ChartTooltip } from "@/components/ui/chart"
import { ChartContainer } from "@/components/ui/chart"
import { Chart } from "@/components/ui/chart"
// Xóa dòng import đầu tiên
// import {
Chart, ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent, ChartStyle
\
} from "@/components/ui/chart"

// Biến toàn cục cho biểu đồ
let departmentsChart = null
let educationChart = null
let departmentsReportChart = null
let educationReportChart = null

// Khởi tạo biểu đồ
document.addEventListener("DOMContentLoaded", () => {
  // Thiết lập các biểu đồ khi trang được tải
  setupCharts()
})

// Thiết lập các biểu đồ
function setupCharts() {
  // Biểu đồ phân bố giảng viên theo Trường/Khoa
  const departmentsChartCtx = document.getElementById("departmentsChart")
  if (departmentsChartCtx) {
    departmentsChart = new Chart(departmentsChartCtx, {
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
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "top",
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
            },
          },
        },
      },
    })
  }

  // Biểu đồ trình độ học vấn
  const educationChartCtx = document.getElementById("educationChart")
  if (educationChartCtx) {
    educationChart = new Chart(educationChartCtx, {
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
  }

  // Biểu đồ báo cáo phân bố giảng viên theo Trường/Khoa
  const departmentsReportChartCtx = document.getElementById("departmentsReportChart")
  if (departmentsReportChartCtx) {
    departmentsReportChart = new Chart(departmentsReportChartCtx, {
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
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "top",
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
            },
          },
        },
      },
    })
  }

  // Biểu đồ báo cáo trình độ học vấn
  const educationReportChartCtx = document.getElementById("educationReportChart")
  if (educationReportChartCtx) {
    educationReportChart = new Chart(educationReportChartCtx, {
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
  }
}

// Cập nhật biểu đồ phân bố giảng viên theo Trường/Khoa
function updateDepartmentsChart(departments, instructors) {
  if (!departmentsChart) return

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

  // Cập nhật biểu đồ
  departmentsChart.data.labels = labels
  departmentsChart.data.datasets[0].data = data
  departmentsChart.update()

  // Cập nhật biểu đồ báo cáo nếu có
  if (departmentsReportChart) {
    departmentsReportChart.data.labels = labels
    departmentsReportChart.data.datasets[0].data = data
    departmentsReportChart.update()
  }
}

// Cập nhật biểu đồ trình độ học vấn
function updateEducationChart(instructors) {
  if (!educationChart) return

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

  // Cập nhật biểu đồ
  educationChart.data.datasets[0].data = [
    educationCounts["Cử nhân"],
    educationCounts["Thạc sĩ"],
    educationCounts["Tiến sĩ"],
    educationCounts["Phó Giáo sư"],
    educationCounts["Giáo sư"],
  ]
  educationChart.update()

  // Cập nhật biểu đồ báo cáo nếu có
  if (educationReportChart) {
    educationReportChart.data.datasets[0].data = [
      educationCounts["Cử nhân"],
      educationCounts["Thạc sĩ"],
      educationCounts["Tiến sĩ"],
      educationCounts["Phó Giáo sư"],
      educationCounts["Giáo sư"],
    ]
    educationReportChart.update()
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
  const statisticsTable = document.getElementById("statistics-table")
  if (!statisticsTable) return

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
}

// Xuất các hàm để sử dụng trong các file khác
window.ChartUtils = {
  updateDepartmentsChart,
  updateEducationChart,
  updateStatisticsTable,
}
