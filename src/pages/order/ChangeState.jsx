import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import { Row, Col, Button, Select, Card } from 'antd';
import { getOrderById, changeShippingState, changeOrderState } from "../../services/OrderService";

const { Option } = Select;

const ChangeState = () => {
    const { id } = useParams();
    const navigate = useNavigate();  // useNavigate hook
    const [shippingState, setShippingState] = useState('');
    const [orderState, setOrderState] = useState('');
    const [data, setData] = useState({});

    const handleSave = () => 
        navigate('/order-management/orders');
    ;

    const handleCancel = () => {
        navigate(-1); // Navigate back to the previous page
    };

    useEffect(() => {
        getOrderById(id).then(res => {
            setData(res.data);
            setShippingState(res.data.shippingState);
            setOrderState(res.data.state);
        });
    }, [id]);

    const handleChangeShipping = (value) => {
        setShippingState(value);
        changeShippingState(id, value);
    };

    const handleChangeOrder = (value) => {
        setOrderState(value);
        changeOrderState(id, value);
    };

    return (
        <div className="list">
            <div className="listContainer">
                <Card title="Change Order and Shipping State" style={{ maxWidth: '600px', margin: '0 auto', marginTop: '20px' }}>
                    <Row gutter={[16, 16]}>
                        <Col xs={24} sm={12}>
                            <Select
                                value={shippingState}
                                onChange={handleChangeShipping}
                                style={{ width: '100%' }}
                                placeholder="Select Shipping State"
                            >
                                <Option value="NOTSHIPPING">NOTSHIPPING</Option>
                                <Option value="SHIPPING">SHIPPING</Option>
                                <Option value="DELIVERED">DELIVERED</Option>
                                <Option value="RETURNED">RETURNED</Option>
                            </Select>
                        </Col>

                        <Col xs={24} sm={12}>
                            <Select
                                value={orderState}
                                onChange={handleChangeOrder}
                                style={{ width: '100%' }}
                                placeholder="Select Order State"
                            >
                                <Option value="ORDER">ORDER</Option>
                                <Option value="CART">CART</Option>
                                <Option value="PROCESSING">PROCESSING</Option>
                                <Option value="CONFIRMED">CONFIRMED</Option>
                                <Option value="SHIPPING">SHIPPING</Option>
                                <Option value="CANCELED">CANCELED</Option>
                                <Option value="RETURNED">RETURNED</Option>
                                <Option value="COMPLETED">COMPLETED</Option>
                            </Select>
                        </Col>
                    </Row>

                    <Button
                        onClick={handleSave}
                        type="primary"
                        style={{ marginTop: '20px' }}
                    >
                        Save
                    </Button>
                    <Button
                        onClick={handleCancel}  // Handle the Cancel button click
                        type="default"
                        style={{ marginTop: '20px', marginLeft: '10px' }}
                    >
                        Cancel
                    </Button>
                </Card>
            </div>
        </div>
    );
};

export default ChangeState;
