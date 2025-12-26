package rmi;

import dto.UserDTO;
import java.rmi.Remote;
import java.rmi.RemoteException;

public interface AuthService extends Remote {
    UserDTO login(String email, String password) throws RemoteException;
}
