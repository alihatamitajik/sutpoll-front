// Copyright (c) 2022 Ali Hatami
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import React from 'react'

import './Load.css'

function WindowsSpinner() {
    return (
        <div className="lds-roller">
                <div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
        </div>
    )
}

function Load() {
  return (
    <div className="loading">
        <WindowsSpinner />
    </div>
  )
}

export default Load