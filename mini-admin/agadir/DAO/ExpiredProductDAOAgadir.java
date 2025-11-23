package mini_admin.agadir.DAO;

import mini_admin.agadir.models.ExpiredProduct;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class ExpiredProductDAOAgadir {

    public List<ExpiredProduct> getAllExpiredProducts() {
        List<ExpiredProduct> list = new ArrayList<>();
        String sql = "SELECT * FROM expired_products WHERE store_id=1";
        try (Connection conn = DBConnectionAgadir.getConnection();
             Statement stmt = conn.createStatement();
             ResultSet rs = stmt.executeQuery(sql)) {

            while (rs.next()) {
                ExpiredProduct ep = new ExpiredProduct(
                    rs.getInt("expired_id"),
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

    // TODO: ajouter addExpiredProduct, deleteExpiredProduct...
}
