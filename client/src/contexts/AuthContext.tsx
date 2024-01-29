'use client';

import { UserLoginResponse } from '@/@types/users';
import { getSessionData } from '@/actions';
import { createContext, useEffect, useState } from 'react';

export const AuthContext = createContext({});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserLoginResponse | null>(null);
  const [currentChat, setCurrentChat] = useState(null);

  // useEffect(() => {
  //   getSessionData().then((response) => {
  //     if (response) {
  //       setUser(response);
  //     }
  //     console.log(response);
      
  //   });
  // }, [user]);

  // getSessionData().then((response) => {
  //   if (response) {
  //     setUser(response);
  //     console.log(response);
  //   }
  // });

  return <AuthContext.Provider value={{ user, setUser, currentChat, setCurrentChat }}>{children}</AuthContext.Provider>;
}
