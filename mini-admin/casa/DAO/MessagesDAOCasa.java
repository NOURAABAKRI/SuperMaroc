package mini_admin.casa.DAO;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;

public class MessagesDAOCasa {

    public boolean saveMessage(String content) {
        String sql = "INSERT INTO messages (store_id, content) VALUES (2, ?)";

        try (Connection conn = DBConnectionCasa.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {

            ps.setString(1, content);
            return ps.executeUpdate() > 0;

        } catch (SQLException e) {
            e.printStackTrace();
        }
        return false;
    }
}
