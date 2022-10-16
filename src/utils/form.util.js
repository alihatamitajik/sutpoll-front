// Copyright (c) 2022 Ali Hatami
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { Fields } from "../data/form.data";


const Validators = {
    email: (input) => {        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(input)) {
            return "لطفا یک رایان‌نامه معتبر وارد کنید"
        }
        return ""
    },
    password: (input) => {
        const isNonWhiteSpace = /^\S*$/;
        if (!isNonWhiteSpace.test(input)) {
            return "گذرواژه نباید \"فضای سفید\" داشته باشد.";
        }

        // const isContainsUppercase = /^(?=.*[A-Z]).*$/;
        // if (!isContainsUppercase.test(input)) {
        //     return "گذرواژه باید حداقل یک کاراکتر بزرگ انگلیسی داشته باشد.";
        // }

        // const isContainsLowercase = /^(?=.*[a-z]).*$/;
        // if (!isContainsLowercase.test(input)) {
        //     return "گذرواژه باید حداقل یک حرف کوچک انگلیسی داشته باشد.";
        // }

        // const isContainsNumber = /^(?=.*[0-9]).*$/;
        // if (!isContainsNumber.test(input)) {
        //     return "گذرواژه باید حداقل یک عدد داشته باشد.";
        // }

        // const isContainsSymbol =
        //     /^(?=.*[~`!@#$%^&*()--+={}[\]|\\:;"'<>,.?/_₹]).*$/;
        // if (!isContainsSymbol.test(input)) {
        //     return "گذرواژه باید حداقل یک علامت داشته باشد.";
        // }

        // const isValidLength = /^.{8,16}$/;
        // if (!isValidLength.test(input)) {
        //     return "گذرواژه باید بین ۸ تا ۱۶ کاراکتر باشد.";
        // }
        return "";
    },
    studentNumber: (input) => {
        /* TODO: Student Number Verification */

        return ""
    }
}


export function verify(name, value) {
    let error = ""
    if (!Fields[name].required) {
        if (value.trim() !== '') {
        error = Validators[name](value);
        }
    } else {
        if (value.trim() === '') {
        error = "لازم است.";
        } else {
        error = Validators[name](value);
        }
    }
    return error;
}