export const collectionColumns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "name", headerName: "Name", width: 450 },
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
  
export const postColumns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "title", headerName: "Title", width: 200 },
  {
    field: 'category', headerName: 'Category', width: 200,
    renderCell: (params) => {
      return (
        <div>
          {params?.row?.category?.name}
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
          {params.row.user.fullName}
        </div>
      );
    },
  }
];


export const orderColumns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "fullName", headerName: "Full Name", width: 150 },
  { field: "phone", headerName: "Phone", width: 150 },
  { field: "address", headerName: "Address", width: 200 },
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
    field: "totalPrice", headerName: "Total Price", width: 120,
    renderCell: (params) => {
      return (
        <div>{params.row.totalPrice.toLocaleString()}₫</div>
      )
    }
  },
]
