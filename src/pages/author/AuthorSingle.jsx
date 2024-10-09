import React from 'react'
import FormEdit from '../../components/FormEdit'

const AuthorSingle = () => {
    const fields = {
        name: "Author",
        inputs: [
            {id: 'name', label: 'Name', type: 'text'},
        ]
    }
  return (
    <FormEdit
    />
  )
}

export default AuthorSingle
