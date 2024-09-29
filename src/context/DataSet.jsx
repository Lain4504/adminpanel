export const collectionColumns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "name", headerName: "Name", width: 250 },
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
      width: 300,
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
    { field: "stock", headerName: "Stock", width: 230 },
    {
      field: "state",
      headerName: "State",
      width: 160,
      renderCell: (params) => (
        <div className={`${params.row?.state?.toLowerCase()}`}>
          {params.row.state}
        </div>
      ),
    },
    {
      field: "price",
      headerName: "Price",
      width: 100,
      renderCell: (params) => <div>{params.row.price?.toLocaleString()}</div>,
    },
  ];
  export const userColumns = [
    { field: "id", headerName: "ID", width: 70 },            
    { field: "name", headerName: "Name", width: 250 },       
    { field: "email", headerName: "Email", width: 250 },     
    { field: "role", headerName: "Role", width: 150 },       
    { 
      field: "isActive",                                     
      headerName: "Active", 
      width: 150,
      renderCell: (params) => (
        <div>
          {params.row.state ? "Yes" : "No"}               
        </div>
      )
    }
  ];
  