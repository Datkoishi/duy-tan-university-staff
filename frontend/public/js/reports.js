// Khởi tạo khi trang được tải
document.addEventListener("DOMContentLoaded", () => {
  console.log("Reports.js loaded")
  // Thiết lập sự kiện cho các nút xuất báo cáo
  setupReportEventListeners()

  // Thiết lập sự kiện cho liên kết báo cáo
  const reportsLink = document.getElementById("reports-link")
  if (reportsLink) {
    reportsLink.addEventListener("click", (e) => {
      e.preventDefault()
      console.log("Reports link clicked")
      // Đảm bảo phần báo cáo được hiển thị
      if (typeof window.showSection === "function") {
        window.showSection("reports")
      } else if (window.showSection) {
        window.showSection("reports")
      } else {
        // Fallback nếu hàm showSection không tồn tại
        document.querySelectorAll("section").forEach((section) => {
          section.style.display = "none"
        })
        const reportsSection = document.getElementById("reports-section")
        if (reportsSection) {
          reportsSection.style.display = "block"
        }
      }

      // Cập nhật biểu đồ báo cáo sau một khoảng thời gian ngắn
      setTimeout(() => {
        console.log("Checking for ChartUtils in reports.js")
        console.log("ChartUtils:", window.ChartUtils)
        console.log("departments:", window.departments)
        console.log("instructors:", window.instructors)

        if (window.ChartUtils && window.departments && window.instructors) {
          console.log("Initializing charts from reports.js")
          window.ChartUtils.setupCharts()
          window.ChartUtils.updateDepartmentsChart(window.departments, window.instructors)
          window.ChartUtils.updateEducationChart(window.instructors)
          window.ChartUtils.updateStatisticsTable(window.departments, window.instructors)
        } else {
          console.log("Missing dependencies for charts:", {
            ChartUtils: !!window.ChartUtils,
            departments: !!window.departments,
            instructors: !!window.instructors,
          })
        }
      }, 500)
    })
  }
})

// Thiết lập sự kiện cho các nút xuất báo cáo
function setupReportEventListeners() {
  // Nút xuất báo cáo Excel
  const exportReportExcelBtn = document.getElementById("export-report-excel")
  if (exportReportExcelBtn) {
    exportReportExcelBtn.addEventListener("click", (e) => {
      e.preventDefault()
      exportReport("excel")
    })
  }

  // Nút xuất báo cáo PDF
  const exportReportPdfBtn = document.getElementById("export-report-pdf")
  if (exportReportPdfBtn) {
    exportReportPdfBtn.addEventListener("click", (e) => {
      e.preventDefault()
      exportReport("pdf")
    })
  }

  // Nút xuất báo cáo CSV
  const exportReportCsvBtn = document.getElementById("export-report-csv")
  if (exportReportCsvBtn) {
    exportReportCsvBtn.addEventListener("click", (e) => {
      e.preventDefault()
      exportReport("csv")
    })
  }
}

// Xuất báo cáo
function exportReport(format) {
  if (!window.departments || !window.instructors) {
    window.showAlert("Không có dữ liệu để xu��t báo cáo", "warning")
    return
  }

  try {
    // Tạo dữ liệu thống kê
    const statistics = {}

    // Khởi tạo thống kê cho mỗi Trường/Khoa
    window.departments.forEach((department) => {
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
    window.instructors.forEach((instructor) => {
      const departmentId = instructor.department_id
      const education = instructor.education_level

      if (statistics[departmentId]) {
        statistics[departmentId].total++

        if (education && statistics[departmentId].hasOwnProperty(education)) {
          statistics[departmentId][education]++
        }
      }
    })

    // Tính tổng số lượng giảng viên và từng trình độ học vấn
    const totalStats = {
      name: "Tổng cộng",
      total: 0,
      "Cử nhân": 0,
      "Thạc sĩ": 0,
      "Tiến sĩ": 0,
      "Phó Giáo sư": 0,
      "Giáo sư": 0,
    }

    Object.values(statistics).forEach((stat) => {
      totalStats.total += stat.total
      totalStats["Cử nhân"] += stat["Cử nhân"]
      totalStats["Thạc sĩ"] += stat["Thạc sĩ"]
      totalStats["Tiến sĩ"] += stat["Tiến sĩ"]
      totalStats["Phó Giáo sư"] += stat["Phó Giáo sư"]
      totalStats["Giáo sư"] += stat["Giáo sư"]
    })

    // Chuẩn bị dữ liệu cho báo cáo
    const reportData = [...Object.values(statistics), totalStats]

    // Xuất báo cáo theo định dạng
    if (format === "excel") {
      exportToExcel(reportData)
    } else if (format === "csv") {
      exportToCSV(reportData)
    } else if (format === "pdf") {
      alert("Chức năng xuất PDF đang được phát triển")
    }
  } catch (error) {
    console.error("Lỗi khi xuất báo cáo:", error)
    window.showAlert("Lỗi khi xuất báo cáo", "danger")
  }
}

// Xuất báo cáo sang Excel
function exportToExcel(data) {
  if (!window.XLSX) {
    alert("Thư viện XLSX chưa được tải. Vui lòng thử lại sau.")
    return
  }

  // Tạo workbook mới
  const wb = window.XLSX.utils.book_new()

  // Tạo worksheet từ dữ liệu
  const ws = window.XLSX.utils.json_to_sheet(data)

  // Thêm worksheet vào workbook
  window.XLSX.utils.book_append_sheet(wb, ws, "Thống kê Giảng viên")

  // Xuất file Excel
  window.XLSX.writeFile(wb, "Thong_ke_Giang_vien.xlsx")
}

// Xuất báo cáo sang CSV
function exportToCSV(data) {
  if (!window.XLSX) {
    alert("Thư viện XLSX chưa được tải. Vui lòng thử lại sau.")
    return
  }

  // Tạo worksheet từ dữ liệu
  const ws = window.XLSX.utils.json_to_sheet(data)

  // Chuyển đổi worksheet sang chuỗi CSV
  const csv = window.XLSX.utils.sheet_to_csv(ws)

  // Tạo blob từ chuỗi CSV
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8" })

  // Xuất file CSV
  if (window.saveAs) {
    window.saveAs(blob, "Thong_ke_Giang_vien.csv")
  } else {
    // Fallback nếu không có thư viện FileSaver
    const a = document.createElement("a")
    const url = URL.createObjectURL(blob)
    a.href = url
    a.download = "Thong_ke_Giang_vien.csv"
    document.body.appendChild(a)
    a.click()
    setTimeout(() => {
      document.body.removeChild(a)
      window.URL.revokeObjectURL(url)
    }, 0)
  }
}
