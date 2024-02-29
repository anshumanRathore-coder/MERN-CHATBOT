import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { checkAuthStatus, loginUser, signupUser } from "../helpers/api-communication";

type User={
    name:string;
    email:string;
}

type userAuth={
    isLoggedIn:boolean;
    user:User | null;
    login:(email:string,password:string)=>Promise<void>
    signup:(name:string,email:string,password:string)=>Promise<void>
    logout:()=>Promise<void>
}
export const AuthContext=createContext<userAuth|null>(null)

export const AuthProvider=({children}:{children:ReactNode})=>{
    const [user,setUser]=useState<User|null>(null);
    const [isLoggedIn,setIsLoggedIn]=useState(false);

    useEffect(()=>{
        const userStatus=async()=>{
            const data=await checkAuthStatus();
            if(data){
                setUser({name:data.name,email:data.email});
                setIsLoggedIn(true);
            }
            else{
                setIsLoggedIn(false);
                setUser(null);
            }
        }
        userStatus();
    },[])

    const login=async (email:string,password:string)=>{
        const data=await loginUser(email,password);
        console.log(data);
        try {
            if(data){
                setUser({name:data.name,email:data.email});
                setIsLoggedIn(true);
            }
        } catch (error) {
            alert(error);
        }
    }

    const signup=async (name:string,email:string,password:string)=>{
        const data=await signupUser(name,email,password);
        if(data){
            setUser({name:data.name,email:data.email});
            setIsLoggedIn(true);

        }
    }

    const logout=async ()=>{
        setIsLoggedIn(false);
        setUser(null);
    }

    const value:userAuth={
        user,
        isLoggedIn,
        login,
        signup,
        logout
    }

    return <AuthContext.Provider value={value}>
        {children}
    </AuthContext.Provider>
}

export const userAuth=()=>useContext(AuthContext);