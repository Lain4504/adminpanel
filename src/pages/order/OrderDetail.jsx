import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Table, Typography, Divider, Button, Row, Col } from 'antd';
import ReactToPrint from 'react-to-print';
import { PrinterOutlined } from '@ant-design/icons';
import { getOrderDetailByOrderId, getOrderById } from '../../service/OrderService';
import { getBookById } from '../../service/BookService';
const { Title, Text } = Typography;

const OrderDetail = () => {
  const { id } = useParams();
  const [orderDetails, setOrderDetails] = useState([]);
  const [orderInfo, setOrderInfo] = useState(null); 
  const navigate = useNavigate();
  const componentRef = useRef();

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        // Fetch order info
        const orderResponse = await getOrderById(id);
        setOrderInfo(orderResponse.data); // Store order info (address, etc.)

        // Fetch order details
        const detailsResponse = await getOrderDetailByOrderId(id);
        const details = detailsResponse.data;

        // Fetch book titles and images
        const detailsWithTitlesAndImages = await Promise.all(
          details.map(async (detail) => {
            const bookResponse = await getBookById(detail.bookId);
            return {
              ...detail,
              bookTitle: bookResponse.data.title,
              imageLink: bookResponse.data.images?.[0]?.link || '', // Get the first image if available
            };
          })
        );

        setOrderDetails(detailsWithTitlesAndImages);
      } catch (error) {
        console.error('Error fetching order details:', error);
      }
    };

    fetchOrderDetails();
  }, [id]);

  const columns = [
    {
      title: 'Book Title',
      key: 'bookTitle',
      render: (text, record) => (
        <div className="flex items-center space-x-2">
          <img
            src={record.imageLink}
            alt={record.bookTitle}
            style={{ width: '50px', height: '50px', objectFit: 'cover', marginRight: '10px' }}
          />
          <span>{record.bookTitle}</span>
        </div>
      ),
    },
    {
      title: 'Qty.',
      dataIndex: 'amount',
      key: 'amount',
      align: 'right',
      render: (amount) => amount.toLocaleString(),
    },
    {
      title: 'Unit Price',
      dataIndex: 'salePrice',
      key: 'salePrice',
      align: 'right',
      render: (salePrice) => salePrice.toLocaleString(),
    },
    {
      title: 'Total',
      key: 'total',
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
          className="bg-gray-100 text-black transition duration-300 hover:bg-gray-300 hover:text-white"
        >
          Back
        </Button>
      </div>

      <div ref={componentRef}>
        <Title level={3}>Order Details</Title>
        {orderInfo && (
          <>
            <Row>
              <Col span={12}>
                <Text strong>Order Date: </Text>
                {new Date(orderInfo.created).toLocaleDateString()} {/* Display formatted order date */}
              </Col>
            </Row>
            <Row style={{ margin: '10px 0' }}>
              <Col span={12}>
                <Text strong>Address: </Text>
                {`${orderInfo.address}, ${orderInfo.ward}, ${orderInfo.district}, ${orderInfo.province}`} {/* Display address */}
              </Col>
            </Row>
            <Divider />
          </>
        )}

        <Table
          columns={columns}
          dataSource={orderDetails}
          pagination={false}
          summary={(pageData) => {
            let total = 0;
            pageData.forEach(({ amount, salePrice }) => {
              total += amount * salePrice;
            });

            return (
              <>
                <Table.Summary.Row>
                  <Table.Summary.Cell colSpan={3}>Total Amount</Table.Summary.Cell>
                  <Table.Summary.Cell align="right">{total.toLocaleString()}</Table.Summary.Cell>
                </Table.Summary.Row>
                <Table.Summary.Row>
                  <Table.Summary.Cell colSpan={3}>Shipping</Table.Summary.Cell>
                  <Table.Summary.Cell align="right">{orderInfo?.shippingPrice?.toLocaleString() || '30,000'}</Table.Summary.Cell> {/* Use shipping price from orderInfo */}
                </Table.Summary.Row>
                <Table.Summary.Row>
                  <Table.Summary.Cell colSpan={3}>
                    <Text strong>Grand Total</Text>
                  </Table.Summary.Cell>
                  <Table.Summary.Cell align="right">
                    <Text strong>{(total + (orderInfo?.shippingPrice || 30000)).toLocaleString()}</Text>
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
          content={() => componentRef.current}
        />
      </div>
    </div>
  );
};

export default OrderDetail;
