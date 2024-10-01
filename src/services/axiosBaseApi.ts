import axios, { AxiosResponse, AxiosError } from "axios";

// Tạo một instance cho axios
const axiosAPI = axios.create({
  baseURL: "https://otruyenapi.com/v1/api", // URL gốc của API
  timeout: 10000, // Thời gian chờ cho mỗi request (10 giây)
  headers: {
    "Content-Type": "application/json", // Thiết lập Content-Type mặc định
    // Thêm các headers khác nếu cần
  },
});

// Response Interceptor: xử lý phản hồi từ server
axiosAPI.interceptors.response.use(
  (response: AxiosResponse) => {
    // Xử lý dữ liệu trả về
    return response.data; // Trả về chỉ phần `data` của response
  },
  (error: AxiosError) => {
    // Xử lý các lỗi response, bao gồm cả HTTP status code và lỗi mạng
    if (error.response) {
      // Lỗi từ server (4xx, 5xx)
      console.error("Error Response:", error.response.data);
    } else if (error.request) {
      // Không nhận được phản hồi từ server
      console.error("No response received:", error.request);
    } else {
      // Lỗi khi thiết lập request
      console.error("Request setup error:", error.message);
    }

    // Tùy chọn xử lý thêm trước khi trả lỗi về
    return Promise.reject(error);
  }
);

export default axiosAPI;
