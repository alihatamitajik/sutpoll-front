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
    student_number: {
        logo: UilUniversity,
        required: true,
        props: {
            type:"text",
            name:"student_number",
            id:"studentNumber",
            placeholder:"شماره دانشجویی"
        }
    },
    national_id: {
        logo: UilPadlock,
        required: true,
        props: {
            type:"password",
            name:"national_id",
            id:"nationalId",
            placeholder:"کد ملی",
            style: {
                direction: "ltr"
            }
        }
    }
}
