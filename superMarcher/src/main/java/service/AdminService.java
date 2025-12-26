package service;
import dto.ProductDTO;
import java.rmi.Remote;
import java.rmi.RemoteException;

public interface AdminService extends Remote {
    void updateProduct(ProductDTO p) throws RemoteException;
}
