// Copyright (c) 2022 Ali Hatami
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import React, { useContext } from 'react'
import From from '../Form/Form'
import { toast, ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";

import './Login.css'
import { ReactComponent as LoginHeader } from '../../imgs/LoginHeader.svg'
import AuthContext from '../../contexts/AuthProvider'
import axios, { LOGIN_URL } from '../../api/axios'

function Login() {

    const { setAuth } = useContext(AuthContext);

    async function handleSubmit(e) {
        e.preventDefault();

        let formData = Object.fromEntries(new FormData(e.target))

        try {
            const response = await axios.post(LOGIN_URL, 
                JSON.stringify(formData),
                {
                    headers: {'Content-Type': 'application/json'}
                })

            console.log(response?.data)
            const token = response?.data?.token;
            const role = response?.data?.role;
            setAuth({username: formData.username, token, role})
        } catch (err) {
            if (!err?.response) {
                toast.error("سرور مورد نظر در حال حاضر قادر به پاسخگویی نمی‌باشد :)")
            } else if (err?.error) {
                toast.error(err?.error)
            } else {
                toast.error("خطا! فعلا کنسله. به دولوپر مراجعه نمایید.")
            }
        }
    }

  return (
    <>
    <ToastContainer position="bottom-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={true}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"/>
    
    <div className="Login">
        <LoginHeader />
        <div className="formContainer">
            <h1 className="title">صفا آوردید!</h1>
            <From requiredFields={["studentNumber", "password"]} onSubmit={handleSubmit} button={
                <button className="button">ورود</button>
            }/>
        </div>
    </div>
    </>
    
  )
}

export default Login