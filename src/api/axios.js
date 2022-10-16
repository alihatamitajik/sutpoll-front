// Copyright (c) 2022 Ali Hatami
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import axios from 'axios';

const BASE_URL = 'http://localhost:3500';

export const LOGIN_URL = '/api/auth/login';

export default axios.create({
    baseURL: BASE_URL
})