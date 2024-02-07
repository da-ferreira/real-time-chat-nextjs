'use client';

import { UserLoginResponse } from '@/@types/users';
import { getSessionData } from '@/actions';
import { createContext, useEffect, useState } from 'react';

interface AuthProviderProps {
  children: React.ReactNode;
}

interface AuthContextProps {
  user: UserLoginResponse | null;
  setUser: React.Dispatch<React.SetStateAction<UserLoginResponse | null>>;
  currentChat: any;
  setCurrentChat: React.Dispatch<React.SetStateAction<any>>;
}

export const AuthContext = createContext<AuthContextProps>({
  user: null,
  setUser: () => {},
  currentChat: null,
  setCurrentChat: () => {},
});

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserLoginResponse | null>(null);
  const [currentChat, setCurrentChat] = useState(null);

  const setSesionData = async () => {
    setUser(await getSessionData());
  };

  useEffect(() => {
    setSesionData();
  }, []);

  return <AuthContext.Provider value={{ user, setUser, currentChat, setCurrentChat }}>{children}</AuthContext.Provider>;
}
