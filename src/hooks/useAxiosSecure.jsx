import axios from 'axios';
import React from 'react';

const useAxiosSecure = () => {

    const instance = axios.create({
        baseURL : 'http://localhost:5000',
    })

    return instance;
};

export default useAxiosSecure;