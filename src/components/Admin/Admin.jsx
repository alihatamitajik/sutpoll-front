// Copyright (c) 2022 Ali Hatami
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import React from 'react';
import {Outlet} from 'react-router-dom';
import { redirects } from '../../api/urls';
import Polls from '../Polls/Polls';

import './Admin.css'

function Admin() {
    return (
        <div className="Admin">
            <Polls redirectTo={redirects.manage_poll}/>
            <Outlet />
        </div>
    )
}

export default Admin
