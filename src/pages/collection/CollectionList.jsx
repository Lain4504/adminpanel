
import { getAllCollections, deleteCollection } from "../../services/CollectionService";
import DataTable from "../../components/DataTable";
import { collectionColumns } from "../../context/DataSet";

const CollectionList = () => {
    return (
      <DataTable
      columns={collectionColumns}
      dataService={getAllCollections}
      deleteService={deleteCollection}
      entityName="bộ sưu tập sách"
      createPath="/product-management/collections/new"
      updatePath="/product-management/collections"
      searchField="name"
      filterField="type"
    />
  );
};

export default CollectionList;
