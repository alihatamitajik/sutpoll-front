// Copyright (c) 2022 Ali Hatami
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import {
    UilAt,
    UilPadlock,
    UilUniversity
} from "@iconscout/react-unicons"

export const Fields = {
    email: {
        logo: UilAt,
        required: true,
        props: {
            type:"email",
            name:"email",
            id:"email",
            placeholder:"رایان‌نامه",
            style: {
                direction: "ltr"
            }
        }
    },
    studentNumber: {
        logo: UilUniversity,
        required: true,
        props: {
            type:"text",
            name:"studentNumber",
            id:"studentNumber",
            placeholder:"شماره دانشجویی"
        }
    },
    password: {
        logo: UilPadlock,
        required: true,
        props: {
            type:"password",
            name:"password",
            id:"password",
            placeholder:"گذرواژه",
            style: {
                direction: "ltr"
            }
        }
    }
}
