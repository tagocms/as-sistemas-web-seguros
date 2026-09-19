export const PATH = {
    INDEX: "/",
    DEFAULT: "/*",
    LOGIN: "/autenticar",
    SIGNUP: "/cadastro",
    USERS: "/usuarios",
    USER: "/usuarios/:username",
    USER_FILLED: (username) => `/usuarios/${username}`,
    NEW_USER: "/novo-usuario"
} 