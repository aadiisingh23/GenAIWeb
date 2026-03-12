import React, { createContext, useState, useEffect } from 'react';


export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true); 

    return (
        <AuthContext.Provider value={{ loading, setLoading, user, setUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
