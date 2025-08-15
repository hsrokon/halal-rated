import React, { createContext } from 'react';

export const AuthContext = createContext();

const Context = () => {
    return AuthContext;
};

export default Context;