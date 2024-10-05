const AuthReducer = (state, action) => {
    switch (action.type) {
      case "LOGIN": {
        return {
          currentUser: action.payload,
          isSessionExpired: false,
        };
      }
      case "LOGOUT": {
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
  