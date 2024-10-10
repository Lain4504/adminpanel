import React from 'react';
import { Card, Col, Row, Table } from 'antd';
import { Line, Column } from '@ant-design/charts'; // Importing Column chart for Sale Monthly

const Dashboard = () => {
  // Dữ liệu cho biểu đồ
  const data = [
    { month: 'Jan', value: 2000 },
    { month: 'Feb', value: 2200 },
    { month: 'Mar', value: 2300 },
    { month: 'Apr', value: 2100 },
    { month: 'May', value: 2400 },
    { month: 'Jun', value: 2500 },
    { month: 'Jul', value: 2300 },
    { month: 'Aug', value: 2700 },
    { month: 'Sep', value: 2800 },
    { month: 'Oct', value: 3000 },
    { month: 'Nov', value: 3200 },
    { month: 'Dec', value: 3500 },
  ];

  const config = {
    data,
    xField: 'month',
    yField: 'value',
    smooth: true,
  };

  // Dữ liệu cho bảng "Top Selling Products"
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Company',
      dataIndex: 'company',
      key: 'company',
    },
    {
      title: 'Assigned',
      dataIndex: 'assigned',
      key: 'assigned',
    },
    {
      title: 'Orders',
      dataIndex: 'orders',
      key: 'orders',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <span style={{ color: status === 'In progress' ? 'green' : status === 'Paused' ? 'orange' : 'red' }}>
          {status}
        </span>
      ),
    },
  ];

  const dataSource = [
    {
      key: '1',
      name: 'Aurora',
      company: 'Lechters',
      assigned: 'Vanessa Tucker',
      orders: 520,
      status: 'In progress',
    },
    {
      key: '2',
      name: 'Bender',
      company: 'Cellophane Transportation',
      assigned: 'William Harris',
      orders: 240,
      status: 'Paused',
    },
    {
      key: '3',
      name: 'Camelot',
      company: 'Clemens',
      assigned: 'Darwin',
      orders: 180,
      status: 'In progress',
    },
    {
      key: '4',
      name: 'Edison',
      company: 'Affinity Investment Group',
      assigned: 'Vanessa Tucker',
      orders: 410,
      status: 'Cancelled',
    },
    {
      key: '5',
      name: 'Fusion',
      company: 'Konsili',
      assigned: 'Christina Mason',
      orders: 250,
      status: 'Paused',
    },
  ];

  // Dữ liệu cho bảng "Sale Monthly"
  const saleColumns = [
    {
      title: 'Month',
      dataIndex: 'month',
      key: 'month',
    },
    {
      title: 'Sales',
      dataIndex: 'sales',
      key: 'sales',
    },
  ];

  const saleDataSource = [
    { key: '1', month: 'January', sales: 2000 },
    { key: '2', month: 'February', sales: 2200 },
    { key: '3', month: 'March', sales: 2300 },
    { key: '4', month: 'April', sales: 2100 },
    { key: '5', month: 'May', sales: 2400 },
    { key: '6', month: 'June', sales: 2500 },
    { key: '7', month: 'July', sales: 2300 },
    { key: '8', month: 'August', sales: 2700 },
    { key: '9', month: 'September', sales: 2800 },
    { key: '10', month: 'October', sales: 3000 },
    { key: '11', month: 'November', sales: 3200 },
    { key: '12', month: 'December', sales: 3500 },
  ];

  // Config cho biểu đồ Sale Monthly
  const saleConfig = {
    data: saleDataSource,
    xField: 'month',
    yField: 'sales',
    xAxis: {
      title: {
        text: 'Month',
      },
    },
    yAxis: {
      title: {
        text: 'Sales',
      },
    },
    columnWidthRatio: 0.8, // Width of bars
  };

  return (
    <div style={{ padding: '24px' }}>
      <Row gutter={16}>
        <Col span={24} md={6}>
          <Card title="Sales">
            <h1>2,382</h1>
            <p style={{ color: 'red' }}>-3.65% Since last week</p>
          </Card>
        </Col>
        <Col span={24} md={6}>
          <Card title="Earnings">
            <h1>$21,300</h1>
            <p style={{ color: 'green' }}>+6.65% Since last week</p>
          </Card>
        </Col>
        <Col span={24} md={6}>
          <Card title="Visitors">
            <h1>14,212</h1>
            <p style={{ color: 'green' }}>+5.25% Since last week</p>
          </Card>
        </Col>
        <Col span={24} md={6}>
          <Card title="Orders">
            <h1>64</h1>
            <p style={{ color: 'red' }}>-2.25% Since last week</p>
          </Card>
        </Col>
      </Row>
      <Card title="Recent Movement" style={{ marginTop: '24px' }}>
        <Line {...config} />
      </Card>
      <Row gutter={16} style={{ marginTop: '24px' }}>
        <Col span={24} md={15}> {/* Trên md trở xuống, chiếm 24 cột */}
          <Card title="Top Selling Products">
            <Table 
              dataSource={dataSource} 
              columns={columns} 
              pagination={false} 
              scroll={{ x: 'max-content' }} // Thêm thuộc tính scroll
            />
          </Card>
        </Col>
        <Col span={24} md={9}> {/* Trên md trở xuống, chiếm 24 cột */}
          <Card title="Sale Monthly">
            <Column {...saleConfig} />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
