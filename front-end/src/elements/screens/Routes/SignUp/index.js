import { Header, LoginSignUpForm } from "../../../components";
import { useState } from "react";
import api from "../../../../services/api";
import { ENDPOINTS } from "../../../../constants/endpoints";
import { login } from "../../../../services/authService";

function SignUp() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const attemptSignUp = async (e) => {
        e.preventDefault();
        try {  
            const response = await api.post(ENDPOINTS.SIGNUP, {
                username: username,
                password: password,
                role: "CLIENT"
            });
            login(response.data);
            setErrorMessage("");
        } catch (e) {
            console.error("Signup attempt failed: \n" + e);
            setErrorMessage("Erro ao criar conta: " + e);
        }
    };

    return (
       <div>
            <Header currentScreen="Cadastro"/>
            <LoginSignUpForm 
                type="signup"
                username={username} 
                setUsername={setUsername} 
                action={attemptSignUp} 
                errorMessage={errorMessage} 
                password={password}
                setPassword={setPassword}
            />
        </div> 
    )
}

export default SignUp;