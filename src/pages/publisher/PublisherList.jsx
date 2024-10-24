
import DataTable from "../../components/DataTable";
import { publisherColumns } from "../../context/DataSet";
import { deletePublisher, getAllPublishers } from "../../services/PublisherService";

const PublisherList = () => {
    return (
      <DataTable
      columns={publisherColumns}
      dataService={getAllPublishers}
      deleteService={deletePublisher}
      entityName="Publisher"
      createPath="/product-management/publishers/new"
      updatePath="/product-management/publishers"
    />
  );
};

export default PublisherList;
