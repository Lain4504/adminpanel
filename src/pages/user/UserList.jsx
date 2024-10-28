import React, { useState, useEffect } from 'react';
import { getAllUsers } from '../../services/UserService';
import { Modal, Button, Table, notification, Pagination } from 'antd';
import SearchBar from '../../components/SearchBar'; // Custom search bar component
import Filter from '../../components/Filter'; // Custom filter component
import { updateUser } from '../../services/UserService';
const UserList = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]); // For search and filter
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterValue, setFilterValue] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await getAllUsers();
      setUsers(response.data);
      setFilteredUsers(response.data); // Initialize filtered users
    } catch (error) {
      notification.error({
        message: 'Failed to fetch users!',
      });
    }
    setLoading(false);
  };

  const handleUpdateUser = (user) => {
    setSelectedUser(user);
    setIsModalVisible(true);
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
    setSelectedUser(null);
  };

  const handleUpdateStatus = async () => {
    if (selectedUser.role === 'ADMIN' && selectedUser.state === 'INACTIVE') {
        notification.error({
            message: 'Admin cannot deactivate their own account!',
        });
        return;
    }

    try {
        await updateUser(selectedUser.id, selectedUser.role, selectedUser.state);
        notification.success({
            message: 'User status and role updated successfully!',
        });

        setIsModalVisible(false);
        fetchUsers(); // Refresh the user list to reflect the updates
    } catch (error) {
        console.error('Error updating user:', error);
        notification.error({
            message: 'Failed to update user status!',
        });
    }
};

  const handleRoleChange = (value) => {
    if (value === 'ADMIN' && selectedUser.role === 'USER') {
      Modal.confirm({
        title: 'Confirm Role Change',
        content: 'Are you sure you want to change this user\'s role to Admin?.',
        onOk: () => {
          setSelectedUser({ ...selectedUser, role: value });
          notification.success({
            message: 'User role selected to Admin!',
          });
        },
        onCancel: () => {
          // Do nothing, user canceled the action
        },
      });
    } else {
      setSelectedUser({ ...selectedUser, role: value });
    }
  };

  const handleStatusChange = (value) => {
    setSelectedUser({ ...selectedUser, state: value });
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (value) => {
    setFilterValue(value);
  };

  // Filtered and searched data
  useEffect(() => {
    const searchFilteredData = users.filter(user =>
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filterValue === '' || user.role === filterValue)
    );
    setFilteredUsers(searchFilteredData);
  }, [searchTerm, filterValue, users]);

  const paginatedUsers = filteredUsers.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const columns = [
    { title: 'ID', dataIndex: 'id', key: 'id' },
    { title: 'Full Name', dataIndex: 'fullName', key: 'fullName' },
    { title: 'Email', dataIndex: 'email', key: 'email' },
    { title: 'Phone', dataIndex: 'phone', key: 'phone' },
    { title: 'Role', dataIndex: 'role', key: 'role' },
    {
      title: 'Status',
      dataIndex: 'state',
      key: 'state',
      width: 100,
      render: (state) => (
        <div>
          {state === 'ACTIVE' ? "Active" : "Inactive"}
        </div>
      )
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (user) => (
        <div>
          <Button onClick={() => handleUpdateUser(user)}>Update Status</Button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <h1>User Management</h1>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        {/* Search Bar */}
        <Filter
          filterField="role"
          filterValue={filterValue}
          setFilterValue={handleFilterChange}
          data={users}
        />
        {/* Search Bar */}
        <SearchBar
          searchTerm={searchTerm}
          handleSearch={handleSearch}
          placeholder="Search users by email..."
        />
      </div>

      <Table
        columns={columns}
        dataSource={paginatedUsers}
        loading={loading}
        rowKey="id"
        pagination={false} // Disable AntD's built-in pagination
      />

      {/* Pagination */}
      <div className="flex justify-center mt-4">
        <Pagination
          current={currentPage}
          pageSize={itemsPerPage}
          total={filteredUsers.length}
          onChange={(page) => setCurrentPage(page)}
          onShowSizeChange={(current, size) => setItemsPerPage(size)}
          showSizeChanger
        />
      </div>
      {selectedUser && (
        <Modal
          title="Update User Role & Status"
          visible={isModalVisible}
          onCancel={handleModalCancel}
          footer={null} // Chúng ta sẽ tùy chỉnh footer
        >
          <div className="p-4"> {/* Thêm padding cho nội dung modal */}
            <h2 className="text-lg font-semibold">User Information</h2>
            <p className="text-gray-700">User: <span className="font-bold">{selectedUser.fullName}</span></p>
            <p className="text-gray-700">Email: <span className="font-bold">{selectedUser.email}</span></p>
          </div>

          <div className="p-4"> {/* Thêm padding cho nội dung phân loại */}
            <h3 className="text-md font-semibold">Role</h3>
            <select
              value={selectedUser.role}
              onChange={(e) => handleRoleChange(e.target.value)}
              className="mt-2 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="USER">User</option>
              <option value="ADMIN">Admin</option>
            </select>
          </div>

          <div className="p-4"> {/* Thêm padding cho nội dung phân loại */}
            <h3 className="text-md font-semibold">Status</h3>
            <select
              value={selectedUser.state}
              onChange={(e) => handleStatusChange(e.target.value)}
              className="mt-2 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="ACTIVE">Active</option>
              <option value="INACTIVE">Inactive</option>
            </select>
          </div>

          <div className="flex justify-end p-4"> {/* Thêm padding cho footer */}
            <Button onClick={handleModalCancel} className="mr-2" danger>Cancel</Button>
            <Button onClick={handleUpdateStatus} type="primary">Update</Button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default UserList;
