import React, { useState, useEffect, useContext } from 'react';
import { updatePost, getPostById, getAllPostCategories } from '../../services/PostService';
import { Select, Input, Button, Form, message } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import CKEditorComponent from '../../components/CKEditor';
import { AuthContext } from '../../context/AuthContext';
import { jwtDecode } from 'jwt-decode';

const { Option } = Select;

const PostSingle = () => {
    const { id } = useParams();
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState(false);
    const { currentUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const [data, setData] = useState({
        title: "",
        content: "",
        categoryId: "",
        brief: "",
        thumbnail: "",
        userId: ""
    });

    // Fetch post and categories on mount
    useEffect(() => {
        console.log("Post ID:", id);
        if (id && currentUser) {
            // Proceed with fetching categories and post details
            getAllPostCategories().then((res) => {
                setCategories(res.data);
            });

            getPostById(id).then((res) => {
                const postData = res.data;
                setData({
                    title: postData.title,
                    content: postData.content, 
                    categoryId: postData.categoryId,
                    brief: postData.brief,
                    thumbnail: postData.thumbnail,
                    userId: postData.userId
                });
            }).catch(err => {
                console.error("Error fetching post:", err);
                message.error('Error fetching post.');
            });

            // Decode token if necessary
            try {
                const decoded = jwtDecode(currentUser.token);
                const userId = decoded[Object.keys(decoded).find(key => key.includes("nameidentifier"))];
                console.log("UserID:", userId)
                setData(prevData => ({
                    ...prevData, userId: userId
                }));
            } catch (error) {
                console.error("Error decoding token:", error);
            }
        }
    }, [id, currentUser]);

    // Update state when category is changed
    const handleCategoryChange = (value) => {
        setData((prevData) => ({
            ...prevData,
            categoryId: value
        }));
    };

    // Handle input change
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    // Handle content change for CKEditor
    const handleContentChange = (content) => {
        setData((prevData) => ({
            ...prevData,
            content
        }));
    };

    // Cancel button action
    const handleCancel = () => {
        navigate("/post-management/posts");
    };

    // Save updated post
    const handleSave = async () => {
        try {
            const updatedData = { ...data, id }; 

            console.log("Data to be updated:", updatedData); 
            await updatePost(id, updatedData);
            message.success('Post updated successfully!');
            navigate("/post-management/posts");
        } catch (err) {
            setError(true);
            console.error("Error updating post:", err);
            message.error('Error updating post.');
        }
    };

    return (
        <div className="p-4">
            <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-semibold mb-4">Edit Post</h3>
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
                            {categories.map((category) => (
                                <Option key={category.id} value={category.id}>
                                    {category.name}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item label="Content" required>
                    <CKEditorComponent onChange={handleContentChange} value={data.content} />
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};

export default PostSingle;
