import { Link, useNavigate } from "react-router-dom";
import { ENDPOINTS } from "../../../../constants/endpoints";
import { PATH } from "../../../../constants/path";
import api from "../../../../services/api";
import { Header } from "../../../components";
import { useEffect, useState } from "react";
import { getUsername, getUserScopes, logout } from "../../../../services/authService";
import { translateRole } from "../../../../services/translationService";

function Users() {
    const [users, setUsers] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const userScopes = getUserScopes();
    const hasSufficientScopeFor = (scope) => userScopes.includes(scope);
    const currentUsername = getUsername();

    useEffect(() => {
        if (errorMessage !== "") {
            setSuccessMessage("");
        }
    }, [errorMessage]);

    useEffect(() => {
        if (successMessage !== "") {
            setErrorMessage("");
        }
    }, [successMessage]);

    const navigate = useNavigate();
    const fetchUsers = async () => {
            try {
                const response = await api.get(ENDPOINTS.USERS);
                let data = response.data;
                data = data.map((userResponse) => {
                    return {
                        username: userResponse.username,
                        role: translateRole(userResponse.role)
                    }
                });
                setUsers(data);
                setErrorMessage("");
            } catch (e) {
                console.error("Failed fetching users: \n" + e);
                setErrorMessage("Erro ao buscar usuários. Tente novamente.");
            }
        };

    useEffect(() => {
        fetchUsers();
    }, []);

    const deleteUser = async (username) => {
        try {
            const response = await api.delete(ENDPOINTS.USER(username), {
                username: username
            });
            fetchUsers();
            if (response.status >= 200 && response.status < 300) {
                setSuccessMessage(`Usuário ${username} deletado com sucesso!`);
                if (currentUsername === username) {
                    logout();
                }
            }
        } catch(e) {
            console.error(`Failed deleting user '${username}': \n` + e);
            setErrorMessage(`Erro ao deletar usuário ${username}. Talvez você não possua permissão suficiente.`);
        }
    };

    const createNewUser = () => {
        navigate(PATH.NEW_USER);
    }

    return (
        <div>
            <Header currentScreen="Usuários" />
            {users.length > 0 &&
                <div className="table-container">
                    <table className="users-table">
                        <thead className="users-table-header">
                            <tr>
                                <th>Nome do usuário</th>
                                <th>Papel do usuário</th>
                                <th>Detalhes do usuário</th>
                                {hasSufficientScopeFor("delete") &&
                                    <th>Deletar usuário</th>
                                }
                            </tr>
                        </thead>
                        <tbody className="users-table-body">
                            {
                                users.map((user) => {
                                    return (
                                        <tr key={user.username}>
                                            <td>{user.username}</td>
                                            <td>{user.role}</td>
                                            <td><Link to={PATH.USER_FILLED(user.username)}>{hasSufficientScopeFor("update") ? "Editar" : "Visualizar"}</Link></td>
                                            {hasSufficientScopeFor("delete") &&
                                            <td><button className="users-table-delete-button" onClick={(e) => deleteUser(user.username)}>Deletar</button></td>
                                            }
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            }
            <div className="table-container">
                <button className="create-user-button" onClick={createNewUser}>Criar novo usuário</button>
            </div>
            {errorMessage !== "" &&
                <div className="message-container">
                    <div className="error-message">
                        {errorMessage}
                    </div>
                </div>
            }
            {successMessage !== "" &&
                <div className="message-container">
                    <div className="success-message">
                        {successMessage}
                    </div>
                </div>
            }
        </div>
    )
}

export default Users;