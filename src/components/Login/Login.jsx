// Copyright (c) 2022 Ali Hatami
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { toast, ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate, useLocation } from 'react-router-dom'

import From from '../Form/Form'
import './Login.css'
import { ReactComponent as LoginHeader } from '../../imgs/LoginHeader.svg'
import axios, { LOGIN_URL } from '../../api/axios'
import useAuth from '../../hooks/useAuth';

function Login() {

    const { auth, setAuth } = useAuth();

    const navigate = useNavigate();
    const location = useLocation();
    const from = location?.state?.from?.pathname || "/";

    async function handleSubmit(e) {
        e.preventDefault();

        let formData = Object.fromEntries(new FormData(e.target))

        try {
            const response = await axios.post(LOGIN_URL, 
                JSON.stringify({student_number: formData.studentNumber, national_id: formData.password} ),
                {
                    headers: {'Content-Type': 'application/json'}
                })

            const token = response?.data?.token;
            const role = response?.data?.role;
            setAuth({studentNumber: formData.studentNumber, token, role: [role]})
            navigate(from, {replace: true});
        } catch (err) {
            console.log(err);
            if (!err?.response) {
                toast.error("سرور مورد نظر در حال حاضر قادر به پاسخگویی نمی‌باشد :)")
            } else if (err?.response?.data?.error) {
                toast.error(err?.response?.data?.error)
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