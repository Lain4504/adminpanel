import React from 'react';
import { getCollectionsById, updateCollection } from '../../services/CollectionService';
import FormEdit from '../../components/FormEdit';
import { getPublisherById, updatePublisher } from '../../services/PublisherService';
import { useNavigate } from 'react-router-dom';

const PublisherSingle = () => {
    const navigate = useNavigate();
    const fields = {
        title: "Publisher",
        inputs: [
            { id: 'name', label: 'Name', type: 'text' },
            { id: 'website', label: 'Website', type: 'text' },
        ]
    };

    return (
        <FormEdit
            getDataById={getPublisherById}
            updateData={updatePublisher}
            fields={fields}
            onSuccess={() => navigate("/product-management/publishers")}
            onError={() => console.error('Failed to update publishers')}
        />
    );
};

export default PublisherSingle;
