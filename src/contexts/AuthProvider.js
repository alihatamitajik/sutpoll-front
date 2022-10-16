// Copyright (c) 2022 Ali Hatami
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { createContext, useEffect, useState } from "react";
import { useCookies } from 'react-cookie';

const AuthContext = createContext({});

export const AuthProvider = ({children}) => {
    const [ cookies, setCookies] = useCookies(['auth']);
    const [auth, setAuth] = useState(cookies.auth? cookies.auth: {});

    useEffect(() => {
        setCookies('auth', auth, {path: "/"})
    }, [auth])

    return (
        <AuthContext.Provider value={{auth, setAuth}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;