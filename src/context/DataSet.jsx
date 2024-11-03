export const collectionColumns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "name", headerName: "Tên", width: 400 },
  { field: "type", headerName: "Loại", width: 150 },
  { 
    field: "isDisplay", 
    headerName: "Hiển thị", 
    width: 150,
    renderCell: (params) => (
      <div>
        {params.row.isDisplay ? "Có" : "Không"}
      </div>
    )
  }
];

export const productColumns = [
  { field: "id", headerName: "ID", width: 70 },
  {
    field: "product",
    headerName: "Sản phẩm",
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
  { field: "stock", headerName: "Kho", width: 120 },
  {
    field: "state",
    headerName: "Trạng thái",
    width: 120,
    renderCell: (params) => (
      <div className={`${params.row?.state?.toLowerCase()}`}>
        {params.row.state}
      </div>
    ),
  },
  {
    field: "price",
    headerName: "Giá",
    width: 120,
    renderCell: (params) => <div>{params.row.price?.toLocaleString()}</div>,
  },
  {
    field: "title", 
    headerName: "Tên",
    hide: true,
  }
];


export const userColumns = [
  { field: "id", headerName: "ID", width: 10 },            
  { field: "email", headerName: "Email", width: 100 }, 
  { field: "fullName", headerName: "Tên", width: 250 },
  { field: "phone", headerName: "Điện thoại", width: 100 },   
  { field: "gender", headerName: "Giới tính", width: 50 },                 
  { field: "role", headerName: "Vai trò", width: 50 },              
  { 
    field: "isActive",                                     
    headerName: "Hoạt động", 
    width: 100,
    renderCell: (params) => (
      <div>
        {params.row.state ? "Có" : "Không"}               
      </div>
    )
  }
];

export const postColumns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "title", headerName: "Tiêu đề", width: 200 },
  {
    field: 'category', headerName: 'Danh mục', width: 200,
    renderCell: (params) => {
      return (
        <div>
          {params.row.categoryId}
        </div>
      );
    },
  },
  { field: 'createdAt', headerName: 'Thời gian tạo', width: 200 },
  {
    field: 'author', headerName: 'Tác giả', width: 150,
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
  { field: "fullName", headerName: "Họ và tên", width: 150 },
  { field: "phone", headerName: "Điện thoại", width: 150 },
  { field: "paymentState", headerName: "Phương thức thanh toán", width: 150 },
  {
    field: "shippingState", headerName: "Trạng thái giao hàng", width: 130,
    renderCell: (params) => {
      return (
        <div className={`cellWithStatus ${params.row.shippingState.toLowerCase()}`}>
          {params.row.shippingState}
        </div>
      );
    },
  },
  { field: 'state', headerName: 'Trạng thái đơn hàng', width: 150 },
  {
    field: "totalPrice", 
    headerName: "Tổng giá", 
    width: 120,
    renderCell: (params) => {
      const price = params.row.totalPrice;
      return (
        <div>{price !== undefined && !isNaN(price) ? price.toLocaleString() + '₫' : 'N/A'}</div>
      );
    }
  }
];

export const publisherColumns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "name", headerName: "Tên", width: 200 },
  { field: "website", headerName: "Trang web", width: 250 },
];

export const postCategoryColumns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "name", headerName: "Tên", width: 400 },
];

export const bannerColumns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "title", headerName: "Tiêu đề", width: 150 },
  {
    field: "imageBackLink",
    headerName: "Hình ảnh & Liên kết",
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
  { field: "description", headerName: "Mô tả", width: 150 },
];

export const adsColumns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "title", headerName: "Tiêu đề", width: 200 },
  { field: "description", headerName: "Mô tả", width: 300 },
  { field: "image", headerName: "Hình ảnh", width: 200 },
];

export const authorColumns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "author", headerName: "Tác giả", width: 230,
    renderCell: (params) => {
      return (
        <div>
          {params.row.name}
        </div>
      );
    },
  },
  {
    field: "name", 
    headerName: "Tên",
    hide: true,
  }
];
