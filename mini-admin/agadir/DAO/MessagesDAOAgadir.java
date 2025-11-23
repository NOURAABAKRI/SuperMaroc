package mini_admin.agadir.DAO;

import mini_admin.agadir.models.Message;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class MessagesDAOAgadir {

    public List<Message> getAllMessages() {
        List<Message> messages = new ArrayList<>();
        String sql = "SELECT * FROM messages WHERE store_id=1";
        try (Connection conn = DBConnectionAgadir.getConnection();
             Statement stmt = conn.createStatement();
             ResultSet rs = stmt.executeQuery(sql)) {

            while (rs.next()) {
                Message m = new Message(
                    rs.getInt("message_id"),
                    rs.getInt("store_id"),
                    rs.getString("content"),
                    rs.getTimestamp("created_at")
                );
                messages.add(m);
            }

        } catch (SQLException e) {
            e.printStackTrace();
        }
        return messages;
    }

    public boolean addMessage(Message m) {
        String sql = "INSERT INTO messages (store_id, content) VALUES (?,?)";
        try (Connection conn = DBConnectionAgadir.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {

            ps.setInt(1, m.getStoreId());
            ps.setString(2, m.getContent());

            return ps.executeUpdate() > 0;

        } catch (SQLException e) {
            e.printStackTrace();
        }
        return false;
    }
}
