import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
function ProtectedRoute({userData}) {
return(
    <>
    {userData?<Outlet/>:<Navigate to={'/login'}/>}
    </>
)
}
export default ProtectedRoute;