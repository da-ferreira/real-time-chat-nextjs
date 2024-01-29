'use client';

import { createContext, useEffect, useState } from 'react';

export const AuthContext = createContext({});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState(null);
  const [currentChat, setCurrentChat] = useState(null);

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      setUser(JSON.parse(user));
    }
  }, []);

  return <AuthContext.Provider value={{ user, setUser, currentChat, setCurrentChat }}>{children}</AuthContext.Provider>;
}
