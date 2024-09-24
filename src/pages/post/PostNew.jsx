import React, { useState, useEffect } from 'react';
import { createPost, getAllPostCategories } from '../../service/PostService';
import { Select, Input, Button, Form, message } from 'antd';
import { getUserInfoByEmail } from '../../service/UserService';
import { useParams } from 'react-router-dom';
import CKEditorComponent from '../../components/CKEditor';

const { Option } = Select;

const PostNew = ({ currentUser }) => {
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState(false);
    const [data, setData] = useState({
        title: "",
        content: "",
        category: {
            id: ""
        },
        brief: "",
        thumbnail: "",
        user: {
            id: ""
        }
    });

    // useEffect(() => {
    //     getAllPostCategories().then((res) => {
    //         setCategories(res.data);
    //     });
    //     getUserInfoByEmail(currentUser.sub)
    //         .then((res) => setData({ ...data, user: { id: res.data.id } }));
    // }, []);

    const handleObjectChange = (value) => {
        setData({
            ...data,
            category: {
                id: Number(value)
            }
        });
    };

    const handleContentChange = (e, editor) => {
        const editorData = editor.getData();
        setData({ ...data, content: editorData });
    };

    const handleCancel = () => {
        window.location.replace("/posts");
    };

    const handleSave = () => {
        createPost(data).then(() => {
            message.success('Post created successfully!');
            window.location.replace("/posts");
        }).catch(() => {
            setError(true);
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
                            onChange={(e) => setData({ ...data, title: e.target.value })}
                        />
                    </Form.Item>
                    <Form.Item label="Brief" required>
                        <Input
                            id="brief"
                            name="brief"
                            value={data.brief}
                            onChange={(e) => setData({ ...data, brief: e.target.value })}
                        />
                    </Form.Item>
                    <Form.Item label="Thumbnail" required>
                        <Input
                            id="thumbnail"
                            name="thumbnail"
                            value={data.thumbnail}
                            onChange={(e) => setData({ ...data, thumbnail: e.target.value })}
                        />
                    </Form.Item>
                    <Form.Item label="Category" required>
                        <Select
                            value={data.category.id || ''}
                            onChange={handleObjectChange}
                            placeholder="--Select category--"
                        >
                            {categories.map(category => (
                                <Option key={category.id} value={category.id}>
                                    {category.name}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item label="Description" required>
                        <CKEditorComponent className='spacing' name={'Description'} editorData={data.content || ''} setEditorData={handleContentChange} />
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};

export default PostNew;
