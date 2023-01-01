import React, { useEffect } from "react";
import { AuthContext } from "./authContext";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import SnackBar from "./components/SnackBar";
import AdminDashboardPage from "./pages/AdminDashboardPage";
import AdminLoginPage from "./pages/AdminLoginPage";
import NotFoundPage from "./pages/NotFoundPage";

function renderRoutes(role) {
  switch (role) {
    case "admin":
      return (
        <Routes>
          <Route
            path="/admin/dashboard"
            element={<AdminDashboardPage />}
          ></Route>
        </Routes>
      );
      break;
    default:
      return (
        <Routes>
          <Route exact path="/admin/login" element={<AdminLoginPage />}></Route>
          <Route path="*" exact element={<NotFoundPage />}></Route>
        </Routes>
      );
      break;
  }
}

function Main() {
  const { state } = React.useContext(AuthContext);
  console.log("routieee", state)
  const data = JSON.parse( localStorage.getItem("data"))
  const navigate = useNavigate()
 
  const token = localStorage.getItem("token")
 console.log("data from routess", data, token) 
 useEffect(()=>{
// const timee= setTimeout(()=>{
// // window.location.reload()
// window.location.href = '/admin/dashboard'
// //  if(token){
// //   navigate("/admin/dashboard")
// // }else{
// //   navigate('/')
// // }
// },3000)
// clearTimeout(timee)
}, [])
// clearTimeout()
// setTimeout(()=>)
  return (
    <div className="h-full">
      <div className="flex w-full">
        <div className="w-full">
          <div className={data?.isAuthenticated  ? "page-wrapper w-full bg-black ":"page-wrapper w-full "}>
            {/* {!state.isAuthenticated */}
            {!data?.isAuthenticated 
              ? renderRoutes("none")
              : renderRoutes(data.role)}
          </div>
        </div>
      </div>
      <SnackBar />
    </div>
  );
}

export default Main;
