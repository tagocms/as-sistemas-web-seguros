import { jwtDecode } from "jwt-decode";

export function useAuth(callback) {
    const TOKEN_KEY = "@sistemas_web_seguros-TAGOCMS-TOKEN";
    const isTokenValid = token => {
        if (token === null || token === undefined) {
            return false;
        }
        try {
            const decoded = jwtDecode(token);
            if (decoded.exp * 1000 >= Date.now()) {
                return true;
            } else {
                return false;
            }
        } catch (e) {
            return false;
        }
    };
    const getToken = () => localStorage.getItem(TOKEN_KEY);
    const isAuthenticated = () => isTokenValid(getToken());
    const getUserScopes = () => {
        const token = getToken();
        if (isTokenValid(token)) {
            return jwtDecode(token).scope.split(" ");
        }
        return [];
    };
    const login = token => {
        if (isTokenValid(token)) {
            localStorage.setItem(TOKEN_KEY, token);
            if (callback) {
                callback(isAuthenticated());
            }
        }
    };
    const logout = () => {
        localStorage.removeItem(TOKEN_KEY);
        if (callback) {
                callback(isAuthenticated());
        }
    };

    return {
        isTokenValid,
        getToken,
        isAuthenticated,
        getUserScopes,
        login,
        logout
    }
};