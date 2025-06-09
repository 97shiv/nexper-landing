import { useState, useEffect } from 'react';

const ADMIN_EMAIL = 'admin@nexpert.com';
const ADMIN_PASSWORD = 'adminpassword';

export function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = (credentials) => {
    if (credentials.email === ADMIN_EMAIL && credentials.password === ADMIN_PASSWORD) {
      const adminUser = {
        id: 'admin',
        name: 'Admin User',
        email: ADMIN_EMAIL,
        role: 'admin',
      };
      setUser(adminUser);
      localStorage.setItem('user', JSON.stringify(adminUser));
      return adminUser;
    }
    
    const users = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
    const foundUser = users.find(u => u.email === credentials.email && u.password === credentials.password);

    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem('user', JSON.stringify(foundUser));
      return foundUser;
    }
    return null; 
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const register = (userData, password) => {
    const users = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
    if (users.find(u => u.email === userData.email)) {
      return { error: 'User already exists' };
    }

    const newUser = {
      ...userData,
      id: Date.now().toString(),
      password: password, 
      createdAt: new Date().toISOString(),
      approved: userData.role === 'vendor' ? false : true,
    };
    
    users.push(newUser);
    localStorage.setItem('registeredUsers', JSON.stringify(users));
    
    setUser(newUser);
    localStorage.setItem('user', JSON.stringify(newUser));
    return newUser;
  };
  
  const approveVendor = (vendorId) => {
    const users = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
    const updatedUsers = users.map(u => 
      u.id === vendorId && u.role === 'vendor' ? { ...u, approved: true } : u
    );
    localStorage.setItem('registeredUsers', JSON.stringify(updatedUsers));
    if (user && user.id === vendorId) {
      setUser(prevUser => ({ ...prevUser, approved: true }));
    }
  };

  const getAllUsers = () => {
    return JSON.parse(localStorage.getItem('registeredUsers') || '[]');
  };

  return {
    user,
    loading,
    login,
    logout,
    register,
    approveVendor,
    getAllUsers,
    isAuthenticated: !!user,
    isVendor: user?.role === 'vendor',
    isAdmin: user?.role === 'admin',
    isVendorApproved: user?.role === 'vendor' && user?.approved,
  };
}