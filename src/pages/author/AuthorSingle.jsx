import React from 'react'
import FormEdit from '../../components/FormEdit'
import { getAuthorById, updateAuthor } from '../../services/AuthorService'
import { useNavigate } from 'react-router-dom'

const AuthorSingle = () => {
  const navigate = useNavigate();
    const fields = {
        name: "Author",
        inputs: [
            {id: 'name', label: 'Name', type: 'text'},
        ]
    }
  return (
    <FormEdit
    getDataById={getAuthorById}
    updateData={updateAuthor}
    fields={fields}
    onSuccess={() => navigate("/product-management/authors")}
    onError={() => console.error('Failed to update author')}
    />
  )
}

export default AuthorSingle
