// Copyright (c) 2022 Ali Hatami
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import {useLocation, Navigate, Outlet } from 'react-router-dom'
import useAuth from '../hooks/useAuth'


function PrivateRoute({authorizedRoles}) {
    const { auth } = useAuth();
    const { location } = useLocation();

    return (
        auth?.role?.find(role => authorizedRoles?.includes(role))
            ? <Outlet />
            : auth?.studentNumber
                ? <Navigate to="/unauthorized" state={{from: location}} replace />
                : <Navigate to="/login" state={{from: location}} replace />
    )
}

export default PrivateRoute