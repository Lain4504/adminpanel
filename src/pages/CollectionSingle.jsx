import React, { useState, useEffect } from 'react'
import { getCollectionsById, updateCollection } from '../service/CollectionService';
import { useParams } from 'react-router-dom';

const CollectionSingle = () => {
    const [data, setData] = useState([])
    const { id } = useParams()
    const [error, setError] = useState(false)

    const handleCancel = () => {
        window.location.replace("/collections")
    }

    const handleSave = () => {
        data.isDisplay = Boolean(data.isDisplay == 'true');
        updateCollection(data).then(res => {
            if (res.status === 200) {
                window.location.replace("/collections")
            } else {
                setError(true)
            }
        })
    }

    useEffect(() => {
        getCollectionsById(id).then((res) => {
            setData(res.data)
        })
    }, [id])

    return (
        <div className="min-h-screen bg-gray-100">
            <div className="mx-auto py-10">
                {data.length !== 0 && (
                    <div className="bg-white shadow-lg rounded-lg p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-semibold">Update Collection</h3>
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
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={data.name}
                                    onChange={(e) => setData({ ...data, name: e.target.value })}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Type</label>
                                <input
                                    type="text"
                                    id="type"
                                    name="type"
                                    value={data.type}
                                    onChange={(e) => setData({ ...data, type: e.target.value })}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Display</label>
                                <select
                                    value={data.isDisplay}
                                    onChange={(e) => setData({ ...data, isDisplay: e.target.value })}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                >
                                    <option value="true">True</option>
                                    <option value="false">False</option>
                                </select>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default CollectionSingle
