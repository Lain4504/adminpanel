const AuthReducer = (state, action) => {
    switch (action.type) {
      case "LOGIN": {
        return {
          currentUser: action.payload,
          isSessionExpired: false,
        };
      }
      case "LOGOUT": {
        localStorage.removeItem("user"); // Xóa token khỏi local storage
        return {
          currentUser: null,
          isSessionExpired: action.isSessionExpired || false, // Kiểm tra logout do hết hạn hay không
        };
      }
      default:
        return state;
    }
  };
  
  export default AuthReducer;
  