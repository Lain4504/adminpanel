
import { getAllCollections, deleteCollection } from "../../service/CollectionService";
import DataTable from "../../components/DataTable";
import { collectionColumns } from "../../context/DataSet";

const CollectionList = () => {
    return (
      <DataTable
      columns={collectionColumns}
      dataService={getAllCollections}
      deleteService={deleteCollection}
      entityName="Collection"
      createPath="/product-management/collections/new"
      updatePath="/product-management/collections"
      searchField="name"
    />
  );
};

export default CollectionList;
