// Copyright (c) 2022 Ali Hatami
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import React from 'react'

import './InputField.css'
import { verify } from '../../utils/form.util';


function InputField({props, errors, setErrors}) {
  const verifyOnChange = (e) => {
    let {name, value} = e.target;
    let error = verify(name, value);
    if (error !== errors[name]) {
      setErrors({...errors, [name]: error})
    }
  }

  let name = props.props.name;
  let error = errors[name]
  let isError = error !== "";

  return (
    <div className="container">
      <div className={isError?"inputField error":"inputField"}>
          <span><props.logo /></span>
          <input {...props.props} onInput={verifyOnChange}/>
      </div>
      <span className={isError?"errMsg":"errMsgNone"}>{error}</span>
    </div>
  )
}

export default InputField