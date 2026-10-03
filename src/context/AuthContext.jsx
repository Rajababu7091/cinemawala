import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth, signInWithGoogle, logOut, onAuthStateChanged } from '../services/firebase';

// Known admin emails
export const ADMIN_EMAILS = [
  'rajababu.7091@gmail.com',
  'rajababu7091@gmail.com'
];

const AuthContext = createContext({
  user: null,
  loading: true,
  isAdmin: false,
  loginWithGoogle: async () => {},
  logout: async () => {},
});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const loginWithGoogle = async () => {
    return await signInWithGoogle();
  };

  const logout = async () => {
    return await logOut();
  };

  const isAdmin = Boolean(
    user && user.email && ADMIN_EMAILS.some(
      adminEmail => adminEmail.toLowerCase() === user.email.toLowerCase()
    )
  );

  const value = {
    user,
    loading,
    isAdmin,
    loginWithGoogle,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
