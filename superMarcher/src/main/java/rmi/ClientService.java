
package rmi;

import dto.ProductDTO;
import java.rmi.Remote;
import java.rmi.RemoteException;
import java.util.List;

public interface ClientService extends Remote {
    List<ProductDTO> consulterProduits() throws RemoteException;
    void ajouterAuPanier(int produitId, int qte) throws RemoteException;
}
