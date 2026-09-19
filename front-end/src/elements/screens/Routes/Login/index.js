import { useState } from 'react';
import api from '../../../../services/api';
import { login } from '../../../../services/authService';
import { ENDPOINTS } from '../../../../constants/endpoints';
import '../../../../style/App.css';

import { Header, LoginSignUpForm } from '../../../components';

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const basicAuthenticationToken = () => `Basic ${btoa(username + ":" + password)}`;
    const attemptLogin = async (e) => {
        e.preventDefault();
        try {  
            const response = await api.post(ENDPOINTS.AUTHENTICATE, {}, {
                headers: {
                    "Authorization": basicAuthenticationToken(),
                }  
            });
            login(response.data);
            setErrorMessage("");
        } catch (e) {
            console.error("Login attempt failed: \n" + e);
            setErrorMessage("Erro ao autenticar: usuário e/ou senha inválidos.");
        }
    }

    return (
        <div>
            <Header currentScreen="Autenticar"/>
            <LoginSignUpForm 
                type="login"
                username={username} 
                setUsername={setUsername} 
                action={attemptLogin} 
                errorMessage={errorMessage} 
                password={password}
                setPassword={setPassword}
            />
        </div> 
        )
}

export default Login;