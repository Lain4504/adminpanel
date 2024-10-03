export const collectionInputs = [
  {
    id: 'name',
    label: "Name",
    type: "text",
    placeholder: "Name",
  },
  {
    id: 'type',
    label: "Type",
    type: "text",
    placeholder: "THỂ LOẠI, TÁC GIẢ, SERIES"
  },
  {
    id: 'isDisplay',
    label: "Display",
    type: "select", 
    options: [
      { value: 'true', label: 'True' },
      { value: 'false', label: 'False' }
    ]
  }
]

export const publisherInputs = [
  {
    id: 'name',
    label: "Name",
    type: "text",
    placeholder: "Kim Đồng",
  },
  {
    id: 'website',
    label: "Website",
    type: "text",
    placeholder: "https://nxbkimdong.com.vn/",
  }
]
export const postCategoryInputs = [
  {
    id: 'name',
    label: "Name",
    type: "text",
    placeholder: "Kim Đồng",
  }
]
export const postInputs = [
  {
    id: 'title',
    label: "Title",
    type: "text",
    placeholder: "Enter the title",
  },
  {
    id: 'content',
    label: "Content",
    type: "textarea", // Hoặc "text" tùy thuộc vào cách bạn muốn nhập nội dung
    placeholder: "Enter the content",
  },
  {
    id: 'brief',
    label: "Brief",
    type: "text",
    placeholder: "Enter a brief description",
  },
  {
    id: 'thumbnail',
    label: "Thumbnail",
    type: "file", // Nếu bạn muốn upload hình ảnh
    placeholder: "Upload a thumbnail",
  },
  {
    id: 'category.id',
    label: "Category",
    type: "text",
    placeholder: "Enter category ID",
  },
  {
    id: 'user.id',
    label: "User ID",
    type: "text",
    placeholder: "Enter user ID",
  }
];
