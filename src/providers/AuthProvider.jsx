import { createContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { auth } from "../firebase/firebase.config";
import { GoogleAuthProvider } from "firebase/auth/web-extension";

export const AuthContext = createContext();
const provider = new GoogleAuthProvider();

const AuthProvider = ({children}) => {

    const [ user, setUser ] = useState(null);
    console.log(user);
    

    useEffect(()=> {
        const unSubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
        })
        return ()=> unSubscribe();
    },[])

    const createNewUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const updateUserProfile = (displayName, photoURL)=> {
        return updateProfile(auth.currentUser, {
            displayName,
            photoURL
        })
    }

    const loginUser = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    }

    const logInWithGoogle = () => {
        return signInWithPopup(auth, provider);
    }

    const logOutUser = () => {
        return signOut(auth);
    }

    const userInfo = {
        user,
        setUser,
        createNewUser,
        updateUserProfile,
        loginUser,
        logInWithGoogle,
        logOutUser,
    }

    return (
        <AuthContext value={userInfo}>
            {children}
        </AuthContext>
    );
};

export default AuthProvider;