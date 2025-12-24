package service;

import dao.ProductDAO;
import dto.ProductDTO;

import java.rmi.server.UnicastRemoteObject;
import java.rmi.RemoteException;

public class AdminServiceImpl extends UnicastRemoteObject
        implements AdminService {

    private ProductDAO dao = new ProductDAO();

    public AdminServiceImpl() throws RemoteException {}

    @Override
    public void updateProduct(ProductDTO p) {
        dao.updateQuantity(p.getProductId(), p.getQuantity());
    }
}

