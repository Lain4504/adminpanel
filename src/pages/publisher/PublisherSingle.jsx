import React from 'react';
import { getCollectionsById, updateCollection } from '../../service/CollectionService';
import FormEdit from '../../components/FormEdit';
import { getPublisherById, updatePublisher } from '../../service/PublisherService';

const PublisherSingle = () => {
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
            onSuccess={() => window.location.replace("/product-management/publishers")}
            onError={() => console.error('Failed to update publishers')}
        />
    );
};

export default PublisherSingle;
