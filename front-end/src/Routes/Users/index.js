import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

function Users() {
    const { logout } = useContext(AuthContext);

    return (
        <button onClick={logout}>Logout</button>
    )
}

export default Users;