// Khởi tạo khi trang được tải
document.addEventListener("DOMContentLoaded", () => {
  // Thiết lập sự kiện cho các nút xuất báo cáo
  setupReportEventListeners()
})

// Thiết lập sự kiện cho các nút xuất báo cáo
function setupReportEventListeners() {
  // Nút xuất báo cáo Excel
  const exportReportExcelBtn = document.getElementById("export-report-excel")
  if (exportReportExcelBtn) {
    exportReportExcelBtn.addEventListener("click", () => exportReport("excel"))
  }

  // Nút xuất báo cáo PDF
  const exportReportPdfBtn = document.getElementById("export-report-pdf")
  if (exportReportPdfBtn) {
    exportReportPdfBtn.addEventListener("click", () => exportReport("pdf"))
  }

  // Nút xuất báo cáo CSV
  const exportReportCsvBtn = document.getElementById("export-report-csv")
  if (exportReportCsvBtn) {
    exportReportCsvBtn.addEventListener("click", () => exportReport("csv"))
  }
}

// Xuất báo cáo
function exportReport(format) {
  const departments = [] // Declare departments variable
  const instructors = [] // Declare instructors variable
  const showAlert = (message, type) => {
    console.log(`Alert (${type}): ${message}`)
  } // Declare showAlert function

  if (!departments || !instructors) {
    showAlert("Không có dữ liệu để xuất báo cáo", "warning")
    return
  }

  try {
    // Tạo dữ liệu thống kê
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
    showAlert("Lỗi khi xuất báo cáo", "danger")
  }
}

// Xuất báo cáo sang Excel
function exportToExcel(data) {
  const XLSX = {} // Declare XLSX variable
  XLSX.utils = {
    book_new: () => {},
    json_to_sheet: (data) => {},
    book_append_sheet: (wb, ws, name) => {},
    writeFile: (wb, filename) => {},
  } // Mock XLSX utils for illustration

  // Tạo workbook mới
  const wb = XLSX.utils.book_new()

  // Tạo worksheet từ dữ liệu
  const ws = XLSX.utils.json_to_sheet(data)

  // Thêm worksheet vào workbook
  XLSX.utils.book_append_sheet(wb, ws, "Thống kê Giảng viên")

  // Xuất file Excel
  XLSX.writeFile(wb, "Thong_ke_Giang_vien.xlsx")
}

// Xuất báo cáo sang CSV
function exportToCSV(data) {
  const XLSX = {} // Declare XLSX variable
  XLSX.utils = {
    json_to_sheet: (data) => {},
    sheet_to_csv: (ws) => {},
  } // Mock XLSX utils for illustration
  const saveAs = (blob, filename) => {
    console.log(`Saving file ${filename}`)
  } // Declare saveAs function

  // Tạo worksheet từ dữ liệu
  const ws = XLSX.utils.json_to_sheet(data)

  // Chuyển đổi worksheet sang chuỗi CSV
  const csv = XLSX.utils.sheet_to_csv(ws)

  // Tạo blob từ chuỗi CSV
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8" })

  // Xuất file CSV
  saveAs(blob, "Thong_ke_Giang_vien.csv")
}
