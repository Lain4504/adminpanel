import React from 'react'
import DataTable from '../../components/DataTable'
import { bannerColumns } from '../../context/DataSet'
import { deleteBanner, getAllBanners } from '../../services/BannerService'
const BannerList = () => {
  return (
    <DataTable
    columns={bannerColumns}
    dataService={getAllBanners}
    deleteService={deleteBanner}
    entityName="biểu ngữ"
    createPath="/marketing-management/banners/new"
    updatePath="/marketing-management/banners"
    searchField="title"
    />
  )
}

export default BannerList
