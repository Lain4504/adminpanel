import React from 'react';
import { getCollectionsById, updateCollection } from '../../service/CollectionService';
import FormEdit from '../../components/FormEdit';
import { useNavigate } from 'react-router-dom';

const CollectionSingle = () => {
    const navigate = useNavigate();
    const fields = {
        title: "Collection",
        inputs: [
            { id: 'name', label: 'Name', type: 'text' },
            { id: 'type', label: 'Type', type: 'text' },
            { id: 'isDisplay', label: 'Display', type: 'select', options: [
                { value: 'true', label: 'True' },
                { value: 'false', label: 'False' }
            ]}
        ]
    };

    return (
        <FormEdit
            getDataById={getCollectionsById}
            updateData={updateCollection}
            fields={fields}
            onSuccess={() => navigate("/product-management/collections")}
            onError={() => console.error('Failed to update collections')}
        />
    );
};

export default CollectionSingle;
