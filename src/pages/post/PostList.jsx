import React from 'react'
import DataTable from '../../components/DataTable'
import { postColumns } from '../../context/DataSet'
import { deletePost, getAllPosts } from '../../service/PostService'

const PostList = () => {
  return (
    <DataTable
      columns={postColumns}
      dataService={getAllPosts}
      deleteService={deletePost}
      entityName="Post"
      createPath="/post-management/posts/new"
      updatePath="/post-management/posts"
      />
    );
};

export default PostList
