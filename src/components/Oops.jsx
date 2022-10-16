// Copyright (c) 2022 Ali Hatami
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import React from 'react'

import { ReactComponent as NF404} from '../imgs/Oops.svg'

function Oops() {
  return (
    <NF404 style={{
      maxHeight: '90%',
      maxWidth: '90%',
      height: 'auto',
      width: 'auto'
    }} />
  )
}

export default Oops