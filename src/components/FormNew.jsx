import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { notification, Button, Form, Input, Select } from 'antd';

const { Option } = Select;

const New = ({ inputs, title, handleAdd, location }) => {
  const [data, setData] = useState({});
  const navigate = useNavigate();

  const handleInput = (id, value) => {
    setData({ ...data, [id]: value });
  };

  const handleAddItem = async (values) => {
    try {
      await handleAdd(values);
      notification.success({
        message: 'Success',
        description: 'Item has been successfully added.',
      });
      navigate(location);
    } catch (error) {
      notification.error({
        message: 'Error',
        description: 'An error occurred while adding the item.',
      });
    }
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
        <Form onFinish={handleAddItem} layout="vertical" className="mt-6">
          {inputs.map((input) => (
            <Form.Item 
              key={input.id}
              label={input.label}
              name={input.id}
              rules={[{ required: true, message: `Please input your ${input.label}!` }]}
            >
              {input.type === 'select' ? (
                <Select 
                  onChange={(value) => handleInput(input.id, value)}
                  className="w-full"
                  placeholder={`Select ${input.label}`}
                >
                  {input.options.map((option) => (
                    <Option key={option.value} value={option.value}>
                      {option.label}
                    </Option>
                  ))}
                </Select>
              ) : (
                <Input 
                  type={input.type}
                  placeholder={input.placeholder}
                  onChange={(e) => handleInput(input.id, e.target.value)}
                />
              )}
            </Form.Item>
          ))}
          <div className="flex justify-between mt-4">
            <Button type="primary" htmlType="submit" className="bg-indigo-600 text-white transition">
              Save
            </Button>
            <Button onClick={handleCancel} className="bg-gray-500 text-white transition">
              Cancel
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default New; 