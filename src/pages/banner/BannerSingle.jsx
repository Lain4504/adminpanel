import React from 'react'
import FormEdit from '../../components/FormEdit'
import { getBannerById, updateBanner } from '../../services/BannerService'
import { useNavigate } from 'react-router-dom'

const BannerSingle = () => {
  const navigate = useNavigate();
   const fields = {
      name: "Banner",
      inputs: [
        { id: 'title', label: "Title", type: "text" },
        { id: 'imageUrl', label: "Image", type: "text" },
        { id: 'backLink', label: "Back Link", type: "text" },
        { id: 'description', label: "Description", type: "text" }
      ]
    }
  return (
    <FormEdit
    fields={fields}
    getDataById={getBannerById}
    updateData={updateBanner}
    onSuccess={() => navigate("/marketing-management/banners")}
    onError={() => console.error('Failed to update banner')}
    />
  )
}

export default BannerSingle
