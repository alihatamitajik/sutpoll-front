// Copyright (c) 2022 Ali Hatami
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import React from 'react';
import {Outlet} from 'react-router-dom';

import './Admin.css'

function Admin() {
    return (
        <>
            <Outlet/>
        </>
    )
}

export default Admin
