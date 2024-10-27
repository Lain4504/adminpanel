import React, { useEffect, useState } from 'react';
import { Card, Col, Row, Table } from 'antd';
import { Line } from '@ant-design/charts'; 
import axios from 'axios';

const Dashboard = () => {
  const [sales, setSales] = useState({ value: 0, percentageChange: 0 });
  const [earnings, setEarnings] = useState({ value: 0, percentageChange: 0 });
  const [orders, setOrders] = useState({ value: 0, percentageChange: 0 });
  const [users, setUsers] = useState({ value: 0, percentageChange: 0 });
  const [revenueData, setRevenueData] = useState([]);
  const [topSellingProducts, setTopSellingProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const salesResponse = await axios.get('https://localhost:3001/api/chart/total-products-sold-last-7-days');
        const earningsResponse = await axios.get('https://localhost:3001/api/chart/total-revenue-last-7-days');
        const ordersResponse = await axios.get('https://localhost:3001/api/chart/total-orders-last-7-days');
        const newAccountResponse = await axios.get('https://localhost:3001/api/chart/new-users-count-last-7-days');
        const revenueResponse = await axios.get('https://localhost:3001/api/chart/revenue-last-14-days');
        
        setSales(salesResponse.data);
        setEarnings(earningsResponse.data);
        setOrders(ordersResponse.data);
        setUsers(newAccountResponse.data);

        const formattedRevenueData = revenueResponse.data.map(item => ({
          date: new Date(item.date).toLocaleDateString('vi-VN'), 
          totalRevenue: item.totalRevenue,
        }));
        setRevenueData(formattedRevenueData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const fetchTopSellingProducts = async (page = 1, pageSize = 10) => {
    try {
      setLoading(true);
      const topSellingResponse = await axios.get(
        `https://localhost:3001/api/chart/best-selling-products-last-7-days?page=${page}&pageSize=${pageSize}`
      );
      setTopSellingProducts(topSellingResponse.data.items);
      setTotalProducts(topSellingResponse.data.total); // Assuming the API returns total items
      setCurrentPage(page);
    } catch (error) {
      console.error('Error fetching top-selling products:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTopSellingProducts(currentPage);
  }, [currentPage]);

  const topSellingColumns = [
    { title: 'Book ID', dataIndex: 'bookId', key: 'bookId' },
    { title: 'Title', dataIndex: 'title', key: 'title' },
    { title: 'Total Orders', dataIndex: 'totalOrders', key: 'totalOrders' },
    { title: 'Total Amount Sold', dataIndex: 'totalAmountSold', key: 'totalAmountSold' },
  ];

  const handlePageChange = (page) => {
    fetchTopSellingProducts(page);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ padding: '24px' }}>
      <Row gutter={16}>
        <Col span={24} md={6}>
          <Card title="Sales">
            <h1>{sales.totalProductsSold}</h1>
            <p style={{ color: sales.percentageChange < 0 ? 'red' : 'green' }}>
              {sales.percentageChange.toFixed(2)}% Since last week
            </p>
          </Card>
        </Col>
        <Col span={24} md={6}>
          <Card title="Earnings">
            <h1>{earnings.totalRevenue} VND</h1>
            <p style={{ color: earnings.percentageChange < 0 ? 'red' : 'green' }}>
              {earnings.percentageChange.toFixed(2)}% Since last week
            </p>
          </Card>
        </Col>
        <Col span={24} md={6}>
          <Card title="Visitors">
            <h1>{users.newUsersCount}</h1>
            <p style={{ color: users.percentageChange < 0 ? 'red' : 'green' }}>
              {users.percentageChange.toFixed(2)}% Since last week
            </p>
          </Card>
        </Col>
        <Col span={24} md={6}>
          <Card title="Orders">
            <h1>{orders.totalOrders}</h1>
            <p style={{ color: orders.percentageChange < 0 ? 'red' : 'green' }}>
              {orders.percentageChange.toFixed(2)}% Since last week
            </p>
          </Card>
        </Col>
      </Row>
      <Card title="Recent Movement" style={{ marginTop: '24px' }}>
        <Line data={revenueData} xField="date" yField="totalRevenue" smooth />
      </Card>
      <Row gutter={16} style={{ marginTop: '24px' }}>
        <Col span={24}>
          <Card title="Top Selling Products">
            <Table
              dataSource={topSellingProducts}
              columns={topSellingColumns}
              pagination={{
                current: currentPage,
                pageSize: 10,
                total: totalProducts,
                onChange: handlePageChange,
              }}
              rowKey="bookId"
              scroll={{ x: 'max-content' }}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
