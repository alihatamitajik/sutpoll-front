// Copyright (c) 2022 Ali Hatami
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { axiosPrivate } from "../api/axios";
import useAuth from "./useAuth";

const useAxiosPrivate = () => {
    const {auth} = useAuth();
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const requestIntercept = axiosPrivate.interceptors.request.use(
            config => {
                if (!config.headers['Authorization']) {
                    config.headers['Authorization'] = `Bearer ${auth?.token}`
                }
                return config;
            }, (error) => {
                Promise.reject(error)
            }
        );

        const responseIntercept = axiosPrivate.interceptors.response.use (
            response => response, 
            async (error) => {
                const prev = error?.config;
                if (error?.response?.status === 403 || error?.response?.status === 401) {
                    navigate('/login', {state: {from: location}, replace: true});
                }
            }
        )

        return () => {
            axiosPrivate.interceptors.request.eject(requestIntercept);
            axiosPrivate.interceptors.response.eject(responseIntercept);
        }
    }, [auth])

    return axiosPrivate;
}

export default useAxiosPrivate;