'use client';

import { createContext, useState } from 'react';

export const AuthContext = createContext({});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState(null);
  const [currentChat, setCurrentChat] = useState(null);

  return <AuthContext.Provider value={{ user, setUser, currentChat, setCurrentChat }}>{children}</AuthContext.Provider>;
}
