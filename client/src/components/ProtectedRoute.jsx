
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRoute=()=>{
    const{isAuthenticated}=useSelector((state)=>state.authslice);

    if(!isAuthenticated){
        return <Navigate to="/login"/>
    }
    return <Outlet/>;
};