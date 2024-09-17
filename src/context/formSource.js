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
    type: "select", // Chuyển type thành 'select'
    options: [
      { value: 'true', label: 'True' },
      { value: 'false', label: 'False' }
    ]
  }
]

