'use client';

import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Menu } from '@/components/Menu';
import { Contact } from '@/data/contacts';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import React from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  contacts: Contact[];
}

export function Sidebar({ className, contacts }: SidebarProps) {
  const pathname = usePathname();
  const [isOnTheChatPage, setIsOnTheChatPage] = React.useState(pathname.startsWith('/chats/'));
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const handleResize = () => {
      setIsOnTheChatPage(pathname.startsWith('/chats/'));
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [pathname]);

  return (
    <div className={cn(className, 'h-full', { hidden: isOnTheChatPage && isMobile })}>
      <Menu />
      <div className="space-y-2 py-2 h-[calc(100vh-6.6rem)] w-full shrink-0 md:sticky md:block ">
        <div className="flex items-center px-3 w-full">
          <Input placeholder="Filtrar chats..." />
        </div>

        <ScrollArea className="h-full !mt-2 !block">
          <div className="space-y-1">
            {contacts?.map((contact, i) => (
              <Link href={`/chats/${contact.username}`} key={`${contact}-${i}`}>
                <div
                  key={`${contact}-${i}`}
                  className="w-full justify-start font-normal flex flex-row items-center h-14 border-b border-gray-200 rounded-none p-4 hover:bg-gray-100 cursor-pointer"
                >
                  <div className="flex items-center space-x-4 w-full">
                    <Avatar>
                      <AvatarImage src={contact.avatar} alt="Image" />
                      <AvatarFallback>OM</AvatarFallback>
                    </Avatar>
                    <div className="w-full text-start line-clamp-2">
                      <p className="text-sm font-medium">{contact.name}</p>
                      <p className="text-sm text-muted-foreground">{contact.lastMessage}</p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}
