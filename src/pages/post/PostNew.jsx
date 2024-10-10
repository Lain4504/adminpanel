import React, { useState, useEffect, useContext } from 'react';
import { createPost, getAllPostCategories } from '../../service/PostService';
import { Select, Input, Button, Form, message } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import CKEditorComponent from '../../components/CKEditor';
import { AuthContext } from '../../context/AuthContext';
import { jwtDecode } from 'jwt-decode';

const { Option } = Select;

const PostNew = () => {
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState(false);
    const { currentUser } = useContext(AuthContext);
    const navigate = useNavigate()
    const [data, setData] = useState({
        title: "",
        content: "",
        categoryId: "",
        brief: "",
        thumbnail: "",
        userId: ""
    });

    useEffect(() => {
        getAllPostCategories().then((res) => {
            setCategories(res.data);
        });
        if (currentUser) {
            try {
                const decoded = jwtDecode(currentUser.token);
                const userId = decoded[Object.keys(decoded).find(key => key.includes("nameidentifier"))];
                console.log("User id:", userId);
                setData(prevData => ({
                    ...prevData, userId: userId 
                }));
            } catch (error) {
                console.error("Error decoding token:", error);
            }
        }
    }, [currentUser]);

    const handleCategoryChange = (value) => {
        setData(prevData => ({
          ...prevData,
          categoryId: value 
        }));
      };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setData(prevData => ({
            ...prevData, // Giữ lại dữ liệu đã nhập trước đó
            [name]: value // Chỉ cập nhật trường đang nhập liệu
        }));
    };

    const handleContentChange = (content) => {
        setData(prevData => ({
            ...prevData, // Giữ lại toàn bộ các giá trị khác trong data
            content // Chỉ cập nhật trường content
        }));
    };

    const handleCancel = () => 
        navigate("/post-management/posts");
    ;

    const handleSave = () => {
        console.log("Data to be saved:", data); // Log data before sending to createPost
        createPost(data).then(() => {
            message.success('Post created successfully!');
            navigate("/post-management/posts");
        }).catch((err) => {
            setError(true);
            console.error("Error creating post:", err); // Log error details
            message.error('Error creating post.');
        });
    };

    return (
        <div className="p-4">
            <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-semibold mb-4">Add Posts</h3>
                <div className="flex justify-between mb-4">
                    <Button type="default" onClick={handleCancel}>Cancel</Button>
                    <Button type="primary" onClick={handleSave}>Save</Button>
                </div>
                <Form layout="vertical">
                    <Form.Item label="Title" required>
                        <Input
                            id="title"
                            name="title"
                            value={data.title}
                            onChange={handleInputChange}
                        />
                    </Form.Item>
                    <Form.Item label="Brief" required>
                        <Input
                            id="brief"
                            name="brief"
                            value={data.brief}
                            onChange={handleInputChange}
                        />
                    </Form.Item>
                    <Form.Item label="Thumbnail (link image)" required>
                        <Input
                            id="thumbnail"
                            name="thumbnail"
                            value={data.thumbnail}
                            onChange={handleInputChange}
                        />
                    </Form.Item>
                    <Form.Item label="Category" required>
                        <Select
                            value={data.categoryId || ''}
                            onChange={handleCategoryChange}
                            placeholder="--Select category--"
                        >
                            {categories.map(category => (
                                <Option key={category.id} value={category.id}>
                                    {category.name}
                                </Option>
                            ))}
                            
                        </Select>
                    </Form.Item>
                    <Form.Item label="Content" required>
                        <CKEditorComponent onChange={handleContentChange} />
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};

export default PostNew;
