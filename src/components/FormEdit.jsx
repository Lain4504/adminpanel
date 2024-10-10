import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { notification, Button, Form, Input, Select } from 'antd';

const { Option } = Select;

const FormEdit = ({ getDataById, updateData, fields, onSuccess, onError }) => {
    const [data, setData] = useState({});
    const { id } = useParams();
    const navigate = useNavigate();

    const handleCancel = () => {
        navigate("/product-management/collections"); 
    };

    const handleSave = async () => {
        try {
            const res = await updateData(id, data);
            if (res.status === 200) { 
                notification.success({
                    message: 'Update Successful',
                    description: res.data.message || 'The data has been successfully updated.', 
                });
                // Chỉ điều hướng sau khi hiển thị thông báo
                setTimeout(() => {
                    onSuccess();
                }, 500); // Thêm một chút thời gian trước khi điều hướng
            } else {
                notification.error({
                    message: 'Update Failed',
                    description: 'An error occurred while updating the data.',
                });
                if (onError) onError();
            }
        } catch (error) {
            notification.error({
                message: 'Update Failed',
                description: 'An error occurred while updating the data.',
            });
            if (onError) onError();
        }
    };
    
    
    
    useEffect(() => {
        const fetchData = async () => {
            const res = await getDataById(id);
            if (Array.isArray(res.data)) {
                setData(res.data[0]); // Chọn phần tử đầu tiên nếu là mảng
            } else {
                setData(res.data); // Nếu không phải mảng, lưu trực tiếp
            }
        };
        fetchData();
    }, [id, getDataById]);
    const handleChange = (fieldId, value) => {
        setData(prevData => ({
            ...prevData,
            [fieldId]: fieldId === 'isDisplay' ? (value === 'true') : value // Convert to boolean for isDisplay
        }));
        console.log(res);

    };
    
    return (
        <div className="min-h-screen bg-gray-100">
            <div className="mx-auto py-10">
                {data && (
                    <div className="bg-white shadow-lg rounded-lg p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-semibold">Update {fields.title}</h3>
                            <div className="flex space-x-4">
                                <Button
                                    onClick={handleCancel}
                                    type="danger"
                                    className="transition bg-gray-400"
                                >
                                    Cancel
                                </Button>
                                <Button
                                    onClick={handleSave}
                                    type="primary"
                                    className="transition"
                                >
                                    Save
                                </Button>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {fields.inputs.map((field) => (
                                <Form.Item 
                                    key={field.id}
                                    label={field.label}
                                    rules={[{ required: true, message: `Please input your ${field.label}!` }]}
                                >
                                    {field.type === 'select' ? (
                                        <Select
                                            id={field.id}
                                            value={data[field.id] !== undefined ? String(data[field.id]) : ''}
                                            onChange={(value) => handleChange(field.id, value)}
                                            className="w-full"
                                        >
                                            {field.options.map(option => (
                                                <Option key={option.value} value={option.value}>
                                                    {option.label}
                                                </Option>
                                            ))}
                                        </Select>
                                    ) : (
                                        <Input
                                            type={field.type}
                                            id={field.id}
                                            value={data[field.id] || ''}
                                            onChange={(e) => handleChange(field.id, e.target.value)}
                                        />
                                    )}
                                </Form.Item>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default FormEdit;
