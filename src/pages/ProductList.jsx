import DataTable from '../components/DataTable';
import { getAllBooks, deleteBook } from "../service/BookService";
import { productColumns } from '../context/DataSet';

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
