package mini_admin.agadir.DAO;

import mini_admin.agadir.models.Product;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class ProductDAOAgadir {

    // 1️⃣ — Récupérer tous les produits du magasin Agadir (store_id = 1)
    public List<Product> getAllProducts() {
        List<Product> products = new ArrayList<>();
        String sql = "SELECT * FROM products WHERE store_id = 1";

        try (Connection conn = DBConnectionAgadir.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql);
             ResultSet rs = ps.executeQuery()) {

            while (rs.next()) {
                products.add(extractProduct(rs));
            }

        } catch (SQLException e) {
            e.printStackTrace();
        }
        return products;
    }

    // 2️⃣ — Ajouter un produit
    public boolean addProduct(Product p) {
        String sql = "INSERT INTO products (store_id, category_id, name, price, quantity, description, image_path) " +
                     "VALUES (?,?,?,?,?,?,?)";

        try (Connection conn = DBConnectionAgadir.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {

            ps.setInt(1, p.getStoreId());
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

    
    // 3️⃣ — Mettre à jour un produit
    public boolean updateProduct(Product p) {
        String sql = "UPDATE products SET category_id=?, name=?, price=?, quantity=?, description=?, image_path=? " +
                     "WHERE product_id=? AND store_id=1";

        try (Connection conn = DBConnectionAgadir.getConnection();
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


    // 4️⃣ — Supprimer un produit
    public boolean deleteProduct(int productId) {
        String sql = "DELETE FROM products WHERE product_id=? AND store_id=1";

        try (Connection conn = DBConnectionAgadir.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {

            ps.setInt(1, productId);
            return ps.executeUpdate() > 0;

        } catch (SQLException e) {
            e.printStackTrace();
        }
        return false;
    }


    // 5️⃣ — Récupérer un produit par ID
    public Product getProductById(int id) {
        String sql = "SELECT * FROM products WHERE product_id=? AND store_id=1";

        try (Connection conn = DBConnectionAgadir.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {

            ps.setInt(1, id);
            ResultSet rs = ps.executeQuery();

            if (rs.next()) {
                return extractProduct(rs);
            }

        } catch (SQLException e) {
            e.printStackTrace();
        }
        return null;
    }


    // 6️⃣ — Rechercher un produit (par nom)
    public List<Product> searchProducts(String keyword) {
        List<Product> products = new ArrayList<>();
        String sql = "SELECT * FROM products WHERE store_id=1 AND name LIKE ?";

        try (Connection conn = DBConnectionAgadir.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {

            ps.setString(1, "%" + keyword + "%");
            ResultSet rs = ps.executeQuery();

            while (rs.next()) {
                products.add(extractProduct(rs));
            }

        } catch (SQLException e) {
            e.printStackTrace();
        }
        return products;
    }


    // 🔧 Fonction interne : transforme ResultSet → Product
    private Product extractProduct(ResultSet rs) throws SQLException {
        return new Product(
            rs.getInt("product_id"),
            rs.getInt("store_id"),
            rs.getInt("category_id"),
            rs.getString("name"),
            rs.getDouble("price"),
            rs.getInt("quantity"),
            rs.getString("description"),
            rs.getString("image_path")
        );
    }
}
