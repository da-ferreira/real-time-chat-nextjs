'use client';

import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Menu } from '@/components/Menu';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import React, { HTMLAttributes, useContext, useEffect, useState } from 'react';
import { AuthContext } from '@/contexts/AuthContext';
import { ChatContext } from '@/contexts/ChatContext';
import { UserChat, UserChatMessageApi } from '@/@types/users';
import { SkeletonDemo } from '../ui/skeleton-demo';
import { listMessageFromChat } from '@/models/messageModel';
import { io } from 'socket.io-client';
import { listUserChats } from '@/models/chatModel';


interface SidebarProps extends HTMLAttributes<HTMLDivElement> {}

export function Sidebar({ className }: SidebarProps) {
  const [isMobile, setIsMobile] = useState(false);
  const { setCurrentChat, currentChat, user, setCurrentMessages } = useContext(AuthContext);
  const [isChatOpen, setIsChatOpen] = useState(!!currentChat);
  const { userChats, isUserChatsLoading, socket, setUserChats } = useContext(ChatContext);

  const handleChatAvatar = (chat: UserChat) => {
    if (chat.user1Id === user?.user.id) {
      return `/avatars/${chat.user2Avatar}`;
    }

    return `/avatars/${chat.user1Avatar}`;
  };

  const handleChatName = (chat: UserChat) => {
    if (chat.user1Id === user?.user.id) {
      return chat.user2Name;
    }

    return chat.user1Name;
  };

  const handleChatFallback = (chat: UserChat) => {
    if (chat.user1Id === user?.user.id) {
      return chat.user2Name.charAt(0);
    }

    return chat.user1Name.charAt(0);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      setIsChatOpen(!!currentChat);
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [currentChat]);

  const handleSetCurrentChat = async (chat: UserChat) => {
    const messages = await listMessageFromChat(chat.id);

    setCurrentChat(chat);
    setCurrentMessages(
      messages.map((message: UserChatMessageApi) => ({
        role: message.userId === user?.user.id ? 'user' : 'agent',
        content: message.message,
        createdAt: message.createdAt,
      }))
    )
  };

  useEffect(() => {
    if (!socket) return;

    const updateMessages = async (chatId: string) => {
      const messages = await listMessageFromChat(chatId);
  
      setCurrentMessages(
        messages.map((message: UserChatMessageApi) => ({
          role: message.userId === user?.user.id ? 'user' : 'agent',
          content: message.message,
          createdAt: message.createdAt,
        }))
      );
    }

    const updateUserChats = async () => {
      const response = await listUserChats(user?.user.id);
      setUserChats(response);
    };

    socket.on('update chat', (chatId: string, user1Id: string, user2Id: string) => {
      if (currentChat?.id === chatId) {
        updateMessages(chatId);
      }

      if (user1Id === user?.user.id || user2Id === user?.user.id) {
        updateUserChats();
      }
    });
  }, [socket, currentChat, setCurrentMessages, user?.user.id, setUserChats]);

  return (
    <div className={cn(className, 'h-full', { hidden: isChatOpen && isMobile })}>
      <Menu />
      <div className="space-y-2 py-2 h-[calc(100vh-6.6rem)] w-full shrink-0 md:sticky md:block">
        {/* <div className="flex items-center px-3 w-full">
          <Input placeholder="Filtrar chats..." />
        </div> */}

        <ScrollArea className="h-full !mt-2 !block border-t-[1px]">
          {isUserChatsLoading ? (
            <SkeletonDemo />
          ) : userChats?.length ? (
            <div className="space-y-1">
              {userChats?.map((chat, i) => (
                <button key={`${chat.id}-${i}`} onClick={() => handleSetCurrentChat(chat)} className="w-full">
                  <div
                    key={`${chat}-${i}`}
                    className="w-full justify-start font-normal flex flex-row items-center h-14 border-b border-gray-200 rounded-none p-4 hover:bg-gray-100 cursor-pointer"
                  >
                    <div className="flex items-center space-x-4 w-full">
                      <Avatar>
                        <AvatarImage src={handleChatAvatar(chat)} alt="Image" />
                        <AvatarFallback>{handleChatFallback(chat)}</AvatarFallback>
                      </Avatar>
                      <div className="w-full text-start line-clamp-2">
                        <p className="text-sm font-medium">{handleChatName(chat)}</p>
                        <p className="text-sm text-muted-foreground">{chat.lastMessage}</p>
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center w-full h-full p-4 text-center">
              <p className="text-muted-foreground font-normal text-sm">
                Clique no botão de mais ao lado do seu avatar para começar uma nova conversa.
              </p>
            </div>
          )}
        </ScrollArea>
      </div>
    </div>
  );
}
