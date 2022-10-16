// Copyright (c) 2022 Ali Hatami
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import React from 'react'
import From from '../Form/Form'

import './Login.css'
import { ReactComponent as LoginHeader } from '../../imgs/LoginHeader.svg'

function Login() {
  return (
    <div className="Login">
        <LoginHeader />
        <div className="formContainer">
            <h1 className="title">صفا آوردید!</h1>
            <From requiredFields={["stdNum", "password"]} button={
                <button className="button">ورود</button>
            }/>
        </div>
    </div>
  )
}

export default Login