import { logout } from "../../services/authService";

function Users() {
    return (
        <button onClick={logout}>Logout</button>
    )
}

export default Users;