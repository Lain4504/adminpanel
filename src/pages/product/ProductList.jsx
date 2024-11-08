import { getAllBooks, deleteBook } from "../../services/BookService";
import { productColumns } from '../../context/DataSet';
import DataTable from "../../components/DataTable";

const ProductList = () => {
  return (
    <DataTable
      columns={productColumns}
      dataService={getAllBooks}
      deleteService={deleteBook}
      entityName="sản phẩm"
      createPath="/product-management/products/new"
      updatePath="/product-management/products"
      searchField="title"  
    />
  );
};

export default ProductList;
