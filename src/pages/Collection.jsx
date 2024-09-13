import DataTable from '../components/DataTable';
import { getAllCollections, deleteCollection } from "../service/CollectionService";
import { collectionColumns } from '../components/DataSet';

const Collection = () => {
  return (
    <DataTable
      columns={collectionColumns}
      dataService={getAllCollections}
      deleteService={deleteCollection}
      entityName="Collection"
      createPath="/collections/new"
      updatePath="/collections"
    />
  );
};

export default Collection;
