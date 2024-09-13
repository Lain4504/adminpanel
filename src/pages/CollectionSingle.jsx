import React from 'react';
import { getCollectionsById, updateCollection } from '../service/CollectionService';
import FormEdit from '../components/FormEdit';

const CollectionSingle = () => {
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
            onSuccess={() => window.location.replace("/collections")}
            onError={() => console.error('Failed to update collection')}
        />
    );
};

export default CollectionSingle;
