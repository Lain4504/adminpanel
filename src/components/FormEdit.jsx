import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const FormEdit = ({ getDataById, updateData, fields, onSuccess, onError }) => {
    const [data, setData] = useState({});
    const { id } = useParams();
    const [error, setError] = useState(false);

    const handleCancel = () => {
        window.location.replace("/collections"); // Adjust this for other locations as needed
    };

    const handleSave = () => {
        updateData(id, data).then(res => {
            // Chuyển đổi trạng thái kiểm tra để phù hợp với phản hồi 204
            if (res.status === 204) {
                onSuccess();
            } else {
                setError(true);
                if (onError) onError();
            }
        }).catch(error => {
            // Đảm bảo rằng lỗi cũng được xử lý và hiển thị
            setError(true);
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
                                {error && <span className="text-red-500">Error</span>}
                                <button
                                    onClick={handleCancel}
                                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleSave}
                                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                                >
                                    Save
                                </button>
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
