// Copyright (c) 2022 Ali Hatami
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import React from 'react'
import { useParams } from 'react-router-dom'

function Manage() {

  const {slug} = useParams();

  return (
    <div>Manage {slug}</div>
  )
}

export default Manage