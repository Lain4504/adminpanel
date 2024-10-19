import { Button, Col, Form, Input, Row, Select, Image, Modal } from 'antd';
import React, { useEffect, useState } from 'react';
import { PlusCircleOutlined, DeleteOutlined } from '@ant-design/icons';
import CKEditorComponent from '../../components/CKEditor';
import { useNavigate, useParams } from 'react-router-dom';
import { getAllPublishers } from '../../service/PublisherService';
import { addBookToAuthor, getAllAuthors, removeAuthorFromBook } from '../../service/AuthorService';
import { getAllCollections, removeCollectionFromBook } from '../../service/CollectionService';
import { getBookById, updateBook, getBookCollectionsByBookId, addBookToCollection, getAuthorByBookId } from '../../service/BookService';
const { Option } = Select;

const ProductSingle = () => {
  const { id } = useParams(); // Get the book ID from the URL
  const [publishers, setPublishers] = useState([]);
  const [collections, setCollections] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [error, setError] = useState(false);
  const [data, setData] = useState({
    title: '',
    description: '',
    publisherId: '',
    authorIds: [],
    collectionIds: [],
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
  const [previousAuthorIds, setPreviousAuthorIds] = useState([]);
  const [previousCollectionIds, setPreviousCollectionIds] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [publishersRes, collectionsRes, authorsRes, bookRes, bookCollectionsRes, authorBookRes] = await Promise.all([
          getAllPublishers(),
          getAllCollections(),
          getAllAuthors(),
          getBookById(id),
          getBookCollectionsByBookId(id),
          getAuthorByBookId(id)
        ]);
        setPublishers(publishersRes.data);
        setCollections(collectionsRes.data);
        setAuthors(authorsRes.data);
        setData(bookRes.data);
        console.log("author:",authorBookRes)
        console.log("collection:",bookCollectionsRes)
        // Set the collection IDs and names in the state based on the fetched collections
        const collectionIds = bookCollectionsRes.data.map(collection => collection.collectionId);
        const authorIds = authorBookRes.data.map(author => author.authorId);
        setPreviousAuthorIds(authorIds);
        setPreviousCollectionIds(collectionIds);
  
        setData(prevData => ({
          ...prevData,
          collectionIds,
          authorIds,
        }));
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, [id]);


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleDescriptionChange = (description) => {
    setData(prevData => ({
      ...prevData,
      description
    }));
  };

  const handlePublisherChange = (value) => {
    setData(prevData => ({
      ...prevData,
      publisherId: value
    }));
  };

  const handleMultipleCollectionChange = (value) => {
    const updatedCollectionIds = value.map(name => 
        collections.find(collection => collection.name === name)?.id
    ).filter(id => id); 

    setData(prevData => ({
        ...prevData,
        collectionIds: updatedCollectionIds
    }));
    // Log the updated collection IDs after setting the state
    console.log('Updated Collection IDs:', updatedCollectionIds);
};
  const handleMultipleAuthorChange = (value) =>{
    const updatedAuthorIds = value.map(name =>
      authors.find(author => author.name === name)?.id
    ).filter(id => id);
    setData(prevData =>({
      ...prevData,
      authorIds: updatedAuthorIds
    }));
    console.log("Update author ID:", updatedAuthorIds )
  }
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
      console.log('Before Save - Collection IDs:', data.collectionIds);
      console.log('Before Save - Author IDs', data.authorIds);
      const removedAuthors = previousAuthorIds.filter(id => !data.authorIds.includes(id));
      const removedCollections = previousCollectionIds.filter(id => !data.collectionIds.includes(id));
      
  
      // Perform validations
      if (!data.title.trim() || !data.publisherId ||
       !data.authorIds.length ||
        !data.collectionIds.length || !data.isbn.trim() || !data.images[0]?.link.trim() ||
        !data.page || !data.stock || !data.weight || !data.size.trim() ||
        !data.cover.trim() || !data.price) {
        setError(true);
        return;
      }

      // Ensure numeric fields are positive
      if (parseInt(data.price) < 0 || parseInt(data.page) < 0 ||
        parseInt(data.stock) < 0 || parseInt(data.weight) < 0 ||
        parseFloat(data.discount) < 0) {
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
      const updatedData = { ...data, id };
      const response = await updateBook(id, updatedData);

      if (response.status === 200) {
        await Promise.all(removedAuthors.map(async (authorId) => {
          try {
            await removeAuthorFromBook(id, authorId); // Hàm xóa author
          } catch (error) {
            console.error(`Failed to remove author ${authorId} from book ${id}`, error);
          }
        }));
    
        await Promise.all(removedCollections.map(async (collectionId) => {
          try {
            await removeCollectionFromBook(id, collectionId); // Hàm xóa collection
          } catch (error) {
            console.error(`Failed to remove collection ${collectionId} from book ${id}`, error);
          }
        }));

        await Promise.all(data.authorIds.map(async (authorId) =>{
          try{
            await addBookToAuthor(id, authorId);
          }catch (error){
            console.log(`Failed to add book ${id} with author ${authorId}`, error);
          }
        }));
        await Promise.all(data.collectionIds.map(async (collectionId) => {
          try {
            await addBookToCollection(id, collectionId); // Ensure you use the correct ID
          } catch (error) {
            console.error(`Failed to add book ${id} to collection ${collectionId}`, error);
          }
        }));
        navigate("/product-management/products");
      } else {
        setError(true);
        console.error('Failed to update book:', response.data);
      }
    } catch (err) {
      setError(true);
      console.error(err);
    }
  };

  return (
    <div className="p-6 bg-gray-100">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h3 className='text-2xl font-semibold mb-6'>Edit Book</h3>
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
            <Input id="title" name="title" value={data.title} onChange={handleInputChange} />
          </Form.Item>
          <Form.Item label="Description">
            <CKEditorComponent value={data.description} onChange={handleDescriptionChange} />
          </Form.Item>

          <Row gutter={16}>
            <Col xs={24} sm={24} md={12}>
              <Form.Item label="Select Author" required>
                <Select
                  mode="multiple"
                  showSearch
                  placeholder="Select author(s)"
                  optionFilterProp="children"
                  onChange={handleMultipleAuthorChange}
                  allowClear
                  className="w-full"
                  value={data.authorIds.map(id => authors.find(author => author.id === id)?.name)}
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
                  onChange={handleMultipleCollectionChange}
                  allowClear
                  className="w-full"
                  value={data.collectionIds.map(id => collections.find(collection => collection.id === id)?.name)}
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
              <Form.Item label="Publisher">
                <Select
                  placeholder="Select a publisher"
                  allowClear
                  onChange={handlePublisherChange}
                  value={data.publisherId}
                >
                  {publishers.map(publisher => (
                    <Option key={publisher.id} value={publisher.id}>{publisher.name}</Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12}>
              <Form.Item label="Cover Type" required>
                <Input name="cover" value={data.cover} onChange={handleInputChange} placeholder="Enter cover type" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col xs={24} sm={24} md={12}>
              <Form.Item label="Size" required>
                <Input name="size" value={data.size} onChange={handleInputChange} placeholder="Enter size" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12}>
              <Form.Item label="ISBN" required>
                <Input name="isbn" value={data.isbn} onChange={handleInputChange} placeholder="Enter ISBN" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col xs={24} sm={24} md={8}>
              <Form.Item label="Stock" required>
                <Input type="number" name="stock" value={data.stock} onChange={handleInputChange} placeholder="Enter stock" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={8}>
              <Form.Item label="Page Count" required>
                <Input type="number" name="page" value={data.page} onChange={handleInputChange} placeholder="Enter page count" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={8}>
              <Form.Item label="Weight (kg)" required>
                <Input type="number" name="weight" value={data.weight} onChange={handleInputChange} placeholder="Enter weight" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col xs={24} sm={24} md={8}>
              <Form.Item label="Price" required>
                <Input type="number" name="price" value={data.price} onChange={handleInputChange} placeholder="Enter price" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={8}>
              <Form.Item label="Discount (%)" required>
                <Input type="number" name="discount" value={data.discount} onChange={handleInputChange} placeholder="Enter discount" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={8}>
              <Form.Item label="Sold Count" required>
                <Input type="number" name="sold" value={data.sold} onChange={handleInputChange} placeholder="Enter sold count" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col xs={24}>
              <Form.Item label="Image Links" required>
                <div className="flex flex-col">
                  <div className="flex items-center mb-2">

                    <Button
                      type="dashed"
                      onClick={showModal}
                      icon={<PlusCircleOutlined />}
                      className="ml-2"
                    >
                      Add Image
                    </Button>
                  </div>
                  <div className="flex flex-wrap">
                    {data.images.map((image, index) => (
                      <div key={index} className="relative mr-4 mb-4">
                        <Image width={100} height={150} src={image.link} alt={image.description} />
                        <DeleteOutlined
                          onClick={() => handleDeleteImage(index)}
                          className="absolute top-0 right-0 text-red-500 cursor-pointer"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </div>

      <Modal title="Add Image" visible={isModalVisible} onOk={handleModalOk} onCancel={handleModalCancel}>
        <Input value={imageLink} onChange={handleImageLinkChange} placeholder="Enter image link" />
      </Modal>
    </div>
  );
};

export default ProductSingle;
