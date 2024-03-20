'use client';

import { UserChat, UserLoginResponse, UserMessageFront } from '@/@types/users';
import { getSessionData } from '@/actions';
import { createContext, useEffect, useState } from 'react';

interface AuthProviderProps {
  children: React.ReactNode;
}

interface AuthContextProps {
  user: UserLoginResponse | null;
  setUser: React.Dispatch<React.SetStateAction<UserLoginResponse | null>>;
  currentChat: UserChat | null;
  setCurrentChat: React.Dispatch<React.SetStateAction<any>>;
  currentMessages: UserMessageFront[];
  setCurrentMessages: React.Dispatch<React.SetStateAction<UserMessageFront[]>>;
}

export const AuthContext = createContext<AuthContextProps>({
  user: null,
  setUser: () => {},
  currentChat: null,
  setCurrentChat: () => {},
  currentMessages: [],
  setCurrentMessages: () => {},
});

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserLoginResponse | null>(null);
  const [currentChat, setCurrentChat] = useState(null);
  const [currentMessages, setCurrentMessages] = useState<UserMessageFront[]>([]);

  const setSesionData = async () => {
    setUser(await getSessionData());
  };

  useEffect(() => {
    setSesionData();
  }, []);

  return <AuthContext.Provider value={{ user, setUser, currentChat, setCurrentChat, currentMessages, setCurrentMessages }}>{children}</AuthContext.Provider>;
}
