
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRoute=()=>{
    const{isAuthenticated,loading}=useSelector((state)=>state.authslice);

      if (loading) return null;
    if(!isAuthenticated){
        return <Navigate to="/login"/>
    }
    return <Outlet/>;
};


