import React, { useEffect, useState, useRef } from 'react'; // Thêm useRef
import { useNavigate, useParams } from 'react-router-dom';
import { Table, Typography, Row, Col, Divider, Button } from 'antd';
import moment from 'moment';
import ReactToPrint from 'react-to-print';
import { PrinterOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const OrderDetail = () => {
  const { id } = useParams();
  const [order, setOrder] = useState({});
  const navigate = useNavigate();
  const componentRef = useRef(); 
 
  {/*Call cái method này */}
  // useEffect(() => {
  //   getOrderById(id).then((res) => {
  //     setOrder(res.data);
  //   });
  // }, [id]);

  // Fake data để mô phỏng
  const fakeOrderData = {
    id: 'ORD123456',
    created: '2024-09-27T10:00:00Z',
    address: '123 Đường ABC',
    ward: 'Phường 1',
    district: 'Quận 2',
    province: 'Thành phố Hồ Chí Minh',
    orderDetails: [
      {
        book: { title: 'Sách A' },
        amount: 2,
        salePrice: 150000,
      },
      {
        book: { title: 'Sách B' },
        amount: 1,
        salePrice: 200000,
      },
      {
        book: { title: 'Sách C' },
        amount: 3,
        salePrice: 100000,
      },
    ],
  };

  useEffect(() => {
    setOrder(fakeOrderData);
  }, []);

  const columns = [
    {
      title: 'Product',
      dataIndex: 'book',
      key: 'book',
      render: (book) => book.title,
    },
    {
      title: 'Qty.',
      dataIndex: 'amount',
      key: 'amount',
      align: 'right',
      render: (amount) => amount.toLocaleString(),
    },
    {
      title: 'Unit',
      dataIndex: 'salePrice',
      key: 'salePrice',
      align: 'right',
      render: (salePrice) => salePrice.toLocaleString(),
    },
    {
      title: 'Sum',
      key: 'sum',
      align: 'right',
      render: (text, record) => (record.amount * record.salePrice).toLocaleString(),
    },
  ];

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '20px' }}>
        <Button
          type="default"
          onClick={() => navigate(-1)}
          style={{
            marginBottom: '20px',
            width: '100px',
            color: 'black',
          }}
          className='bg-gray-100 text-black transition duration-300 hover:bg-gray-300 hover:text-white'
        >
         Back
        </Button>
      </div>

      <div ref={componentRef}> {/* Bọc phần tử chính trong ref */}
        <Title level={3}>Order: {order.id}</Title>

        <Row>
          <Col span={12}>
            <Text strong>Order date:</Text> {moment(order.created).format('DD/MM/YYYY HH:mm:ss')}
          </Col>
        </Row>

        <Row style={{ margin: '10px 0' }}>
          <Col span={12}>
            <Text strong>Address:</Text> {order.address + ', ' + order.ward + ', ' + order.district + ', ' + order.province}
          </Col>
        </Row>

        <Divider />

        <Table
          columns={columns}
          dataSource={order?.orderDetails}
          pagination={false}
          summary={(pageData) => {
            let total = 0;
            pageData.forEach(({ amount, salePrice }) => {
              total += amount * salePrice;
            });

            return (
              <>
                <Table.Summary.Row>
                  <Table.Summary.Cell colSpan={2}>Fee</Table.Summary.Cell>
                  <Table.Summary.Cell align="right">{total.toLocaleString()}</Table.Summary.Cell>
                </Table.Summary.Row>
                <Table.Summary.Row>
                  <Table.Summary.Cell>Shipping</Table.Summary.Cell>
                  <Table.Summary.Cell align="right"></Table.Summary.Cell>
                  <Table.Summary.Cell align="right">30,000</Table.Summary.Cell>
                </Table.Summary.Row>
                <Table.Summary.Row>
                  <Table.Summary.Cell colSpan={2}>
                    <Text strong>Total</Text>
                  </Table.Summary.Cell>
                  <Table.Summary.Cell align="right">
                    <Text strong>{(total + 30000).toLocaleString()}</Text>
                  </Table.Summary.Cell>
                </Table.Summary.Row>
              </>
            );
          }}
        />
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-start', padding: '20px' }}>
        <ReactToPrint
          trigger={() => (
            <Button type="default" style={{ marginLeft: '10px' }}>
              <PrinterOutlined /> Print Invoice
            </Button>
          )}
          content={() => componentRef.current} // Tham chiếu đến phần tử cần in
        />
      </div>
    </div>
  );
};

export default OrderDetail;
