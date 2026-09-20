import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Login, SignUp, User, Users, NewUser } from './elements/screens';
import { getUsername, getUserScopes, useIsAuthenticated } from "./services/authService";
import { PATH } from "./constants/path";

function Navigator() {
    const isAuthenticated = useIsAuthenticated();
    const userScopes = getUserScopes();
    const hasSufficientScopeFor = (scope) => userScopes.includes(scope);
    const username = getUsername();

    return (
        <BrowserRouter>
            <Routes> 
                <Route path={PATH.USER_FILLED(username)} element={
                        isAuthenticated
                        ? <User usernameAsProp={username} />
                        : <Navigate to={PATH.LOGIN} replace />
                    }
                />
                <Route path={PATH.USER} element={
                        isAuthenticated
                        ? (
                            hasSufficientScopeFor("read") 
                            ? <User />
                            : <Navigate to={PATH.USER_FILLED(username)} replace />
                        )
                        : <Navigate to={PATH.LOGIN} replace />
                    }
                />
                <Route path={PATH.NEW_USER} element={
                        isAuthenticated
                        ? (
                            hasSufficientScopeFor("create")
                            ? <NewUser />
                            : <Navigate to={PATH.INDEX} replace />
                        )
                        : <Navigate to={PATH.LOGIN} replace />
                    }
                />
                <Route path={PATH.INDEX} element={
                        isAuthenticated
                        ? (
                            hasSufficientScopeFor("read")
                            ? <Users />
                            : <Navigate to={PATH.USER_FILLED(username)} replace />
                        )
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