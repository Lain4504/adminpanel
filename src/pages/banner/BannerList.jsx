import React from 'react'
import DataTable from '../../components/DataTable'
import { bannerColumns } from '../../context/DataSet'
import { getAllSliders } from '../../service/BannerService'

const BannerList = () => {
  return (
    <DataTable
    columns={bannerColumns}
    dataService={getAllSliders}
    entityName="Banner"
    createPath="/marketing-management/banners"
    updatePath="/marketing-management/banners"
    />
  )
}

export default BannerList
