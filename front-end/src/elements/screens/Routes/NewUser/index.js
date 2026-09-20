import { useState } from "react";
import { Header, LoginSignUpForm } from "../../../components";
import { useNavigate } from "react-router-dom";
import api from "../../../../services/api";
import { ENDPOINTS } from "../../../../constants/endpoints";
import { hasSufficientScopeFor } from "../../../../services/authService";
import { PATH } from "../../../../constants/path";

function User() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const hasSufficientScope = (scope) => hasSufficientScopeFor(scope);
    const navigate = useNavigate();

    const createUser = async (e) => {
        e.preventDefault();
        if (!hasSufficientScope("create")) {
            navigate(PATH.INDEX);
            return;
        }
        try {
            await api.post(ENDPOINTS.USERS, {
                username: username,
                password: password,
                role: "CLIENT"
            });
            navigate(PATH.INDEX);
        } catch (e) {
            console.error("Unable to create user: " + e);
            setErrorMessage("Não foi possível criar o usuário.")
        }
    };

    return (
        <div>
            <Header currentScreen="Novo Usuário" />
            <LoginSignUpForm 
                username={username}
                setUsername={setUsername}
                password={password}
                setPassword={setPassword}
                errorMessage={errorMessage}
                action={createUser}
                type="newUser"
            />
        </div>
    )
}

export default User;