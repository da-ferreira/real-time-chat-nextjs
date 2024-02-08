'use client';

import { listUserChats } from '@/models/chatModel';
import { ReactNode, createContext, useContext, useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';

interface ChatProviderProps {
  children: ReactNode;
}

interface ChatContextProps {
  userChats: any;
  setUserChats: React.Dispatch<React.SetStateAction<any>>;
  isUserChatsLoading: boolean;
  isUserChatsError: any;
}

export const ChatContext = createContext<ChatContextProps>({
  userChats: [],
  setUserChats: () => {},
  isUserChatsLoading: false,
  isUserChatsError: null,
});

export const ChatProvider = ({ children }: ChatProviderProps) => {
  const [userChats, setUserChats] = useState([]);
  const [isUserChatsLoading, setIsUserChatsLoading] = useState(false);
  const [isUserChatsError, setIsUserChatsError] = useState(null);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const getUserChats = async () => {
      setIsUserChatsLoading(true);
      try {
        if (!user) return;

        const response = await listUserChats(user?.user.id);

        console.log(response);

        setUserChats(response);
      } catch (error: any) {
        setIsUserChatsError(error);
      } finally {
        setIsUserChatsLoading(false);
      }
    };

    getUserChats();
  }, [user]);

  return (
    <ChatContext.Provider
      value={{
        userChats,
        setUserChats,
        isUserChatsLoading,
        isUserChatsError,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
