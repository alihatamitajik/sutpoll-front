// Copyright (c) 2022 Ali Hatami
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import React, { useState } from 'react'

import './Form.css'
import InputField from './InputField';
import { Fields } from '../../data/form.data';
import { verify } from '../../utils/form.util';

function From({requiredFields, button, onSubmit}) {

  const [errors, setErrors] = useState(Object.fromEntries(requiredFields.map(name => [name, ""])));

  function isAllVerified(form) {
    let err = {}
    Array.from(form.elements)
      .filter(elem => elem.tagName === "INPUT" && elem.type !== 'submit')
      .forEach((elem, index) => {
        let {name, value} = elem;
          let error = verify(name, value)
          err[name] = error;
      });
    if (Object.values(err).every(value => value === "")) {
      return true;
    } else {
      setErrors({...errors, ...err})
      return false;
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (isAllVerified(event.currentTarget)) {
      onSubmit(event)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      {requiredFields.map((req, index) => {
        let field = Fields[req];
        return (
        <InputField key={index} props={field} 
        errors={errors}
        setErrors={setErrors}
        />
        )
      })}
      {button}
    </form>
  )
}

export default From