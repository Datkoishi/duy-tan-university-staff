/**
 * Script tự động điền thông tin ngẫu nhiên vào form giảng viên
 * Có thể được chạy từ console hoặc thêm vào dự án như một tính năng
 */

// Hàm tạo dữ liệu ngẫu nhiên
const AutoFill = {
  // Danh sách họ phổ biến ở Việt Nam
  firstNames: [
    "Nguyễn",
    "Trần",
    "Lê",
    "Phạm",
    "Hoàng",
    "Huỳnh",
    "Phan",
    "Vũ",
    "Võ",
    "Đặng",
    "Bùi",
    "Đỗ",
    "Hồ",
    "Ngô",
    "Dương",
    "Lý",
    "Đào",
    "Đinh",
    "Mai",
    "Trịnh",
  ],

  // Danh sách tên đệm và tên phổ biến ở Việt Nam
  middleAndLastNames: [
    "Văn Anh",
    "Thị An",
    "Quốc Bảo",
    "Minh Châu",
    "Thanh Duy",
    "Thị Hà",
    "Văn Hải",
    "Quang Huy",
    "Thị Hương",
    "Văn Khoa",
    "Thị Lan",
    "Quốc Minh",
    "Thị Ngọc",
    "Văn Nam",
    "Thị Phương",
    "Quang Quân",
    "Thị Quỳnh",
    "Văn Sơn",
    "Thị Thảo",
    "Quốc Tuấn",
    "Thị Tuyết",
    "Văn Vũ",
    "Thị Xuân",
    "Quang Yên",
    "Thị Yến",
    "Minh Đức",
    "Thị Đào",
    "Quốc Đạt",
    "Văn Đông",
    "Thị Hồng",
    "Quang Hùng",
    "Thị Mai",
    "Văn Mạnh",
    "Thị Nga",
    "Quốc Phong",
    "Thị Thủy",
    "Văn Thành",
    "Thị Thúy",
    "Quang Trung",
    "Thị Vân",
    "Văn Vinh",
    "Thị Xuyến",
    "Quốc Bình",
  ],

  // Danh sách tên miền email phổ biến
  emailDomains: [
    "gmail.com",
    "yahoo.com",
    "hotmail.com",
    "outlook.com",
    "duytan.edu.vn",
    "icloud.com",
    "live.com",
    "mail.com",
    "protonmail.com",
    "zoho.com",
  ],

  // Danh sách chức vụ
  positions: [
    "Giảng viên",
    "Giảng viên chính",
    "Giảng viên cao cấp",
    "Trợ giảng",
    "Phó trưởng bộ môn",
    "Trưởng bộ môn",
    "Phó trưởng khoa",
    "Trưởng khoa",
    "Phó hiệu trưởng",
    "Hiệu trưởng",
    "Nghiên cứu viên",
    "Giảng viên thỉnh giảng",
    "Giảng viên kiêm nhiệm",
    "Giảng viên hướng dẫn",
    "Giáo vụ khoa",
  ],

  // Danh sách chuyên ngành
  specializations: [
    "Công nghệ thông tin",
    "Khoa học máy tính",
    "Kỹ thuật phần mềm",
    "Hệ thống thông tin",
    "Mạng máy tính",
    "Trí tuệ nhân tạo",
    "An toàn thông tin",
    "Khoa học dữ liệu",
    "Quản trị kinh doanh",
    "Tài chính - Ngân hàng",
    "Kế toán",
    "Marketing",
    "Kinh tế quốc tế",
    "Du lịch",
    "Khách sạn",
    "Nhà hàng",
    "Quản trị dịch vụ du lịch và lữ hành",
    "Y khoa",
    "Dược học",
    "Điều dưỡng",
    "Y tế công cộng",
    "Răng - Hàm - Mặt",
    "Xây dựng",
    "Kiến trúc",
    "Cơ khí",
    "Điện - Điện tử",
    "Tự động hóa",
    "Ngôn ngữ Anh",
    "Ngôn ngữ Trung",
    "Ngôn ngữ Nhật",
    "Ngôn ngữ Hàn",
    "Luật",
    "Quan hệ quốc tế",
    "Báo chí",
    "Truyền thông đa phương tiện",
  ],

  // Danh sách các đoạn văn mẫu cho tiểu sử
  bioTemplates: [
    "Tốt nghiệp {degree} chuyên ngành {specialization} tại {university}. Có {experience} năm kinh nghiệm giảng dạy và nghiên cứu trong lĩnh vực {field}.",
    "Chuyên gia trong lĩnh vực {specialization} với {experience} năm kinh nghiệm. Đã công bố {publications} bài báo khoa học trên các tạp chí uy tín trong và ngoài nước.",
    "Tham gia giảng dạy tại Đại học Duy Tân từ năm {startYear}. Hướng nghiên cứu chính: {field}. Đã hướng dẫn {students} sinh viên bảo vệ thành công luận văn tốt nghiệp.",
    "Tốt nghiệp {degree} tại {university}. Từng làm việc tại {company} trước khi trở thành giảng viên tại Đại học Duy Tân. Chuyên môn sâu về {specialization}.",
    "Có {experience} năm kinh nghiệm trong lĩnh vực {field}. Đã tham gia {projects} dự án nghiên cứu cấp trường và cấp nhà nước. Lĩnh vực nghiên cứu: {specialization}.",
    "Tốt nghiệp {degree} tại {university}. Đã có {publications} công trình nghiên cứu được công bố. Giảng dạy các môn: {subjects}.",
    "Chuyên gia hàng đầu về {specialization}. Đã tham gia nhiều hội thảo quốc tế và là thành viên của {organization}. Có {experience} năm kinh nghiệm giảng dạy.",
  ],

  // Danh sách trường đại học
  universities: [
    "Đại học Quốc gia Hà Nội",
    "Đại học Bách Khoa Hà Nội",
    "Đại học Quốc gia TP.HCM",
    "Đại học Bách Khoa TP.HCM",
    "Đại học Duy Tân",
    "Đại học Đà Nẵng",
    "Đại học Huế",
    "Đại học Cần Thơ",
    "Đại học Ngoại thương",
    "Đại học Kinh tế Quốc dân",
    "Học viện Công nghệ Bưu chính Viễn thông",
    "Đại học Sư phạm Hà Nội",
    "Đại học Y Hà Nội",
    "Đại học Khoa học Tự nhiên",
    "Đại học Xây dựng",
    "Đại học Ngoại ngữ",
    "Đại học Luật Hà Nội",
    "Đại học Kinh tế TP.HCM",
    "Đại học Sư phạm TP.HCM",
    "Đại học Y Dược TP.HCM",
  ],

  // Danh sách công ty/tổ chức
  companies: [
    "Tập đoàn FPT",
    "Viettel",
    "VNG",
    "VNPT",
    "MobiFone",
    "Samsung Việt Nam",
    "Intel Việt Nam",
    "Microsoft Việt Nam",
    "IBM Việt Nam",
    "Vingroup",
    "Masan Group",
    "Techcombank",
    "Vietcombank",
    "Viện Hàn lâm Khoa học Việt Nam",
    "Bộ Khoa học và Công nghệ",
    "Bộ Giáo dục và Đào tạo",
    "Bộ Y tế",
    "Viện Nghiên cứu Cao cấp về Toán",
    "Viện Công nghệ Thông tin",
  ],

  // Danh sách tổ chức học thuật
  organizations: [
    "Hội Tin học Việt Nam",
    "Hội Toán học Việt Nam",
    "Hội Vật lý Việt Nam",
    "Hội Hóa học Việt Nam",
    "Hội Điện tử Việt Nam",
    "Hội Tự động hóa Việt Nam",
    "Hội Kỹ sư Xây dựng Việt Nam",
    "Hội Kiến trúc sư Việt Nam",
    "IEEE",
    "ACM",
  ],

  // Danh sách môn học
  subjects: [
    "Lập trình cơ bản",
    "Cấu trúc dữ liệu và giải thuật",
    "Cơ sở dữ liệu",
    "Mạng máy tính",
    "Hệ điều hành",
    "Trí tuệ nhân tạo",
    "Học máy",
    "Phân tích thiết kế hệ thống",
    "Công nghệ phần mềm",
    "An toàn thông tin",
    "Điện toán đám mây",
    "Internet vạn vật",
    "Kinh tế vĩ mô",
    "Kinh tế vi mô",
    "Marketing căn bản",
    "Quản trị học",
    "Tài chính doanh nghiệp",
    "Kế toán quản trị",
    "Quản trị nhân lực",
    "Quản trị chuỗi cung ứng",
    "Thương mại điện tử",
    "Giải phẫu học",
    "Sinh lý học",
    "Dược lý học",
    "Vi sinh y học",
    "Y học cộng đồng",
    "Vật lý đại cương",
    "Hóa học đại cương",
    "Toán cao cấp",
    "Xác suất thống kê",
    "Tiếng Anh chuyên ngành",
    "Kỹ năng giao tiếp",
    "Phương pháp nghiên cứu khoa học",
  ],

  // Hàm tạo họ tên ngẫu nhiên
  generateFullName: function () {
    const firstName = this.getRandomItem(this.firstNames)
    const middleAndLastName = this.getRandomItem(this.middleAndLastNames)
    return `${firstName} ${middleAndLastName}`
  },

  // Hàm tạo email ngẫu nhiên từ tên
  generateEmail: function (fullName) {
    // Nếu không có tên, tạo một tên ngẫu nhiên
    if (!fullName) {
      fullName = this.generateFullName()
    }

    // Chuyển đổi tên thành định dạng email
    const nameParts = fullName.toLowerCase().split(" ")
    const lastName = nameParts.pop()
    const firstInitials = nameParts.map((part) => part.charAt(0)).join("")

    const emailDomain = this.getRandomItem(this.emailDomains)
    const randomNumber = Math.floor(Math.random() * 1000)

    return `${lastName}${firstInitials}${randomNumber}@${emailDomain}`
  },

  // Hàm tạo số điện thoại ngẫu nhiên (định dạng Việt Nam)
  generatePhoneNumber: function () {
    const prefixes = [
      "032",
      "033",
      "034",
      "035",
      "036",
      "037",
      "038",
      "039", // Viettel
      "070",
      "076",
      "077",
      "078",
      "079", // Mobifone
      "081",
      "082",
      "083",
      "084",
      "085",
      "086",
      "088",
      "089", // Vinaphone
      "090",
      "091",
      "092",
      "093",
      "094",
      "096",
      "097",
      "098",
      "099",
    ] // Các mạng khác

    const prefix = this.getRandomItem(prefixes)
    const suffix = Math.floor(Math.random() * 10000000)
      .toString()
      .padStart(7, "0")

    return `${prefix}${suffix}`
  },

  // Hàm tạo ngày bắt đầu công tác ngẫu nhiên (trong khoảng 1-30 năm trước)
  generateJoinDate: () => {
    const now = new Date()
    const yearsAgo = Math.floor(Math.random() * 30) + 1 // 1-30 năm trước
    const randomDate = new Date(
      now.getFullYear() - yearsAgo,
      Math.floor(Math.random() * 12),
      Math.floor(Math.random() * 28) + 1,
    )

    return randomDate.toISOString().split("T")[0] // Định dạng YYYY-MM-DD
  },

  // Hàm tạo tiểu sử ngẫu nhiên
  generateBio: function (specialization) {
    const template = this.getRandomItem(this.bioTemplates)

    // Nếu không có chuyên ngành, tạo một chuyên ngành ngẫu nhiên
    if (!specialization) {
      specialization = this.getRandomItem(this.specializations)
    }

    const degree = this.getRandomItem(["Cử nhân", "Thạc sĩ", "Tiến sĩ", "Phó Giáo sư", "Giáo sư"])
    const university = this.getRandomItem(this.universities)
    const experience = Math.floor(Math.random() * 30) + 5 // 5-35 năm
    const field = this.getRandomItem(this.specializations)
    const publications = Math.floor(Math.random() * 50) + 1 // 1-50 bài báo
    const startYear = 2023 - (Math.floor(Math.random() * 30) + 1) // 1-30 năm trước
    const students = Math.floor(Math.random() * 100) + 1 // 1-100 sinh viên
    const company = this.getRandomItem(this.companies)
    const projects = Math.floor(Math.random() * 20) + 1 // 1-20 dự án
    const organization = this.getRandomItem(this.organizations)

    // Tạo danh sách môn học ngẫu nhiên
    const subjectCount = Math.floor(Math.random() * 4) + 2 // 2-5 môn
    const subjectList = []
    for (let i = 0; i < subjectCount; i++) {
      const subject = this.getRandomItem(this.subjects)
      if (!subjectList.includes(subject)) {
        subjectList.push(subject)
      }
    }
    const subjects = subjectList.join(", ")

    // Thay thế các placeholder trong template
    return template
      .replace("{degree}", degree)
      .replace("{specialization}", specialization)
      .replace("{university}", university)
      .replace("{experience}", experience)
      .replace("{field}", field)
      .replace("{publications}", publications)
      .replace("{startYear}", startYear)
      .replace("{students}", students)
      .replace("{company}", company)
      .replace("{projects}", projects)
      .replace("{organization}", organization)
      .replace("{subjects}", subjects)
  },

  // Hàm lấy một phần tử ngẫu nhiên từ mảng
  getRandomItem: (array) => array[Math.floor(Math.random() * array.length)],

  // Hàm điền form với dữ liệu ngẫu nhiên
  fillForm: function () {
    // Tạo dữ liệu ngẫu nhiên
    const fullName = this.generateFullName()
    const email = this.generateEmail(fullName)
    const phone = this.generatePhoneNumber()
    const position = this.getRandomItem(this.positions)
    const specialization = this.getRandomItem(this.specializations)
    const education = this.getRandomItem(["Cử nhân", "Thạc sĩ", "Tiến sĩ", "Phó Giáo sư", "Giáo sư"])
    const joinDate = this.generateJoinDate()
    const bio = this.generateBio(specialization)

    // Điền vào form
    document.getElementById("instructor-name").value = fullName
    document.getElementById("instructor-email").value = email
    document.getElementById("instructor-phone").value = phone
    document.getElementById("instructor-position").value = position
    document.getElementById("instructor-specialization").value = specialization

    // Chọn trình độ học vấn từ dropdown
    const educationSelect = document.getElementById("instructor-education")
    for (let i = 0; i < educationSelect.options.length; i++) {
      if (educationSelect.options[i].value === education) {
        educationSelect.selectedIndex = i
        break
      }
    }

    // Chọn ngẫu nhiên một Trường/Khoa từ dropdown
    const departmentSelect = document.getElementById("instructor-department")
    if (departmentSelect.options.length > 1) {
      const randomIndex = Math.floor(Math.random() * (departmentSelect.options.length - 1)) + 1
      departmentSelect.selectedIndex = randomIndex
    }

    document.getElementById("instructor-join-date").value = joinDate
    document.getElementById("instructor-bio").value = bio

    console.log("Đã điền thông tin ngẫu nhiên vào form!")
  },
}

// Thiết lập sự kiện khi trang được tải
document.addEventListener("DOMContentLoaded", () => {
  // Thêm sự kiện cho nút "Điền ngẫu nhiên"
  const fillRandomDataBtn = document.getElementById("fill-random-data-btn")
  if (fillRandomDataBtn) {
    fillRandomDataBtn.addEventListener("click", () => {
      AutoFill.fillForm()
    })
  }
})

// Để sử dụng từ console, chạy:
// AutoFill.fillForm();
