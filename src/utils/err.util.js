// Copyright (c) 2022 Ali Hatami
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { toast } from 'react-toastify'
 
export const handleErrAxios = (err) => {
    if (!err?.response) {
      toast.error("سرور مورد نظر در حال حاضر قادر به پاسخگویی نمی‌باشد :)")
    } else if (err?.response?.data?.error) {
        toast.error(err?.response?.data?.error)
    } else {
        toast.error("به توسعه‌دهنده مراجعه کنید 😨")
    }
    return Promise.resolve(err);
}