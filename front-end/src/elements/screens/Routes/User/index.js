import { useParams } from "react-router-dom";
import { Header } from "../../../components";

function User() {
    const {username} = useParams();

    return (
        <div>
            <Header currentScreen={username}/>
        </div>
    )
}

export default User;