
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
      createPath="/collections/new"
      updatePath="/collections"
      filterField="type"
      searchField="name"
    />
  );
};

export default CollectionList;
