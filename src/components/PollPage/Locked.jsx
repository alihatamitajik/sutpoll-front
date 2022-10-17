// Copyright (c) 2022 Ali Hatami
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import React from 'react'

import locked from '../../imgs/locked.svg'
import './Locked.css'


function Locked() {
  return (
    <div className="Locked">
        <img src={locked} alt="Locked Page" style={{
            maxHeight: '45%',
            maxWidth: '45%',
            height: 'auto',
            width: 'auto'
            }}/>
        <h1>این رای‌گیری دارای محدودیت پس از ثبت‌رای است و یا آغاز نشده.</h1>
    </div>
  )
}

export default Locked