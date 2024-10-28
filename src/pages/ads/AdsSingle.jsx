import React from 'react'
import FormEdit from '../../components/FormEdit'
import { useNavigate } from 'react-router-dom'
import { getAdsById, updateAds } from '../../services/AdsServcie'

const AdsSingle = () => {
  const navigate = useNavigate();
   const fields = {
      name: "Ads",
      inputs: [
        { id: 'title', label: "Title", type: "text" },
        { id: 'description', label: "Image", type: "text" },
        { id: 'image', label: "Back Link", type: "text" },
      ]
    }
  return (
    <FormEdit
    fields={fields}
    getDataById={getAdsById}
    updateData={updateAds}
    onSuccess={() => navigate("/marketing-management/ads")}
    onError={() => console.error('Failed to update ads')}
    />
  )
}

export default AdsSingle
