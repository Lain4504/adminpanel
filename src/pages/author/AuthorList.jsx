import React from 'react'
import DataTable from '../../components/DataTable'
import { authorColumns } from '../../context/DataSet'
import { getAllAuthors } from '../../service/AuthorService'

const AuthorList = () => {
  return (
    <DataTable
    columns={authorColumns}
    dataService={getAllAuthors}
    entityName="Author"
    createPath="/product-management/authors/new"
    updatePath="/product-management/authors"
    searchField="name"
    />
  )
}

export default AuthorList
