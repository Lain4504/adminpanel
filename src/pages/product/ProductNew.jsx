import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const ProductNew = () => {
    const [publishers, setPublishers] = useState([]);
    const [collections, setCollections] = useState([]);
    const [authors, setAuthors] = useState([]);
    const [error, setError] = useState(false);
    const [data, setData] = useState({
        title: '',
        depscription: '',
        publishers: {
            id: ''
        },
        authors: [],
        collections: [],
        stock: 0,
        isbn: '',
        images: [{
            link: '',
            depscription: 'Illustration'
        }],
        page: 0,
        weight: 0,
        size: '',
        cover: '',
        price: 0,
        discount: 0,
        sold: 0
    })
    
  return (
    <div>
      
    </div>
  )
}

export default ProductNew
