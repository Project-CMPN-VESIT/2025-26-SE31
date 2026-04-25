import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/auth.service';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [adminUser, setAdminUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        // Try to restore user session
        const userData = await authService.getUserSession();
        if (userData?.user && userData.user.role === 'user') {
          setUser(userData.user);
        } else if (userData?.token) {
          const decoded = jwtDecode(userData.token);
          if (decoded.role === 'user') setUser({ ...decoded, id: decoded.id });
        }

        // Try to restore admin session
        const adminData = await authService.getAdminSession();
        if (adminData?.user && adminData.user.role === 'admin') {
          setAdminUser(adminData.user);
        } else if (adminData?.token) {
          const decoded = jwtDecode(adminData.token);
          if (decoded.role === 'admin') setAdminUser({ ...decoded, id: decoded.id });
        }
      } catch (err) {
        console.error("Session restoration partially failed", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSessions();
  }, []);

  const login = async (credentials) => {
    const data = await authService.login(credentials);
    const userRole = data.role;
    
    let decoded = {};
    if (data.token) {
       decoded = jwtDecode(data.token);
    }

    const sessionObj = data.user || { ...decoded, id: decoded.id, role: userRole };

    if (userRole === 'admin') {
      setAdminUser(sessionObj);
    } else {
      setUser(sessionObj);
    }

    return { userRole, data };
  };

  const logout = async () => {
    await authService.logout().catch(() => {});
    setUser(null);
  };

  const logoutAdmin = async () => {
    await authService.logoutAdmin().catch(() => {});
    setAdminUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, adminUser, login, signup: authService.signup, logout, logoutAdmin, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
