'use client';

import { listUserChats } from '@/models/chatModel';
import { ReactNode, createContext, useContext, useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { UserChat } from '@/@types/users';
import { io } from 'socket.io-client';
interface ChatProviderProps {
  children: ReactNode;
}

interface ChatContextProps {
  userChats: UserChat[];
  setUserChats: React.Dispatch<React.SetStateAction<any>>;
  isUserChatsLoading: boolean;
  isUserChatsError: null | string;
  socket: any;
}

export const ChatContext = createContext<ChatContextProps>({
  userChats: [],
  setUserChats: () => {},
  isUserChatsLoading: false,
  isUserChatsError: null,
  socket: null,
});

export const ChatProvider = ({ children }: ChatProviderProps) => {
  const [socket, setSocket] = useState<any>(null);
  const [userChats, setUserChats] = useState([]);
  const [isUserChatsLoading, setIsUserChatsLoading] = useState(false);
  const [isUserChatsError, setIsUserChatsError] = useState(null);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const newSocket = io(String(process.env.NEXT_PUBLIC_SOCKET_URL));
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, [user]);

  useEffect(() => {
    const getUserChats = async () => {
      setIsUserChatsLoading(true);
      try {
        if (!user) return;

        const response = await listUserChats(user?.user.id);

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
        socket,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
