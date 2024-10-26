import {getAllPostCategories, deletePostCategories} from "../../services/PostService";
import DataTable from "../../components/DataTable";
import {postCategoryColumns} from "../../context/DataSet";

const PostCategoryList = () => {
    return (
      <DataTable
      columns={postCategoryColumns}
      dataService={getAllPostCategories}
      deleteService={deletePostCategories}
      entityName="Post Category"
      createPath="/post-management/categories/new"
      updatePath="/post-management/categories"
      filterField="name"
      searchField="name"
    />
  );
};

export default PostCategoryList ;
