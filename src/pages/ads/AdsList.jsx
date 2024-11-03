import React from 'react'
import DataTable from '../../components/DataTable'
import { adsColumns } from '../../context/DataSet'
import { deleteAds, getAllAds } from '../../services/AdsServcie'
const AdsList = () => {
  return (
    <DataTable
    columns={adsColumns}
    dataService={getAllAds}
    deleteService={deleteAds}
    entityName="quảng cáo"
    createPath="/marketing-management/ads/new"
    updatePath="/marketing-management/ads"
    />
  )
}

export default AdsList
