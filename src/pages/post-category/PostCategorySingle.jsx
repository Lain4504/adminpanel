import React from 'react';
import { getPostCategoriesById, updatePostCategories} from '../../service/PostService';
import FormEdit from '../../components/FormEdit';

const PostCategorySingle = () => {
    const fields = {
        title: "Post Category",
        inputs: [
            { id: 'name', label: 'Name', type: 'text' },
        ]
    };

    return (
        <FormEdit
            getDataById={getPostCategoriesById}
            updateData={updatePostCategories}
            fields={fields}
            onSuccess={() => window.location.replace("/post-management/categories")}
            onError={() => console.error('Failed to update post category')}
        />
    );
};

export default PostCategorySingle;
