import React from 'react'
import {Navigate, Outlet, useLocation} from 'react-router-dom'
import useStateContext from '../hooks/useStateContext'

export default function Authenticate({allowedRoles}) {
    const {context} = useStateContext();
    const location = useLocation();


    return (


        (context.token)
            ? <Navigate to="/" state={{from: location}} replace/>
            : (context.UserRol === allowedRoles)
                ? <Outlet/>
                : <Navigate to="/Unauthorized" state={{from: location}} replace/>


    )
}