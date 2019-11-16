import React, { useEffect, useState } from 'react'
import firebase, { app } from "firebase/app";
import 'firebase/auth'

export const AuthContext = React.createContext();

export const AuthProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState("Sean")

    useEffect(() => {
        app.auth().onAuthStateChanged(setCurrentUser)
    }, [])

    return (
        <AuthContext.Provider value = {{currentUser}} >
            {children}
        </AuthContext.Provider>
    )
}



