
package service;

import java.rmi.registry.LocateRegistry;
import java.rmi.registry.Registry;

public class RMIServer {
    public static void main(String[] args) {
        try {
            Registry reg = LocateRegistry.createRegistry(1099);

            reg.rebind("AuthService", new AuthServiceImpl());
            reg.rebind("ClientService", new ClientServiceImpl());
            reg.rebind("AdminService", new AdminServiceImpl());

            System.out.println("✅ Serveur RMI démarré");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
