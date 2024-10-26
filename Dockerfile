# Dockerfile cho Project1
FROM node:18-alpine as build

# Thư mục làm việc
WORKDIR /app

# Sao chép package.json và cài đặt dependencies
COPY package*.json ./
RUN npm install

# Sao chép toàn bộ mã nguồn
COPY . .

# Expose port
EXPOSE 5000

# Khởi chạy Vite ở chế độ phát triển
CMD ["npm", "run", "dev", "--", "--host"]
