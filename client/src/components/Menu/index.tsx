'use client';

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from '@/components/ui/menubar';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Plus, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import React from 'react';
import { useRouter } from 'next/navigation';
import { removeSessionData } from '@/actions';
import { AuthContext } from '@/contexts/AuthContext';

const users = [
  {
    name: 'Olivia Martin',
    email: 'm@example.com',
    avatar: '/avatars/01.png',
  },
  {
    name: 'Isabella Nguyen',
    email: 'isabella.nguyen@email.com',
    avatar: '/avatars/03.png',
  },
  {
    name: 'Emma Wilson',
    email: 'emma@example.com',
    avatar: '/avatars/05.png',
  },
  {
    name: 'Jackson Lee',
    email: 'lee@example.com',
    avatar: '/avatars/02.png',
  },
  {
    name: 'William Kim',
    email: 'will@email.com',
    avatar: '/avatars/04.png',
  },
] as const;

export function Menu() {
  const [open, setOpen] = React.useState(false);
  const [selectedUser, setSelectedUsers] = React.useState();
  const { user } = React.useContext(AuthContext);
  const router = useRouter();

  const handleLogout = () => {
    removeSessionData().then(() => {
      router.push('/login');
    });
  };

  return (
    <>
      <Menubar className="rounded-none border-b border-none mx-4 mt-4 mb-2">
        <MenubarMenu>
          <MenubarTrigger className="font-bold pl-1 pr-4 w-full">
            <div className="flex flex-row items-center">
              <div className="flex items-center space-x-4">
                <Avatar>
                  <AvatarImage src={`/avatars/${user?.user.avatar}` || '/avatars/01.png'} alt="Image" />
                  <AvatarFallback>UD</AvatarFallback>
                </Avatar>
                <div className="text-left">
                  <p className="text-sm font-medium leading-none line-clamp-2">{user?.user.name}</p>
                </div>
              </div>
            </div>
          </MenubarTrigger>
          <MenubarContent>
            <MenubarItem>
              Preferências <MenubarShortcut>⌘Q</MenubarShortcut>
            </MenubarItem>
            <MenubarSeparator />

            <MenubarShortcut />
            <button onClick={handleLogout} className="w-full text-left cursor-pointer">
              <MenubarItem>Sair</MenubarItem>
            </button>
          </MenubarContent>
        </MenubarMenu>

        <TooltipProvider delayDuration={0}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size="icon"
                variant="outline"
                className="rounded-full !-ml-6"
                onClick={() => {
                  setOpen(true);
                  setSelectedUsers(undefined);
                }}
              >
                <Plus className="h-4 w-4" />
                <span className="sr-only">Nova mensagem</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent sideOffset={10}>Nova mensagem</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </Menubar>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="gap-0 p-0 outline-none">
          <DialogHeader className="px-4 pb-4 pt-5">
            <DialogTitle>Nova mensagem</DialogTitle>
            <DialogDescription>Inicie uma conversa com seus amigos</DialogDescription>
          </DialogHeader>
          <Command className="overflow-hidden rounded-t-none border-t">
            <CommandInput placeholder="Buscar por nome ou email" />
            <CommandList>
              <CommandEmpty>No users found.</CommandEmpty>
              <CommandGroup className="p-2">
                {users.map((user) => (
                  <CommandItem
                    key={user.email}
                    className="flex items-center px-2"
                    onSelect={() => {
                      if (selectedUser === user) {
                        setSelectedUsers(undefined);
                      } else {
                        setSelectedUsers(user);
                      }
                    }}
                  >
                    <Avatar>
                      <AvatarImage src={user.avatar} alt="Image" />
                      <AvatarFallback>{user.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="ml-2">
                      <p className="text-sm font-medium leading-none">{user.name}</p>
                      <p className="text-sm text-muted-foreground">{user.email}</p>
                    </div>
                    {/* {selectedUsers.includes(user) ? <Check className="ml-auto flex h-5 w-5 text-primary" /> : null} */}
                    {selectedUser === user ? <Check className="ml-auto flex h-5 w-5 text-primary" /> : null}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
          <DialogFooter className="flex items-center border-t p-4 sm:justify-between">
            {!!selectedUser ? (
              <div className="flex -space-x-2 overflow-hidden">
                <Avatar key={selectedUser.email} className="inline-block border-2 border-background">
                  <AvatarImage src={selectedUser.avatar} />
                  <AvatarFallback>{selectedUser.name[0]}</AvatarFallback>
                </Avatar>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">Selecione um contato para iniciar uma conversa</p>
            )}
            <Button
              disabled={!selectedUser}
              onClick={() => {
                setOpen(false);
                setSelectedUsers(undefined);
              }}
            >
              Iniciar conversa
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
