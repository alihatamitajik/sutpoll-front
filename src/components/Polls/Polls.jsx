// Copyright (c) 2022 Ali Hatami
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import React from 'react'
import { Outlet } from 'react-router-dom'


function Polls() {
  return (
    <div>
        Polls List Here
        <Outlet />
    </div>
  )
}

export default Polls