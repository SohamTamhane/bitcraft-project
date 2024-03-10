import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const Context = createContext();

const AppContext = ({children}) => {

    const [loginInfo, setLoginInfo] = useState();
    const [signUpInfo, setSignUpInfo] = useState();

    async function getUser(){
        await axios.post(process.env.REACT_APP_BASE_URL+'/auth/get-user', {email: loginInfo?.user?.email})
            .then(response => {
                setLoginInfo({status: true, user: response?.data?.user});
            })
            .catch(error => {
                console.log(error);
            });
    }

    return(
        <Context.Provider value={{
            loginInfo, setLoginInfo, signUpInfo, setSignUpInfo, getUser
        }}>
            {children}
        </Context.Provider>
    )
}
export default AppContext;