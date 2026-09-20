import { useNavigate, useParams } from "react-router-dom";
import { Header } from "../../../components";
import { useEffect, useState } from "react";
import api from "../../../../services/api";
import { ENDPOINTS } from "../../../../constants/endpoints";
import { canEditRole, getUsername, hasSufficientScopeFor, logout } from "../../../../services/authService";
import { PATH } from "../../../../constants/path";
import { translateRole } from "../../../../services/translationService";

function User({usernameAsProp}) {
    const params = useParams();
    const pathUsername = usernameAsProp ? usernameAsProp : params.username;
    const currentUsername = getUsername();

    const [errorMessage, setErrorMessage] = useState("");
    const [username, setUsername] = useState(pathUsername);
    const [role, setRole] = useState("");
    const [newRole, setNewRole] = useState("");

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await api.get(ENDPOINTS.USER(pathUsername));
                const user = response.data;
                setUsername(user.username);
                setRole(user.role);
                setNewRole(user.role)
            } catch (e) {
                console.error("Unable to fetch user: " + e);
                setErrorMessage(`Não foi possível acessar dados do usuário ${pathUsername}. Tente novamente.`)
            }
            
        };
        fetchUser();
    }, [pathUsername]);

    const hasSufficientScope = (scope) => hasSufficientScopeFor(scope);
    const canEdit = (role) => canEditRole(role);
    const roleOptions = (() => {
        if (hasSufficientScope("create")) {
            return ["ADMIN", "OPERATOR", "CLIENT"]
        } else if (hasSufficientScope("update")) {
            return ["OPERATOR", "CLIENT"]
        } else {
            return []
        }
    })();
    const navigate = useNavigate();

    const deleteUser = async (username) => {
        try {
            const response = await api.delete(ENDPOINTS.USER(username), {
                username: username
            });
            if (response.status >= 200 && response.status < 300) {
                if (currentUsername === username) {
                    logout();
                } else {
                    navigate(PATH.INDEX);
                }
            }
        } catch(e) {
            console.error(`Failed deleting user '${username}': \n` + e);
            setErrorMessage(`Erro ao deletar usuário ${username}. Talvez você não possua permissão suficiente.`);
        }
    };

    const updateUser = async () => {
        try {
            await api.put(ENDPOINTS.USER(username), {
                role: newRole
            });
            navigate(PATH.INDEX);
        } catch (e) {
            console.error(`Failed updating user ${username}: ` + e);
            setErrorMessage(`Erro ao atualizar usuário ${username}. Talvez você não possua permissão suficiente.`);
        }
    }

    return (
        <div>
            <Header currentScreen={pathUsername}/>
            <div className="table-container">
                <table className="users-table">
                    <thead className="users-table-header">
                        <tr>
                            <th>Nome do usuário</th>
                            <th>Papel do usuário</th>
                            {hasSufficientScope("delete") &&
                                <th>Deletar usuário</th>
                            }
                        </tr>
                    </thead>
                    <tbody className="users-table-body">
                        <tr>
                            <td>{username}</td>
                            <td>{translateRole(role)}</td>
                            {hasSufficientScope("delete") &&
                                <td><button className="users-table-delete-button" onClick={(e) => deleteUser(username)}>Deletar</button></td>
                            }
                        </tr>
                    </tbody>
                </table>
            </div>
            {canEdit(role) &&
                <div style={{flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
                    <div style={{marginBottom: "24px"}}>
                        <label htmlFor="roles" style={{margin: "12px"}}>Novo papel</label>
                        <select id="roles" value={newRole} onChange={(e) => setNewRole(e.target.value)}>
                            <option value="">Selecione uma opção</option>
                            {
                                roleOptions.map((option) => {
                                    return <option value={option} key={option}>{translateRole(option)}</option>
                                })
                            }
                        </select>
                    </div>
                    <button className="create-user-button" onClick={updateUser}>Atualizar papel do usuário</button>
                    {errorMessage !== "" &&
                        <div className="message-container">
                            <div className="error-message">
                                {errorMessage}
                            </div>
                        </div>
                    }
                </div>
            }
        </div>
    )
}

export default User;