import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import {Login, SignUp, User, Users} from './Routes';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            isAuthenticated: false
        }
    }

    render() {
        return (
            <BrowserRouter>
                <Routes> 
                        <Route path="/usuarios/:username" element={
                                this.state.isAuthenticated 
                                ? <User />
                                : <Navigate to="/" replace />
                            }
                        />
                        <Route path="/*" element={
                                this.state.isAuthenticated 
                                ? <Users />
                                : <Navigate to="/login" replace />
                            }
                        />
                        <Route path="/cadastro" element={
                                this.state.isAuthenticated 
                                ? <Navigate to="/" replace />
                                : <SignUp />
                            }
                        />
                        <Route path="/login" element={
                                this.state.isAuthenticated 
                                ? <Navigate to="/" replace />
                                : <Login />
                            }
                        />
                </Routes>
            </BrowserRouter>
        )
    }
}

export default Home;