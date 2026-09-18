import { useContext, useState } from 'react';
import api from '../../services/api';
import { AuthContext } from '../../context/AuthContext';

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const { login } = useContext(AuthContext);

    const basicAuthenticationToken = () => `Basic ${btoa(username + ":" + password)}`;
    const attemptLogin = async () => {
        try {  
            const response = await api.post("/autenticar", {}, {
                headers: {
                    "Authorization": basicAuthenticationToken(),
                }  
            });
            login(response.data);
        } catch (e) {
            console.log(e);
        }
    }

    return (
            <form onSubmit={(e) => e.preventDefault()}>
                <input type="text" placeholder='Nome do usuário' value={username} onChange={(newValue) => setUsername(newValue.target.value)}/>
                <input type="password" placeholder='Senha' value={password} onChange={(newValue) => setPassword(newValue.target.value)}/>
                <button onClick={attemptLogin}>Realizar o Login</button>
            </form>
            
        )
}

export default Login;