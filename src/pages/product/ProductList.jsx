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
      createPath="/products/new"
      updatePath="/products"
    />
  );
};

export default ProductList;
