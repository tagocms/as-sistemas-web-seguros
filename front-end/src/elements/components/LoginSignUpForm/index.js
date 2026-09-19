import { Link } from "react-router-dom";
import { PATH } from "../../../constants/path";

function LoginSignUpForm({type, errorMessage, action, username, password, setUsername, setPassword}) {
    return (
        <div>
            <form onSubmit={(e) => action(e)}>
                <input type="text" placeholder='Nome do usuário' value={username} onChange={(newValue) => setUsername(newValue.target.value)}/>
                <input type="password" placeholder='Senha' value={password} onChange={(newValue) => setPassword(newValue.target.value)}/>
                <button type="submit">
                    {type === 'login' && "Realizar o Login"}
                    {type === 'signup' && "Criar conta"}
                </button>
                {type === 'login' &&
                    <Link to={PATH.SIGNUP}>Criar uma conta</Link>
                }
                {type === 'signup' &&
                    <Link to={PATH.LOGIN}>Entrar com uma conta já existente</Link>
                }
                
            </form>
            <div className="message-container">
                <div className="error-message">
                    {errorMessage}
                </div>
            </div>
        </div>
    )
}

export default LoginSignUpForm;