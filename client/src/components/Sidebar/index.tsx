'use client';

import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Menu } from '@/components/Menu';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import React, { HTMLAttributes, useContext, useEffect, useState } from 'react';
import { AuthContext } from '@/contexts/AuthContext';
import { ChatContext } from '@/contexts/ChatContext';
import { UserChat } from '@/@types/users';
import { SkeletonDemo } from '../ui/skeleton-demo';

interface SidebarProps extends HTMLAttributes<HTMLDivElement> {}

export function Sidebar({ className }: SidebarProps) {
  const [isMobile, setIsMobile] = useState(false);
  const { setCurrentChat, currentChat, user } = useContext(AuthContext);
  const [isChatOpen, setIsChatOpen] = useState(!!currentChat);
  const { userChats, isUserChatsLoading } = useContext(ChatContext);

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

  return (
    <div className={cn(className, 'h-full', { hidden: isChatOpen && isMobile })}>
      <Menu />
      <div className="space-y-2 py-2 h-[calc(100vh-6.6rem)] w-full shrink-0 md:sticky md:block ">
        <div className="flex items-center px-3 w-full">
          <Input placeholder="Filtrar chats..." />
        </div>

        <ScrollArea className="h-full !mt-2 !block">
          {isUserChatsLoading ? (
            <SkeletonDemo />
          ) : (
            <div className="space-y-1">
              {userChats?.map((chat, i) => (
                <button key={`${chat.id}-${i}`} onClick={() => setCurrentChat(chat)} className="w-full">
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
          )}
        </ScrollArea>
      </div>
    </div>
  );
}
