'use client';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Menu } from '@/components/Menu';
import { Contact } from '@/data/contacts';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import React from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { CardHeader } from '@/components/ui/card';

import { Plus } from 'lucide-react';

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  contacts: Contact[];
}

export function Sidebar({ className, contacts }: SidebarProps) {
  const router = useRouter();

  return (
    <div className={cn(className, 'h-full')}>
      <Menu />

      <div className="space-y-2 py-2 h-[calc(100vh-6.6rem)] w-full shrink-0 md:sticky md:block">
        {/* <div className="px-4 flex flex-row items-center">
          <Input placeholder="Filtrar chats..." className='mr-3' />

          <TooltipProvider delayDuration={0}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="icon"
                  variant="outline"
                  className="ml-auto rounded-full"
                  onClick={() => setOpen(true)}
                >
                  <Plus className="h-4 w-4" />
                  <span className="sr-only">New message</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent sideOffset={10}>New message</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div> */}

        <div className="flex items-center justify-center">
          <div className="flex items-center space-x-4">
            <Input placeholder="Filtrar chats..." />
          </div>
          <TooltipProvider delayDuration={0}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button size="icon" variant="outline" className="ml-4 rounded-full" onClick={() => setOpen(true)}>
                  <Plus className="h-4 w-4" />
                  <span className="sr-only">New message</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent sideOffset={10}>New message</TooltipContent>
            </Tooltip>
          </TooltipProvider>
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
