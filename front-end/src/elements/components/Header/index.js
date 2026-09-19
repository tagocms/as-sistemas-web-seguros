import { Link } from "react-router-dom";
import { useIsAuthenticated } from "../../../services/authService"
import { PATH } from "../../../constants/path";
import { logout } from "../../../services/authService";
import { getUsername } from "../../../services/authService";

function UsersAndLogout() {
    const username = getUsername();

    return (
        <div className="header-link-group">
            <Link to={PATH.USERS}>Usuários</Link>
            <div style={{margin: "0px 12px"}}>Logado como {username}</div>
            <button onClick={logout}>Sair da conta</button>
        </div>
    )
}

function LoginAndSignup() {
    return (
        <div className="header-link-group">
            <Link to={PATH.LOGIN}>Autenticar</Link>
            <Link to={PATH.SIGNUP}>Cadastro</Link>
        </div>
    )
}

function Header({currentScreen}) {
    const isAuthenticated = useIsAuthenticated();
    return (
        <div className="header">
            <h1>{currentScreen}</h1>
            { isAuthenticated &&
                <UsersAndLogout />
            }
            { !isAuthenticated &&
                <LoginAndSignup />
            }
        </div>
    )
}

export default Header;