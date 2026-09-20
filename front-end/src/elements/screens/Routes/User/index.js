import { useParams } from "react-router-dom";
import { Header } from "../../../components";

function User({usernameAsProp}) {
    const params = useParams();
    const username = usernameAsProp ? usernameAsProp : params.username;

    return (
        <div>
            <Header currentScreen={username}/>
        </div>
    )
}

export default User;