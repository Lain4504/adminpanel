// Dashboard.jsx
import React, { useEffect, useState } from 'react';
import { Card, Col, Row, Table, Tag  } from 'antd';
import { Line } from '@ant-design/charts'; 
import {
  getSalesData,
  getEarningsData,
  getOrdersData,
  getUsersData,
  getRevenueData,
  getTopSellingProducts
} from '../../services/ChartService';
import { DollarOutlined, ShoppingCartOutlined, UserOutlined, BarChartOutlined } from '@ant-design/icons';

const iconStyle = {
  fontSize: '16px', // Larger icon size
  color: '#fff',    // White icon color
  backgroundColor: '#1890ff', // Blue background color
  borderRadius: '50%', // Circular background
  padding: '8px', // Padding around icon to create circle effect
  marginRight: '8px', // Spacing between icon and title text
};

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
  const colors = ['red', 'orange', 'green', 'blue', 'purple'];


  useEffect(() => {
    const fetchData = async () => {
      try {
        const [salesResponse, earningsResponse, ordersResponse, newAccountResponse, revenueResponse] = await Promise.all([
          getSalesData(),
          getEarningsData(),
          getOrdersData(),
          getUsersData(),
          getRevenueData()
        ]);

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
      const topSellingResponse = await getTopSellingProducts(page, pageSize);
      setTopSellingProducts(topSellingResponse.data.items);
      setTotalProducts(topSellingResponse.data.total);
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
    { 
      title: 'Title', 
      dataIndex: 'title', 
      key: 'title',
      render: (title) => (
        <Tag color={colors[Math.floor(Math.random() * colors.length)]}>
          {title}
        </Tag>
      ),
    },
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
          <Card title={<><ShoppingCartOutlined style={iconStyle} /> Sales</>}>
            <h1>{sales.totalProductsSold}</h1>
            <p style={{ color: sales.percentageChange < 0 ? 'red' : 'green' }}>
              {sales.percentageChange.toFixed(2)}% Since last week
            </p>
          </Card>
        </Col>
        <Col span={24} md={6}>
          <Card title={<><DollarOutlined style={iconStyle} /> Earnings</>}>
            <h1>{earnings.totalRevenue} VND</h1>
            <p style={{ color: earnings.percentageChange < 0 ? 'red' : 'green' }}>
              {earnings.percentageChange.toFixed(2)}% Since last week
            </p>
          </Card>
        </Col>
        <Col span={24} md={6}>
          <Card title={<><UserOutlined style={iconStyle} /> Visitors</>}>
            <h1>{users.newUsersCount}</h1>
            <p style={{ color: users.percentageChange < 0 ? 'red' : 'green' }}>
              {users.percentageChange.toFixed(2)}% Since last week
            </p>
          </Card>
        </Col>
        <Col span={24} md={6}>
          <Card title={<><BarChartOutlined style={iconStyle} /> Orders</>}>
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
