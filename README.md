### Hệ thống Quản lý Thông tin Giảng viên - Đại học Duy Tân

```markdown project="Duy Tan University Staff Management" file="README.md"
...
```

### Bước 2: Cài đặt các gói phụ thuộc

```shellscript
# Cài đặt các gói phụ thuộc cho backend
cd backend
npm install

# Quay lại thư mục gốc
cd ..
```

### Bước 3: Cấu hình cơ sở dữ liệu

1. Tạo cơ sở dữ liệu MySQL mới


```shellscript
mysql -u root -p
```

2. Trong MySQL CLI, chạy:


```sql
CREATE DATABASE duy_tan_university;
USE duy_tan_university;

-- Tạo bảng departments (các trường/khoa)
CREATE TABLE IF NOT EXISTS departments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tạo bảng instructors (giảng viên)
CREATE TABLE IF NOT EXISTS instructors (
  id INT AUTO_INCREMENT PRIMARY KEY,
  department_id INT NOT NULL,
  full_name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE,
  phone VARCHAR(20),
  position VARCHAR(100),
  specialization VARCHAR(200),
  education_level VARCHAR(50),
  bio TEXT,
  join_date DATE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (department_id) REFERENCES departments(id)
);

-- Thêm dữ liệu mẫu cho các trường/khoa
INSERT INTO departments (name, description) VALUES 
('Trường Đào tạo Quốc tế', 'Chuyên đào tạo các chương trình quốc tế'),
('Trường Du lịch', 'Đào tạo chuyên ngành du lịch và khách sạn'),
('Khoa Quản lý Nam Khuê', 'Chuyên đào tạo về quản lý và kinh doanh'),
('Trường Y Dược', 'Đào tạo các chuyên ngành y khoa và dược phẩm'),
('Trường Công Nghệ', 'Đào tạo các ngành kỹ thuật và công nghệ'),
('Trường Khoa học Máy tính', 'Đào tạo về công nghệ thông tin và khoa học máy tính'),
('Trường Kinh tế', 'Đào tạo các chuyên ngành kinh tế và tài chính');
```

3. Cấu hình biến môi trường:

1. Tạo file `.env` trong thư mục `backend` với nội dung:





```plaintext
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=duy_tan_university
```

### Bước 4: Chạy ứng dụng

```shellscript
# Trong thư mục backend
cd backend
npm run dev
```

Truy cập ứng dụng tại: [http://localhost:3000](http://localhost:3000)

## 📝 Hướng dẫn sử dụng

### Quản lý Giảng viên

1. **Xem danh sách giảng viên**:

1. Nhấp vào "Giảng viên" trên thanh điều hướng
2. Sử dụng bộ lọc để xem giảng viên theo Trường/Khoa



2. **Thêm giảng viên mới**:

1. Nhấp vào "Thêm Giảng viên" trên thanh điều hướng
2. Điền thông tin vào form và nhấn "Lưu"
3. Hoặc sử dụng nút "Điền ngẫu nhiên" để tạo dữ liệu mẫu



3. **Chỉnh sửa giảng viên**:

1. Nhấp vào biểu tượng bút chì bên cạnh giảng viên cần chỉnh sửa
2. Cập nhật thông tin và nhấn "Lưu"



4. **Xóa giảng viên**:

1. Nhấp vào biểu tượng thùng rác bên cạnh giảng viên cần xóa
2. Xác nhận xóa



5. **Tìm kiếm giảng viên**:

1. Sử dụng ô tìm kiếm ở góc trên bên phải
2. Nhập tên, email hoặc chuyên ngành của giảng viên





### Quản lý Trường/Khoa

1. **Xem danh sách Trường/Khoa**:

1. Nhấp vào "Trường/Khoa" trên thanh điều hướng



2. **Thêm Trường/Khoa mới**:

1. Nhấp vào nút "Thêm Trường/Khoa"
2. Điền thông tin và nhấn "Lưu"



3. **Chỉnh sửa Trường/Khoa**:

1. Nhấp vào biểu tượng bút chì bên cạnh Trường/Khoa cần chỉnh sửa
2. Cập nhật thông tin và nhấn "Lưu"



4. **Xóa Trường/Khoa**:

1. Nhấp vào biểu tượng thùng rác bên cạnh Trường/Khoa cần xóa
2. Xác nhận xóa





## 🔌 API Endpoints

### Giảng viên

- `GET /api/instructors` - Lấy tất cả giảng viên
- `GET /api/instructors/:id` - Lấy giảng viên theo ID
- `GET /api/instructors/department/:departmentId` - Lấy giảng viên theo Trường/Khoa
- `GET /api/instructors/search?query=keyword` - Tìm kiếm giảng viên
- `POST /api/instructors` - Thêm giảng viên mới
- `PUT /api/instructors/:id` - Cập nhật giảng viên
- `DELETE /api/instructors/:id` - Xóa giảng viên


### Trường/Khoa

- `GET /api/departments` - Lấy tất cả Trường/Khoa
- `GET /api/departments/:id` - Lấy Trường/Khoa theo ID
- `POST /api/departments` - Thêm Trường/Khoa mới
- `PUT /api/departments/:id` - Cập nhật Trường/Khoa
- `DELETE /api/departments/:id` - Xóa Trường/Khoa


## 🤝 Đóng góp và phát triển

Chúng tôi rất hoan nghênh mọi đóng góp để cải thiện dự án. Để đóng góp:

1. Fork dự án
2. Tạo nhánh tính năng (`git checkout -b feature/amazing-feature`)
3. Commit thay đổi của bạn (`git commit -m 'Add some amazing feature'`)
4. Push lên nhánh (`git push origin feature/amazing-feature`)
5. Mở Pull Request


## 📋 Các tính năng sẽ phát triển trong tương lai

- Xác thực người dùng và phân quyền
- Xuất báo cáo dạng PDF/Excel
- Trang thống kê nâng cao với biểu đồ
- Tải lên ảnh đại diện của giảng viên
- Chế độ tối (Dark Mode)
- Tạo dữ liệu mẫu hàng loạt


## 📄 Giấy phép

Dự án này được phân phối dưới giấy phép MIT. Xem file `LICENSE` để biết thêm chi tiết.

## 👥 Tác giả

- **Datkoishi** - *Phát triển ban đầu* - [GitHub của Đạt](https://github.com/Datkoishi)


## 🙏 Lời cảm ơn

- Đại học Duy Tân đã hỗ trợ và cung cấp thông tin cho dự án
- Tất cả những người đã đóng góp cho dự án


```plaintext

## Hướng dẫn sử dụng README

1. **Thay thế các placeholder**:
   - Thay `https://i.imgur.com/YourBannerImage.png` bằng URL của banner dự án (nếu có)
   - Thay `your-username` trong URL clone bằng tên người dùng GitHub của bạn
   - Thay `your_mysql_password` bằng mật khẩu MySQL thực tế
   - Thay `Tên của bạn` và `GitHub của bạn` bằng thông tin của bạn

2. **Tùy chỉnh nội dung**:
   - Thêm hoặc xóa các tính năng theo dự án thực tế của bạn
   - Cập nhật cấu trúc dự án nếu có thay đổi
   - Điều chỉnh các API endpoints nếu cần

3. **Thêm hình ảnh**:
   - Bạn có thể thêm ảnh chụp màn hình của ứng dụng vào README để minh họa
   - Tạo thư mục `screenshots` trong dự án và lưu ảnh vào đó
   - Thêm đường dẫn đến ảnh trong README

4. **Định dạng**:
   - README sử dụng cú pháp Markdown
   - Các emoji giúp làm nổi bật các phần và tăng tính thẩm mỹ
   - Các tiêu đề được phân cấp rõ ràng để dễ đọc

5. **Lưu và đẩy lên GitHub**:
   - Lưu file README.md vào thư mục gốc của dự án
   - Commit và push lên GitHub repository của bạn

README này cung cấp một tổng quan đầy đủ về dự án, hướng dẫn cài đặt chi tiết, và tài liệu API để người dùng và nhà phát triển khác có thể dễ dàng hiểu và sử dụng dự án của bạn.

<Actions>
  <Action name="Thêm ảnh chụp màn hình vào README" description="Thêm ảnh chụp màn hình của ứng dụng để minh họa" />
  <Action name="Tạo file LICENSE" description="Tạo file LICENSE với giấy phép MIT" />
  <Action name="Thêm hướng dẫn đóng góp" description="Tạo file CONTRIBUTING.md với hướng dẫn đóng góp chi tiết" />
  <Action name="Thêm tài liệu API chi tiết" description="Tạo tài liệu API chi tiết với Swagger hoặc Postman" />
  <Action name="Thêm CI/CD workflow" description="Thiết lập GitHub Actions cho CI/CD" />
</Actions>



```
