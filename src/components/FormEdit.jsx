import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { notification, Button } from 'antd';

const FormEdit = ({ getDataById, updateData, fields, onSuccess, onError }) => {
    const [data, setData] = useState({});
    const { id } = useParams();
    const [error, setError] = useState(false);

    const handleCancel = () => {
        window.location.replace("/collections"); 
    };

    const handleSave = () => {
        updateData(id, data).then(res => {
            if (res.status === 204) {
                onSuccess();
            } else {
                setError(true);
                notification.error({
                    message: 'Update Failed',
                    description: 'An error occurred while updating the data.',
                });
                if (onError) onError();
            }
        }).catch(error => {
            setError(true);
            notification.error({
                message: 'Update Failed',
                description: 'An error occurred while updating the data.',
            });
            if (onError) onError();
        });
    };
    
    useEffect(() => {
        getDataById(id).then((res) => {
            setData(res.data);
        });
    }, [id, getDataById]);

    const handleChange = (e) => {
        const { id, value, type, checked } = e.target;
        setData(prevData => ({
            ...prevData,
            [id]: type === 'checkbox' ? checked : id === 'isDisplay' ? value === 'true' : value
        }));
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
                                <div key={field.id}>
                                    <label className="block text-sm font-medium text-gray-700">{field.label}</label>
                                    {field.type === 'select' ? (
                                        <select
                                            id={field.id}
                                            value={data[field.id]}
                                            onChange={handleChange}
                                            className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        >
                                            {field.options.map(option => (
                                                <option key={option.value} value={option.value}>{option.label}</option>
                                            ))}
                                        </select>
                                    ) : (
                                        <input
                                            type={field.type}
                                            id={field.id}
                                            value={data[field.id] || ''}
                                            onChange={handleChange}
                                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        />
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default FormEdit;
