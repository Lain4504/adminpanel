import { getAllBooks, deleteBook } from "../../service/BookService";
import { productColumns } from '../../context/DataSet';
import DataTable from "../../components/DataTable";

const ProductList = () => {
  return (
    <DataTable
      columns={productColumns}
      dataService={getAllBooks}
      deleteService={deleteBook}
      entityName="Product"
      createPath="/product-management/products/new"
      updatePath="/product-management/products"
      searchField="title"  
    />
  );
};

export default ProductList;
