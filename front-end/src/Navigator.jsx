import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import {Login, SignUp, User, Users} from './Routes';
import { useAuth } from "./services/auth";
import { useState, useEffect, useCallback } from "react";
import { AuthContext } from "./context/AuthContext";

function Navigator() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const updateAuthState = useCallback((isAuthenticated) => {
        console.log("callback chamado");
        setIsAuthenticated(isAuthenticated);
    }, []);
    const authViewModel = useAuth(updateAuthState);
    

    useEffect(() => {
        if (isAuthenticated !== authViewModel.isAuthenticated()) {
            setIsAuthenticated(authViewModel.isAuthenticated());
        }
        
    }, []);

    return (
        <BrowserRouter>
            <AuthContext value={authViewModel}>
                <Routes> 
                    <Route path="/usuarios/:username" element={
                            isAuthenticated
                            ? <User />
                            : <Navigate to="/" replace />
                        }
                    />
                    <Route path="/" element={
                            isAuthenticated
                            ? <Users />
                            : <Navigate to="/login" replace />
                        }
                    />
                    <Route path="/*" element={
                            isAuthenticated
                            ? <Navigate to="/" replace />
                            : <Navigate to="/login" replace />
                        }
                    />
                    <Route path="/cadastro" element={
                            isAuthenticated
                            ? <Navigate to="/" replace />
                            : <SignUp />
                        }
                    />
                    <Route path="/login" element={
                            isAuthenticated
                            ? <Navigate to="/" replace />
                            : <Login />
                        }
                    />
                </Routes>
            </AuthContext>
        </BrowserRouter>
    )
}

export default Navigator;