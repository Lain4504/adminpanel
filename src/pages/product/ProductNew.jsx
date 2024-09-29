import { Button, Col, Form, Input, Row, Select, Image, Modal } from 'antd';
import React, { useEffect, useState } from 'react';
import { PlusCircleOutlined, DeleteOutlined } from '@ant-design/icons';
import CKEditorComponent from '../../components/CKEditor';
import { useNavigate } from 'react-router-dom';
import { getAllPublishers } from '../../service/PublisherService';
import { getAllAuthors } from '../../service/AuthorService';
import { getAllCollections } from '../../service/CollectionService';
import { addBook } from '../../service/BookService';
const { Option } = Select;

const ProductNew = () => {
  const [publishers, setPublishers] = useState([]);
  const [collections, setCollections] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [error, setError] = useState(false);
  const [data, setData] = useState({
    title: '',
    description: '',
    publisherId: '',
    authors: [],
    collections: [],
    stock: 0,
    isbn: '',
    images: [],
    page: 0,
    weight: 0,
    size: '',
    cover: '',
    price: 0,
    discount: 0,
    sold: 0,
  });

  const [imageLink, setImageLink] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [publishersRes, collectionsRes, authorsRes] = await Promise.all([
          getAllPublishers(),
          getAllCollections(),
          getAllAuthors(),
        ]);
        setPublishers(publishersRes.data);
        setCollections(collectionsRes.data);
        setAuthors(authorsRes.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData(prevData => ({
      ...prevData, // Giữ lại dữ liệu đã nhập trước đó
      [name]: value // Chỉ cập nhật trường đang nhập liệu
    }));
  };
  

  const handleDescriptionChange = (description) => {
    setData(prevData => ({
      ...prevData, // Giữ lại toàn bộ các giá trị khác trong data
      description // Chỉ cập nhật trường description
    }));
  };
  

  const handlePublisherChange = (value) => {
    setData(prevData => ({
      ...prevData,
      publisherId: value // Chỉ cập nhật publisherId
    }));
  };
  
  const handleMultipleObjectChange = (name, objects) => (value) => {
    setData(prevData => ({
      ...prevData,
      [name]: value.map(name => objects.find(object => object.name === name))
    }));
  };
  

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleModalOk = () => {
    if (imageLink) {
      setData(prevData => ({
        ...prevData,
        images: [...(prevData.images || []), { link: imageLink, description: 'Illustration' }]
      }));
      setImageLink('');
      setIsModalVisible(false);
    }
  };
  

  const handleModalCancel = () => {
    setIsModalVisible(false);
  };

  const handleImageLinkChange = (e) => {
    setImageLink(e.target.value);
  };

  const handleDeleteImage = (index) => {
    setData(prevData => ({
      ...prevData,
      images: prevData.images.filter((_, i) => i !== index)
    }));
  };

  const handleSave = async () => {
    try {
      // Perform validations
      if (!data.title.trim()
        || !data.publisherId
        || !data.authors.length || !data.collections.length ||
        !data.isbn.trim()
        || !data.images[0].link.trim()
        || !data.page ||
        !data.stock || !data.weight || !data.size.trim() || !data.cover.trim() || !data.price) {
        setError(true);
        return;
      }

      // Ensure numeric fields are positive
      if (parseInt(data.price) < 0 || parseInt(data.page) < 0 || parseInt(data.stock) < 0 ||
        parseInt(data.weight) < 0 || parseFloat(data.discount) < 0) {
        setError(true);
        return;
      }

      // Convert string values to integers
      setData(prevData => ({
        ...prevData,
        price: parseInt(prevData.price),
        page: parseInt(prevData.page),
        stock: parseInt(prevData.stock),
        weight: parseInt(prevData.weight),
        discount: parseFloat(prevData.discount)
      }));

      console.log('Data is', data);
      // Call the API to add the book
      await addBook(data);
      navigate("/product-management/products");
    } catch (err) {
      setError(true);
      console.error(err);
    }
  };

  return (
    <div className="p-6 bg-gray-100">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h3 className='text-2xl font-semibold mb-6'>Add New Book</h3>
        <div className='flex justify-between mb-4'>
          <Button type='default' onClick={() => navigate("/product-management/products")}>
            Cancel
          </Button>
          <Button type='primary' onClick={handleSave}>
            Save
          </Button>
        </div>
        {error && <div className="text-red-600">Please fill in all required fields correctly!</div>}
        <Form layout='vertical'>
          <Form.Item label="Title" required>
            <Input id="title" name="title" onChange={handleInputChange} />
          </Form.Item>
          <Form.Item label="Description">
            <CKEditorComponent onChange={handleDescriptionChange} />
          </Form.Item>

          <Row gutter={16}>
            <Col xs={24} sm={24} md={12}>
              <Form.Item label="Select Author" required>
                <Select
                  mode="multiple"
                  showSearch
                  placeholder="Select author(s)"
                  optionFilterProp="children"
                  onChange={handleMultipleObjectChange('authors', authors)}
                  allowClear
                  className="w-full"
                >
                  {authors.map(author => (
                    <Option key={author.id} value={author.name}>{author.name}</Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>

            <Col xs={24} sm={24} md={12}>
              <Form.Item label="Select Collection" required>
                <Select
                  mode="multiple"
                  showSearch
                  placeholder="Select collection"
                  optionFilterProp="children"
                  onChange={handleMultipleObjectChange('collections', collections)}
                  allowClear
                  className="w-full"
                >
                  {collections.map(collection => (
                    <Option key={collection.id} value={collection.name}>{collection.name}</Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col xs={24} sm={24} md={12}>
              <Form.Item label="Publisher" >
                <Select
                  placeholder="Select a publisher"
                  allowClear
                  onChange={handlePublisherChange}
                >
                  {publishers.map(publisher => (
                    <Option key={publisher.id} value={publisher.id}>{publisher.name}</Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12}>
              <Form.Item label="Cover Type" required>
                <Input name="cover" onChange={handleInputChange} placeholder="Enter cover type" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col xs={24} sm={24} md={12}>
              <Form.Item label="Size" required>
                <Input name="size" onChange={handleInputChange} placeholder="Enter size" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12}>
              <Form.Item label="ISBN" required>
                <Input id="isbn" name="isbn" onChange={handleInputChange} className="w-full max-w-xs" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col xs={24} sm={24} md={8}>
              <Form.Item label="Pages" required>
                <Input name="page" onChange={handleInputChange} placeholder="Enter total pages" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={8}>
              <Form.Item label="Weight" required>
                <Input name="weight" onChange={handleInputChange} placeholder="Enter weight" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={8}>
              <Form.Item label="Stock" required>
                <Input name="stock" onChange={handleInputChange} placeholder="Enter stock" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={32}>
            <Col xs={24} sm={24} md={12}>
              <Form.Item label="Price" required>
                <Input name="price" onChange={handleInputChange} placeholder="Enter price" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12}>
              <Form.Item label="Discount">
                <Input name="discount" onChange={handleInputChange} placeholder="Enter discount" />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item label="Image Upload" required>
            <Row gutter={16}>
              <Col xs={24} sm={24} md={6}>
                <Button
                  type="text"
                  icon={<PlusCircleOutlined
                    style={{ fontSize: '24px' }}
                    className="hover:text-blue-500 transition duration-150 ease-in-out" />}
                  onClick={showModal}
                />
                <Modal title="Add Image Link" visible={isModalVisible} onOk={handleModalOk} onCancel={handleModalCancel}>
                  <Input value={imageLink} onChange={handleImageLinkChange} placeholder="Enter image URL" />
                </Modal>
              </Col>
              <Col xs={24} sm={24} md={12}>
              <Row gutter={16}>
              {Array.isArray(data.images) && data.images.map((image, index) => (
  <Col xs={12} sm={8} md={6} key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
    <div style={{ position: 'relative', width: '100%' }}>
      <Image src={image.link} alt={`Image ${index}`} width="100%" />
      <Button
        type="text"
        icon={<DeleteOutlined className="hover:text-red-500 transition duration-150 ease-in-out" />}
        onClick={() => handleDeleteImage(index)}
        style={{ position: 'absolute', top: '5px', right: '5px' }}
      />
    </div>
  </Col>
))}

</Row>

              </Col>
            </Row>
          </Form.Item>



        </Form>
      </div>
    </div>
  );
};

export default ProductNew;
