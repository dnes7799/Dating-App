import axios from "axios";
import Cookies from "js-cookie";
import { useContext, createContext, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import socket from "../socket";
export const AuthContext = createContext({})

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    let isLoggedIn = localStorage.getItem('access_token') ? true : false;
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const navigate = useNavigate();
    const baseUrl = useSelector(state => state.global.baseUrl)

    const login = async data => {

        const response = await axios.post(`${baseUrl}/api/v1/token`, {
            ...data,
        });
        // const { tokens, user } = response && response.data.success;

        // setUser(user);
        //localStorage.setItem('user', JSON.stringify(user));
        if (response.data.isSuccess) {
            setIsAuthenticated(true);
            
            const token = response.data.responseData.access_token;

            localStorage.setItem('access_token', token);
            // socket.auth = { token };
            // socket.connect();
            navigate('/home', {
                replace: true,
            });
        }
    };


    const logout = () => {
        setIsAuthenticated(false);
        localStorage.removeItem('access_token');
        // Cookies.remove('refresh_token');
        isLoggedIn = false;
        // localStorage.removeItem('user');
        navigate('/login');
    };

    return (
        <AuthContext.Provider
            value={{
                logout,
                login,
                isAuthenticated,
                // user,
                isLoggedIn

            }}
        >
            {children}
        </AuthContext.Provider>
    );
}
export { AuthProvider };

export const useAuthContext = () => useContext(AuthContext);