package santos.tiago.back_end.model;

public class UserRoleRequest {
    private UserRole role;

    public UserRoleRequest(UserRole role) {
        this.role = role;
    }

    public UserRole getRole() {
        return role;
    }

    public void setRole(UserRole role) {
        this.role = role;
    }
}
