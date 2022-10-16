// Copyright (c) 2022 Ali Hatami
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { toast } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useLocation } from 'react-router-dom'

import From from '../Form/Form'
import './Login.css'
import { ReactComponent as LoginHeader } from '../../imgs/LoginHeader.svg'
import axios from '../../api/axios'
import useAuth from '../../hooks/useAuth';
import { urls } from '../../api/urls';

function Login() {

    const { auth, setAuth } = useAuth();
    

    const navigate = useNavigate();
    const location = useLocation();
    const from = location?.state?.from?.pathname || "/";
    console.log(location);


    async function handleSubmit(e) {
        e.preventDefault();

        let formData = Object.fromEntries(new FormData(e.target))

        const id = toast.loading("در حال ورود ...")

        try {
            const response = await axios.post(urls.login(), 
                JSON.stringify({student_number: formData.studentNumber, national_id: formData.password} ),
                {
                    headers: {'Content-Type': 'application/json'}
                })
            toast.update(id, {render: "با موفقیت وارد شدید.", type: "success", isLoading: false, autoClose: 3000})
            await new Promise(r => setTimeout(r, 500))
            const token = response?.data?.token;
            const role = response?.data?.role;
            setAuth({studentNumber: formData.studentNumber, token, role: [role]})
            navigate(from, {replace: true});
        } catch (err) {
            console.log(err);
            if (!err?.response) {
                toast.update(id, {render: "سرور مورد نظر در حال حاضر قادر به پاسخگویی نمی‌باشد :)", type: "error", isLoading: false, autoClose: 3000})
            } else if (err?.response?.data?.error) {
                toast.update(id, {render: err?.response?.data?.error, type: "error", isLoading: false, autoClose: 3000})
            } else {
                toast.update(id, {render: "به توسعه‌دهنده مراجعه کنید 😨", type: "error", isLoading: false, autoClose: 3000})
            }
        }
    }

  return (
    <div className="Login">
        <LoginHeader />
        <div className="formContainer">
            <h1 className="title">صفا آوردید!</h1>
            <From requiredFields={["studentNumber", "password"]} onSubmit={handleSubmit} button={
                <button className="button">ورود</button>
            }/>
        </div>
    </div>
  )
}

export default Login