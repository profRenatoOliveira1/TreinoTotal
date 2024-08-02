import React from 'react';
import { Navigate } from 'react-router-dom';

/**
 * Lida com a proteção das rotas
 * @param {*} param0 
 * @returns 
 */
const ProtectedRoute = ({ element: Element, ...rest }) => {
    const isAuthenticated = !!localStorage.getItem('token');

    return isAuthenticated ? <Element {...rest} /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
