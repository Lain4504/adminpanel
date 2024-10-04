import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { postColumns } from '../../context/DataSet';
import { deletePost, getAllPosts } from '../../service/PostService';
import { getPostCategoriesById } from '../../service/PostService';
import { getUserProfile } from '../../service/UserService';
import DataTable from '../../components/DataTable';

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState({});
  const [users, setUsers] = useState({});

  const fetchPosts = async () => {
    const response = await getAllPosts();
    console.log('Posts:', response.data);

    const postsData = response.data || [];
    setPosts(postsData);

    const categoryPromises = postsData.map(post =>
      getPostCategoriesById(post.categoryId).then(category => {
        console.log(`Category for ID ${post.categoryId}:`, category.data);
        return {
          id: post.categoryId,
          name: category.data.name,
        };
      })
    );
    
    const userPromises = postsData.map(post =>
      getUserProfile(post.userId).then(user => ({
        id: post.userId,
        email: user.data.email,
      }))
    );

    const categoryResults = await Promise.all(categoryPromises);
    const userResults = await Promise.all(userPromises);

    const categoryMap = categoryResults.reduce((acc, { id, name }) => {
      acc[id] = name;
      return acc;
    }, {});
    const userMap = userResults.reduce((acc, { id, email }) => {
      acc[id] = email;
      return acc;
    }, {});

    setCategories(categoryMap);
    setUsers(userMap);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const modifiedPosts = posts.map(post => ({
    ...post,
    categoryName: categories[post.categoryId] || 'N/A',
    authorEmail: users[post.userId] || 'N/A',
    timeAgo: moment.utc(post.createdAt).fromNow(), // Convert createdAt to "time ago" format
  }));

  const handleDelete = async (id) => {
    await deletePost(id);
    fetchPosts();
  };

  const modifiedPostColumns = postColumns.map(column => {
    if (column.field === 'category') {
      return {
        ...column,
        field: 'categoryName',
        renderCell: (params) => (
          <div>{params.row.categoryName || 'N/A'}</div>
        ),
      };
    }
    if (column.field === 'author') {
      return {
        ...column,
        renderCell: (params) => (
          <div>{params.row.authorEmail || 'N/A'}</div>
        ),
      };
    }
    if (column.field === 'createdAt') {
      return {
        ...column,
        field: 'timeAgo', // Use the "time ago" field
        renderCell: (params) => (
          <div>{params.row.timeAgo || 'N/A'}</div>
        ),
      };
    }
    return column;
  });

  return (
    <DataTable
      columns={modifiedPostColumns}
      dataService={() => Promise.resolve({ data: modifiedPosts.length ? modifiedPosts : [] })}
      deleteService={handleDelete}
      fetchData={fetchPosts}
      entityName="Post"
      createPath="/post-management/posts/new"
      updatePath="/post-management/posts"
      searchField="title"
      filterField="categoryName"
    />
  );
};

export default PostList;
