package mini_admin.casa.DAO;

import mini_admin.casa.models.Product;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class ProductDAOCasa {

    public List<Product> getAllProducts() {
        List<Product> products = new ArrayList<>();
        try (Connection conn = DBConnectionCasa.getConnection();
             Statement stmt = conn.createStatement();
             ResultSet rs = stmt.executeQuery("SELECT * FROM products WHERE store_id=2")) {

            while (rs.next()) {
                Product p = new Product(
                    rs.getInt("product_id"),
                    rs.getInt("store_id"),
                    rs.getInt("category_id"),
                    rs.getString("name"),
                    rs.getDouble("price"),
                    rs.getInt("quantity"),
                    rs.getString("description"),
                    rs.getString("image_path")
                );
                products.add(p);
            }

        } catch (SQLException e) {
            e.printStackTrace();
        }
        return products;
    }

    public boolean addProduct(Product p) {
        String sql = "INSERT INTO products (store_id, category_id, name, price, quantity, description, image_path) VALUES (?,?,?,?,?,?,?)";

        try (Connection conn = DBConnectionCasa.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {

            ps.setInt(1, 2);  // CASA = store_id 2
            ps.setInt(2, p.getCategoryId());
            ps.setString(3, p.getName());
            ps.setDouble(4, p.getPrice());
            ps.setInt(5, p.getQuantity());
            ps.setString(6, p.getDescription());
            ps.setString(7, p.getImagePath());

            return ps.executeUpdate() > 0;

        } catch (SQLException e) {
            e.printStackTrace();
        }
        return false;
    }

    public boolean updateProduct(Product p) {
        String sql = "UPDATE products SET category_id=?, name=?, price=?, quantity=?, description=?, image_path=? WHERE product_id=? AND store_id=2";

        try (Connection conn = DBConnectionCasa.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {

            ps.setInt(1, p.getCategoryId());
            ps.setString(2, p.getName());
            ps.setDouble(3, p.getPrice());
            ps.setInt(4, p.getQuantity());
            ps.setString(5, p.getDescription());
            ps.setString(6, p.getImagePath());
            ps.setInt(7, p.getProductId());

            return ps.executeUpdate() > 0;

        } catch (SQLException e) {
            e.printStackTrace();
        }
        return false;
    }

    public boolean deleteProduct(int id) {
        String sql = "DELETE FROM products WHERE product_id=? AND store_id=2";

        try (Connection conn = DBConnectionCasa.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {

            ps.setInt(1, id);
            return ps.executeUpdate() > 0;

        } catch (SQLException e) {
            e.printStackTrace();
        }
        return false;
    }
}
