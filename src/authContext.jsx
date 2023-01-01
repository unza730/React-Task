import React, { useReducer } from "react";
import MkdSDK from "./utils/MkdSDK";
import { showToast } from "./globalContext";
import { useNavigate } from "react-router";
 
export const AuthContext = React.createContext();

const initialState = {
  isAuthenticated: false,
  user: null,
  token: null,
  role: null,
};
const token = localStorage.getItem('token');
console.log("Token from auth", token)
const reducer = (state, action) => {
  console.log("Action", action)
  localStorage.setItem("data", JSON.stringify({
    user: action.payload,
    role: action.payload.role,
    
    isAuthenticated: true
  })
  )
  switch (action.type) {
    case "LOGIN":
       //TODO
      return {
        ...state,
        user: action.payload,
        token: token,
        isAuthenticated: true
      };
    case "LOGOUT":
      localStorage.clear()
    //  localStorage.removeItem("data");
    //  localStorage.removeItem('token')
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
    default:
      return state;
  }
};

export const tokenExpireError = (dispatch, errorMessage) => {
  console.log(errorMessage)
  const role = localStorage.getItem("role");
  if (errorMessage === "TOKEN_EXPIRED") {
    dispatch({
      type: "LOGOUT",
    });
    window.location.href = "/" + role + "/login";
  }
};
export const logout = (dispatch, value)=> {
console.log("Value from logout function")
const role = localStorage.getItem("role");
 
dispatch({
  type: "LOGOUT"
})
window.location.href = "/admin/login";

}
export const login = (dispatch,value)=> {
  console.log("value", value)
  dispatch({
    type: 'LOGIN',
    payload: value
  })
  setTimeout(()=> {
  location.assign("/admin/dashboard")
},1000)


}

const AuthProvider = ({ children }) => {
  

  const [state, dispatch] = useReducer(reducer, initialState);
   React.useEffect(() => {
    //TODO
   
  }, []);

  return (
    <AuthContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
