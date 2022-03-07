import React,{useState,useContext,createContext, useEffect} from 'react'


const authContext = createContext()

export function AuthProvider({children}) {
    const auth = useProvideAuth()
    return <authContext.Provider value={auth}>{children}</authContext.Provider>
}

export const useAuth = () => {
    return useContext(authContext)
}

const useProvideAuth = () =>{
   
    const Login = async (user) => {
        return console.log(user)
    }
    const Register = async (user) => {
        return console.log(user)
    }

    return {
        Login,
        Register
    }
}