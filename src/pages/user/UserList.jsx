import { getAllUsers,deleteUser } from "../../service/UserService";
import DataTable from "../../components/DataTable";
import { userColumns } from "../../context/DataSet";

const UserList = () => {
    return (
      <DataTable
      columns={userColumns}      
      dataService={getAllUsers}   
      deleteService={deleteUser}  
      entityName="User"
      createPath="/user-management/users/new"    
      updatePath="/user-management/users"         
      filterField="role"          
      searchField="email"         
    />
  );
};

export default UserList;
