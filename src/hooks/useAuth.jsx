import React, { createContext, useContext } from 'react';

export const AuthContext = createContext();

const useAuth = () => {
    const context = useContext(AuthContext);

    return context;
};

export default useAuth;