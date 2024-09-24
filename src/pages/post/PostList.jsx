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
      createPath="/posts/new"
      updatePath="/posts"
      />
    );
};

export default PostList
