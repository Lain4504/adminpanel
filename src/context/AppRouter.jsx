import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import CollectionList from "../pages/collection/CollectionList";
import FormNew from "../components/FormNew";
import CollectionSingle from "../pages/collection/CollectionSingle";
import ProductList from "../pages/product/ProductList";
import UserList from "../pages/user/UserList";
import PostList from "../pages/post/PostList";
import PostNew from "../pages/post/PostNew";
import PostSingle from "../pages/post/PostSingle";
import ProductNew from "../pages/product/ProductNew";
import ProductSingle from "../pages/product/ProductSingle";
import OrderList from "../pages/order/OrderList";
import OrderDetail from "../pages/order/OrderDetail";
import ChangeState from "../pages/order/ChangeState";
import PublisherSingle from "../pages/publisher/PublisherSingle";
import PublisherList from "../pages/publisher/PublisherList";
import PostCategorySingle from "../pages/post-category/PostCategorySingle";
import PostCategoryList from "../pages/post-category/PostCategoryList";
import Dashboard from "../components/chart/Dashboard";
import Page404 from "../components/Page404";
import { addCollection } from "../service/CollectionService";
import { addPublisher } from "../service/PublisherService";
import { createPost } from "../service/PostService";
import { addPostCategory } from "../service/PostService";
import RequireAuth from "./RequireAuth";
import { collectionInputs, postCategoryInputs, publisherInputs } from "../context/formSource";

const AppRouter = () => {
  return (
    <Routes>
      {/* Collection Routes */}
      <Route path="/product-management/collections">
        <Route index element={<RequireAuth><CollectionList /></RequireAuth>} />
        <Route path="new" element={<RequireAuth><FormNew inputs={collectionInputs} title="Add New Collection" location="/product-management/collections" handleAdd={addCollection} /></RequireAuth>} />
        <Route path=":id" element={<RequireAuth><CollectionSingle /></RequireAuth>} />
      </Route>

      {/* Publisher Routes */}
      <Route path="/product-management/publishers">
        <Route index element={<RequireAuth><PublisherList /></RequireAuth>} />
        <Route path="new" element={<RequireAuth><FormNew inputs={publisherInputs} title="Add New Publisher" location="/product-management/publishers" handleAdd={addPublisher} /></RequireAuth>} />
        <Route path=":id" element={<RequireAuth><PublisherSingle /></RequireAuth>} />
      </Route>

      {/* Post Routes */}
      <Route path="/post-management/posts">
        <Route index element={<RequireAuth><PostList /></RequireAuth>} />
        <Route path="new" element={<RequireAuth><PostNew title="Add New Post" location="/post-management/posts" handleAdd={createPost} /></RequireAuth>} />
        <Route path=":id" element={<RequireAuth><PostSingle /></RequireAuth>} />
      </Route>

      {/* PostCategory Start */}
      <Route path="/post-management/categories">
        <Route index element={<RequireAuth><PostCategoryList /></RequireAuth>} />
        <Route path="new" element={<RequireAuth><FormNew inputs={postCategoryInputs} title="Add New Post Category" location="/post-management/categories" handleAdd={addPostCategory} /></RequireAuth>} />
        <Route path=":id" element={<RequireAuth><PostCategorySingle /></RequireAuth>} />
      </Route>

      {/* Orders Start */}
      <Route path="/order-management/orders">
        <Route index element={<RequireAuth><OrderList /></RequireAuth>} />
        <Route path=":id" element={<RequireAuth><OrderDetail /></RequireAuth>} />
      </Route>
      <Route path="/order-state/:id" element={<RequireAuth><ChangeState /></RequireAuth>} />

      {/* Product Routes */}
      <Route path="/product-management/products">
        <Route index element={<RequireAuth><ProductList /></RequireAuth>} />
        <Route path="new" element={<RequireAuth><ProductNew title="Add New Product" location="/product-management/products" handleAdd={addCollection} /></RequireAuth>} />
        <Route path=":id" element={<RequireAuth><ProductSingle /></RequireAuth>} />
      </Route>

      {/* User Management */}
      <Route path="/user-management/users" element={<RequireAuth><UserList /></RequireAuth>} />
      <Route path="*" element={<Page404 />} />
      <Route path="/" element={<RequireAuth><Dashboard /></RequireAuth>} />
    </Routes>
  );
};

export default AppRouter;
