import { useEffect, useState } from "react";
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { auth } from "../firebase/firebase.config";
import { AuthContext } from "../hooks/useAuth";


const AuthProvider = ({children}) => {
    const provider = new GoogleAuthProvider();
    const [ user, setUser ] = useState(null);
    const [ loading, setLoading ] = useState(true);
    // console.log(user);

    useEffect(()=> {
        const unSubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            setLoading(false);
        })
        return ()=> unSubscribe();
    },[])

    const createNewUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const updateUserProfile = (displayName, photoURL)=> {
        setLoading(true);
        return updateProfile(auth.currentUser, {
            displayName,
            photoURL
        })
    }

    const loginUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    const logInWithGoogle = () => {
        setLoading(true);
        return signInWithPopup(auth, provider);
    }

    const logOutUser = () => {
        return signOut(auth);
    }

    const userInfo = {
        user,
        loading,
        setLoading,
        setUser,
        createNewUser,
        updateUserProfile,
        loginUser,
        logInWithGoogle,
        logOutUser,
    }

    return (
        <AuthContext.Provider value={userInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;