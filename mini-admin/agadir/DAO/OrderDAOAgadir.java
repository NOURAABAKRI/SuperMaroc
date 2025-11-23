package mini_admin.agadir.DAO;

import mini_admin.agadir.models.Order;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class OrderDAOAgadir {

    public List<Order> getAllOrders() {
        List<Order> orders = new ArrayList<>();
        try (Connection conn = DBConnectionAgadir.getConnection();
             Statement stmt = conn.createStatement();
             ResultSet rs = stmt.executeQuery("SELECT * FROM orders WHERE store_id=1")) {

            while (rs.next()) {
                Order o = new Order(
                    rs.getInt("order_id"),
                    rs.getInt("store_id"),
                    rs.getInt("employee_id"),
                    rs.getDouble("total_price"),
                    rs.getTimestamp("created_at")
                );
                orders.add(o);
            }

        } catch (SQLException e) {
            e.printStackTrace();
        }
        return orders;
    }

    public boolean addOrder(Order o) {
        String sql = "INSERT INTO orders (store_id, employee_id, total_price) VALUES (?,?,?)";
        try (Connection conn = DBConnectionAgadir.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {

            ps.setInt(1, o.getStoreId());
            ps.setInt(2, o.getEmployeeId());
            ps.setDouble(3, o.getTotalPrice());

            return ps.executeUpdate() > 0;

        } catch (SQLException e) {
            e.printStackTrace();
        }
        return false;
    }

    // TODO: ajouter updateOrderStatus, deleteOrder...
}
