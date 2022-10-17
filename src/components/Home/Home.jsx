// Copyright (c) 2022 Ali Hatami
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import React from 'react'
import { Outlet } from 'react-router-dom'
import { redirects } from '../../api/urls'
import Polls from '../Polls/Polls'
import NavigateSpeedDial from '../SpeedDial/NavigateSpeedDial';


import './Home.css'

function Home() {
  return (
    <>
    <NavigateSpeedDial />
    <div className="Home">
      <Polls redirectTo={redirects.poll_page}/>
      <Outlet />
    </div>
    </>
  )
}

export default Home