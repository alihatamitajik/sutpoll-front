// Copyright (c) 2022 Ali Hatami
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { useContext } from "react";
import AuthContext from "../contexts/AuthProvider";


const useAuth = () => {
    return useContext(AuthContext);
}

export default useAuth;