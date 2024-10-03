import React, { useEffect, useState } from 'react';
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
    console.log('Posts:', response.data); // Kiểm tra dữ liệu ở đây

    const postsData = response.data || [];
    setPosts(postsData);

    // Fetch category names and user emails
    const categoryPromises = postsData.map(post =>
      getPostCategoriesById(post.categoryId).then(category => {
        console.log(`Category for ID ${post.categoryId}:`, category.data); // Ghi lại dữ liệu category
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

    // Store category names and user emails in state
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
  }));
  const handleDelete = async (id) => {
    await deletePost(id);
    fetchPosts(); // Gọi lại hàm fetchPosts để cập nhật danh sách
  };
  const modifiedPostColumns = postColumns.map(column => {
    if (column.field === 'category') {
      return {
        ...column,
        field: 'categoryName', // Sử dụng categoryName
        renderCell: (params) => {
          return (
            <div>
              {params.row.categoryName || 'N/A'}
            </div>
          );
        },
      };
    }
    if (column.field === 'author') {
      return {
        ...column,
        renderCell: (params) => {
          return (
            <div>
              {params.row.authorEmail || 'N/A'}
            </div>
          );
        },
      };
    }
    return column;
  });

  return (
    <DataTable
      columns={modifiedPostColumns}
      dataService={() => Promise.resolve({ data: modifiedPosts.length ? modifiedPosts : [] })} // Sử dụng modifiedPosts
      deleteService={handleDelete}
      fetchData={fetchPosts}
      entityName="Post"
      createPath="/post-management/posts/new"
      updatePath="/post-management/posts"
      searchField="title"
      filterField="categoryName" // Cập nhật filterField để sử dụng categoryName
    />
  );
};

export default PostList;
