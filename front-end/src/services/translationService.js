export const translateRole = (role) => {
    switch (role) {
        case "ADMIN": return "Administrador";
        case "OPERATOR": return "Operador";
        case "CLIENT": return "Cliente";
        default: return "Cliente";
    }
}