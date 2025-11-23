package mini_admin.casa.DAO;

import mini_admin.casa.models.ExpiredProduct;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class ExpiredProductDAOCasa {

    public List<ExpiredProduct> getAllExpiredProducts() {
        List<ExpiredProduct> list = new ArrayList<>();
        String sql = "SELECT * FROM expired_products WHERE store_id=2";

        try (Connection conn = DBConnectionCasa.getConnection();
             Statement stmt = conn.createStatement();
             ResultSet rs = stmt.executeQuery(sql)) {

            while (rs.next()) {
                ExpiredProduct ep = new ExpiredProduct(
                    rs.getInt("expired_id"),
                    rs.getInt("store_id"),
                    rs.getInt("product_id"),
                    rs.getInt("quantity"),
                    rs.getDate("expiration_date")
                );
                list.add(ep);
            }

        } catch (SQLException e) {
            e.printStackTrace();
        }
        return list;
    }

    public boolean addExpiredProduct(ExpiredProduct ep) {
        String sql = "INSERT INTO expired_products (store_id, product_id, quantity, expiration_date) VALUES (?,?,?,?)";

        try (Connection conn = DBConnectionCasa.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {

            ps.setInt(1, ep.getStoreId());
            ps.setInt(2, ep.getProductId());
            ps.setInt(3, ep.getQuantity());
            ps.setDate(4, new java.sql.Date(ep.getExpirationDate().getTime()));

            return ps.executeUpdate() > 0;

        } catch (SQLException e) {
            e.printStackTrace();
        }
        return false;
    }

    public boolean deleteExpiredProduct(int expiredId) {
        String sql = "DELETE FROM expired_products WHERE expired_id=? AND store_id=2";

        try (Connection conn = DBConnectionCasa.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {

            ps.setInt(1, expiredId);

            return ps.executeUpdate() > 0;

        } catch (SQLException e) {
            e.printStackTrace();
        }
        return false;
    }
}
