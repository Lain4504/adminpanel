
import { Button, Col, Form, Input, Row, Select, Upload, Image } from 'antd';
import React, { useState } from 'react';
import CKEditorComponent from '../../components/CKEditor';
import { UploadOutlined } from '@ant-design/icons';

const { Option } = Select;

const ProductNew = () => {
  const [fileList, setFileList] = useState([]);

  const handleChange = (info) => {
    let newFileList = [...info.fileList];

    // Filter only images
    newFileList = newFileList.filter(file => file.type.startsWith('image/'));

    setFileList(newFileList);
  };

  const handleRemove = (file) => {
    const newFileList = fileList.filter(item => item.uid !== file.uid);
    setFileList(newFileList);
  };

  const handleSave = () => {
    // Logic to save the book
    console.log('Book details to save:', { fileList });
  };

  return (
    <div className="p-6 bg-gray-100">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h3 className='text-2xl font-semibold mb-6'>Add New Book</h3>
        <div className='flex justify-between mb-4'>
          <Button type='default' onClick={() => console.log('Cancel')}>
            Cancel
          </Button>
          <Button type='primary' onClick={handleSave}>
            Save
          </Button>
        </div>
        <Form layout='vertical'>
          <Form.Item label="Title" required>
            <Input id="title" name="title" />
          </Form.Item>
          <Form.Item label="Description" required>
            <CKEditorComponent />
          </Form.Item>

          <Row gutter={16}>
            <Col xs={24} sm={24} md={12}>
              <Form.Item label="Select Author" rules={[{ required: true, message: 'Please select an author' }]}>
                <Select
                  mode="multiple"
                  showSearch
                  placeholder="Select author(s)"
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    option.children.toLowerCase().includes(input.toLowerCase())
                  }
                  allowClear
                  className="w-full"
                >
                  <Option value="author1">Author 1</Option>
                  <Option value="author2">Author 2</Option>
                  <Option value="author3">Author 3</Option>
                  <Option value="author4">Author 4</Option>
                  <Option value="author5">Author 5</Option>
                </Select>
              </Form.Item>
            </Col>

            <Col xs={24} sm={24} md={12}>
              <Form.Item label="Select Collection" rules={[{ required: true, message: 'Please select a collection' }]}>
                <Select
                  mode="multiple"
                  showSearch
                  placeholder="Select collection"
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    option.children.toLowerCase().includes(input.toLowerCase())
                  }
                  allowClear
                  className="w-full"
                >
                  <Option value="collection1">Collection 1</Option>
                  <Option value="collection2">Collection 2</Option>
                  <Option value="collection3">Collection 3</Option>
                  <Option value="collection4">Collection 4</Option>
                  <Option value="collection5">Collection 5</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col xs={24} sm={24} md={12}>
              <Form.Item label="Publisher" rules={[{ required: true, message: 'Please select a publisher!' }]}>
                <Select placeholder="Select a publisher" allowClear>
                  <Option value="books">Books</Option>
                  <Option value="electronics">Electronics</Option>
                  <Option value="clothing">Clothing</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12}>
              <Form.Item label="Cover Type" rules={[{ required: true, message: 'Please enter a cover type' }]}>
                <Input placeholder="Enter cover type" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col xs={24} sm={24} md={12}>
              <Form.Item label="Size" rules={[{ required: true, message: 'Please enter a size' }]}>
                <Input placeholder="Enter size" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12}>
              <Form.Item label="ISBN" required>
                <Input id="isbn" name="isbn" className="w-full max-w-xs" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col xs={24} sm={24} md={8}>
              <Form.Item label="Pages" rules={[{ required: true, message: 'Please enter total pages' }]}>
                <Input placeholder="Enter total pages" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={8}>
              <Form.Item label="Weight" rules={[{ required: true, message: 'Please enter a weight' }]}>
                <Input placeholder="Enter weight" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={8}>
              <Form.Item label="Stock" rules={[{ required: true, message: 'Please enter stock' }]}>
                <Input placeholder="Enter stock" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={32}>
            <Col xs={24} sm={24} md={12}>
              <Form.Item label="Price" rules={[{ required: true, message: 'Please enter price' }]}>
                <Input placeholder="Enter price" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12}>
              <Form.Item label="Discount" rules={[{ required: true, message: 'Please enter discount' }]}>
                <Input placeholder="Enter discount" />
              </Form.Item>
            </Col>
          </Row>

          <div className="p-4">
            <Upload
              multiple
              accept="image/*"
              fileList={fileList}
              onChange={handleChange}
              onRemove={handleRemove}
            >
              <Button icon={<UploadOutlined />}>Upload Images</Button>
            </Upload>

            <Row gutter={16} className="mt-4">
              {fileList.map(file => (
                <Col xs={8} sm={8} md={8} key={file.uid} className="mb-4">
                  <Image
                    width={100}
                    src={URL.createObjectURL(file.originFileObj)}
                    alt={file.name}
                    preview={false}
                  />
                  <p className="text-sm text-center">{file.name}</p>
                </Col>
              ))}
            </Row>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default ProductNew;

