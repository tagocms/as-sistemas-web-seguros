import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Login, SignUp, User, Users, NewUser } from './elements/screens';
import { useIsAuthenticated } from "./services/authService";
import { PATH } from "./constants/path";

function Navigator() {
    const isAuthenticated = useIsAuthenticated();

    return (
        <BrowserRouter>
            <Routes> 
                <Route path={PATH.USER} element={
                        isAuthenticated
                        ? <User />
                        : <Navigate to={PATH.LOGIN} replace />
                    }
                />
                <Route path={PATH.NEW_USER} element={
                        isAuthenticated
                        ? <NewUser />
                        : <Navigate to={PATH.LOGIN} replace />
                    }
                />
                <Route path={PATH.INDEX} element={
                        isAuthenticated
                        ? <Users />
                        : <Navigate to={PATH.LOGIN} replace />
                    }
                />
                <Route path={PATH.DEFAULT} element={
                        isAuthenticated
                        ? <Navigate to={PATH.INDEX} replace />
                        : <Navigate to={PATH.LOGIN} replace />
                    }
                />
                <Route path={PATH.SIGNUP} element={
                        isAuthenticated
                        ? <Navigate to={PATH.INDEX} replace />
                        : <SignUp />
                    }
                />
                <Route path={PATH.LOGIN} element={
                        isAuthenticated
                        ? <Navigate to={PATH.INDEX} replace />
                        : <Login />
                    }
                />
            </Routes>
        </BrowserRouter>
    )
}

export default Navigator;