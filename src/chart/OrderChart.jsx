import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';
import { getAllOrders } from '../service/OrderService';
// Đăng ký các thành phần của Chart.js
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const OrderChart = () => {
  const [orderData, setOrderData] = useState([]);

  useEffect(() => {
    // Gọi API để lấy dữ liệu từ backend
    const fetchData = async () => {
      try {
        const response = await getAllOrders();
        setOrderData(response.data);
      } catch (error) {
        console.error('Lỗi khi lấy dữ liệu từ API', error);
      }
    };

    fetchData();
  }, []);

  // Xử lý dữ liệu cho biểu đồ
  const processDataForChart = () => {
    const labels = orderData.map((order) => `Order ${order.id}`);
    const totalPrices = orderData.map((order) => order.totalPrice);

    return {
      labels,
      datasets: [
        {
          label: 'Tổng tiền của mỗi Order',
          data: totalPrices,
          backgroundColor: 'rgba(75, 192, 192, 0.6)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
        },
      ],
    };
  };

  const options = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div>
      <h2>Biểu đồ tổng tiền của các đơn hàng</h2>
      <Bar data={processDataForChart()} options={options} />
    </div>
  );
};

export default OrderChart;
