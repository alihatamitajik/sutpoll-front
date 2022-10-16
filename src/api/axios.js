// Copyright (c) 2022 Ali Hatami
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import axios from 'axios';

const BASE_URL = 'https://polls.taha7900.ir/api';

export const LOGIN_URL = '/auth/login';

export default axios.create({
    baseURL: BASE_URL
})

export const axiosPrivate =  axios.create({
    baseURL: BASE_URL,
    headers: {'Content-Type': 'application/json'},
    withCredentials: true
})

