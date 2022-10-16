// Copyright (c) 2022 Ali Hatami
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import axios from 'axios';

export default axios.create()

export const axiosPrivate =  axios.create({
    headers: {'Content-Type': 'application/json'}
})

