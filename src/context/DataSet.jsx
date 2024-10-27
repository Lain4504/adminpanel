

export const collectionColumns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "name", headerName: "Name", width: 400 },
  { field: "type", headerName: "Type", width: 150 },
  { 
    field: "isDisplay", 
    headerName: "Display", 
    width: 150,
    renderCell: (params) => (
      <div>
        {params.row.isDisplay ? "Yes" : "No"}
      </div>
    )
  }
];

  export const productColumns = [
    { field: "id", headerName: "ID", width: 70 },
    {
      field: "product",
      headerName: "Product",
      width: 450,
      renderCell: (params) => (
        <div className="flex items-center space-x-2">
          <img
            className="w-12 h-12 object-cover rounded"
            src={params.row?.images?.[0]?.link || ""}
            alt="product"
          />
          <span>{params.row.title}</span>
        </div>
      ),
    },
    { field: "stock", headerName: "Stock", width: 120 },
    {
      field: "state",
      headerName: "State",
      width: 120,
      renderCell: (params) => (
        <div className={`${params.row?.state?.toLowerCase()}`}>
          {params.row.state}
        </div>
      ),
    },
    {
      field: "price",
      headerName: "Price",
      width: 120,
      renderCell: (params) => <div>{params.row.price?.toLocaleString()}</div>,
    },
  ];
  export const userColumns = [
    { field: "id", headerName: "ID", width: 10 },            
    { field: "email", headerName: "Email", width: 100 }, 
    { field: "fullName", headerName: "Name", width: 250 },
    { field: "phone", headerName: "Phone", width: 100 },   
    { field: "gender", headerName: "Gender", width: 50 },                 
    { field: "role", headerName: "Role", width: 50 },              
    { 
      field: "isActive",                                     
      headerName: "Active", 
      width: 100,
      renderCell: (params) => (
        <div>
          {params.row.state ? "Yes" : "No"}               
        </div>
      )
    }
  ];
  
  
export const postColumns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "title", headerName: "Title", width: 200 },
  {
    field: 'category', headerName: 'Category', width: 200,
    renderCell: (params) => {
      return (
        <div>
          {params.row.categoryId}
        </div>
      );
    },
  },
  { field: 'createdAt', headerName: 'Created Time', width: 200 },
  {
    field: 'author', headerName: 'Author', width: 150,
    renderCell: (params) => {
      return (
        <div>
          {params.row.userId}
        </div>
      );
    },
  }
];


export const orderColumns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "fullName", headerName: "Full Name", width: 150 },
  { field: "phone", headerName: "Phone", width: 150 },
  { field: "paymentState", headerName: "Payment Method", width: 150, },
  {
    field: "shippingState", headerName: "Shipping State", width: 130,
    renderCell: (params) => {
      return (
        <div className={`cellWithStatus ${params.row.shippingState.toLowerCase()}`}>
          {params.row.shippingState}
        </div>
      );
    },
  },
  { field: 'state', headerName: 'Order State', width: 150, },
  {
    field: "totalPrice", 
    headerName: "Total Price", 
    width: 120,
    renderCell: (params) => {
      // Check if totalPrice is defined and is a number
      const price = params.row.totalPrice;
      return (
        <div>{price !== undefined && !isNaN(price) ? price.toLocaleString() + '₫' : 'N/A'}</div>
      );
    }
  }
]
export const publisherColumns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "name", headerName: "Name", width: 200 },
  { field: "website", headerName: "Website", width: 250 },

]

export const postCategoryColumns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "name", headerName: "Name", width: 400 },
]


export const bannerColumns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "title", headerName: "Title", width: 150 },
  {
    field: "imageBackLink",
    headerName: "Image & Back Link",
    width: 300,
    renderCell: (params) => {
      return (
        <div>
          <a href={params.row.backLink} target="_blank" rel="noopener noreferrer">
            <img src={params.row.imageUrl} alt="banner" style={{ width: "180px", height: "auto", marginRight: "10px" }} />
          </a>
        </div>
      );
    },
  },
  { field: "description", headerName: "Description", width: 150 },
];

export const adsColumns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "title", headerName: "Title", width: 200 },
  { field: "description", headerName: "Description", width: 300 },
  { field: "image", headerName: "Image", width: 200 },
];

export const authorColumns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "author",headerName: "Author", width: 230,
    renderCell: (params) => {
      return (
        <div>
          {params.row.name}
        </div>
      );
    },
  },
];
