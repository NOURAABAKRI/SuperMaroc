package rmi;

import dto.ProductDTO;
import java.rmi.Remote;
import java.rmi.RemoteException;

public interface AdminService extends Remote {
    void mettreAJourProduit(ProductDTO p) throws RemoteException;
}
