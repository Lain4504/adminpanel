import React from 'react'
import DataTable from '../../components/DataTable'
import { bannerColumns } from '../../context/DataSet'
import { deleteBanner, getAllBanners } from '../../service/BannerService'
const BannerList = () => {
  return (
    <DataTable
    columns={bannerColumns}
    dataService={getAllBanners}
    deleteService={deleteBanner}
    entityName="Banner"
    createPath="/marketing-management/banners/new"
    updatePath="/marketing-management/banners"
    />
  )
}

export default BannerList
