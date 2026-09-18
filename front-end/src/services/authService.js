import { jwtDecode } from "jwt-decode";
import { useState, useEffect } from "react";

const TOKEN_KEY = "@sistemas_web_seguros-TAGOCMS-TOKEN";

let authChangeSubscribers = [];
const publishToAuthChangesSubscribers = () => {
    authChangeSubscribers.forEach(fn => fn());
}
export const subscribeToAuthChanges = (fn) => {
    authChangeSubscribers.push(fn);
    return () => {
        const index = authChangeSubscribers.indexOf(fn);
        if (index > -1) {
            authChangeSubscribers.splice(index, 1);
        }
    };
}

export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const isTokenValid = token => {
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
export const isTokenInStorage = () => getToken() !== null && getToken() !== undefined;
export const isStoredTokenValid = () => isTokenValid(getToken());

export const getUserScopes = () => {
    const token = getToken();
    if (isTokenValid(token)) {
        try {
            return jwtDecode(token).scope.split(" ");
        } catch (e) {
            return [];
        }

    }
    return [];
};

export const login = token => {
    if (isTokenValid(token)) {
        localStorage.setItem(TOKEN_KEY, token);
        publishToAuthChangesSubscribers();
    } else {
        throw new Error("Unable to login because token is invalid.");
    }
};
export const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    publishToAuthChangesSubscribers();
};

export function useIsAuthenticated() {
    const [isAuthenticated, setIsAuthenticated] = useState(isStoredTokenValid());

    useEffect(() => {
        const unsubscribe = subscribeToAuthChanges(() => {
            setIsAuthenticated(isStoredTokenValid());
        });

        return unsubscribe;
    }, []);

    const handleVisibilityChange = () => {
        setIsAuthenticated(isStoredTokenValid());
    };

    useEffect(() => {
        document.addEventListener('visibilitychange', handleVisibilityChange);

        return () => {
            document.removeEventListener('visibilitychange', handleVisibilityChange);
        };
    }, []);

    return isAuthenticated;
}