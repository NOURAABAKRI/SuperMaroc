package mini_admin.casa.DAO;

import mini_admin.casa.models.Order;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class OrderDAOCasa {

    public List<Order> getAllOrders() {
        List<Order> orders = new ArrayList<>();
        try (Connection conn = DBConnectionCasa.getConnection();
             Statement stmt = conn.createStatement();
             ResultSet rs = stmt.executeQuery("SELECT * FROM orders WHERE store_id=2")) {

            while (rs.next()) {
                Order o = new Order(
                    rs.getInt("order_id"),
                    rs.getInt("store_id"),
                    rs.getInt("product_id"),
                    rs.getInt("quantity"),
                    rs.getTimestamp("order_date")
                );
                orders.add(o);
            }

        } catch (SQLException e) {
            e.printStackTrace();
        }
        return orders;
    }
}
