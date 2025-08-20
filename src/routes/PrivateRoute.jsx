import React from 'react';
import useAuth from '../hooks/useAuth';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({children}) => {

    const { loading, user } = useAuth();
    const location = useLocation();

    if (loading) {
        return <p>Loading.........</p>
    }

    if (user) {
        return children;
    }

    return (<Navigate state={location.pathname} to={'/auth/login'} />);
};

export default PrivateRoute;