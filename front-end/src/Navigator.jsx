import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import {Login, SignUp, User, Users} from './Routes';
import { useIsAuthenticated } from "./services/authService";

function Navigator() {
    const isAuthenticated = useIsAuthenticated();

    return (
        <BrowserRouter>
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
        </BrowserRouter>
    )
}

export default Navigator;