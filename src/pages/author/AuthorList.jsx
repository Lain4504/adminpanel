import React from 'react'
import DataTable from '../../components/DataTable'
import { authorColumns } from '../../context/DataSet'
import { deleteAuthor, getAllAuthors } from '../../services/AuthorService'

const AuthorList = () => {
  return (
    <DataTable
    columns={authorColumns}
    dataService={getAllAuthors}
    deleteService={deleteAuthor}
    entityName="tác giả"
    createPath="/product-management/authors/new"
    updatePath="/product-management/authors"
    searchField="name"
    />
  )
}

export default AuthorList
