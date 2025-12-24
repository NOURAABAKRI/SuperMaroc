package dto;

import java.io.Serializable;

public class UserDTO implements Serializable {
    private int id;
    private String role; // CLIENT / ADMIN / ADMIN_PRINCIPAL

    public UserDTO(int id, String role) {
        this.id = id;
        this.role = role;
    }

    public String getRole() {
        return role;
    }
}
