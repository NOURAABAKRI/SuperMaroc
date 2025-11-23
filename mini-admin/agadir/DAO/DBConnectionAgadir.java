package mini_admin.agadir.DAO;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class DBConnectionAgadir {
    private static final String URL = "jdbc:mysql://localhost:3306/supermaroc";
    private static final String USER = "root";
    private static final String PASSWORD = "Azertyuiop1234."; // mettre le mot de passe de ta base

    private static Connection connection;

    public static Connection getConnection() throws SQLException {
        if (connection == null || connection.isClosed()) {
            connection = DriverManager.getConnection(URL, USER, PASSWORD);
        }
        return connection;
    }

    public static void closeConnection() {
        try {
            if (connection != null && !connection.isClosed()) {
                connection.close();
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
}
