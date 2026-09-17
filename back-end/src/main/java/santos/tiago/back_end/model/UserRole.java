package santos.tiago.back_end.model;

public enum UserRole {
    ADMIN("ADMIN"),
    OPERATOR("OPERATOR"),
    CLIENT("CLIENT");

    private final String description;

    UserRole(String description) {
        this.description = description;
    }

    public String getDescription() {
        return description;
    }
}
