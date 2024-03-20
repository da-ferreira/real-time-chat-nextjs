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
import { Plus, Check, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import React from 'react';
import { useRouter } from 'next/navigation';
import { removeSessionData } from '@/actions';
import { AuthContext } from '@/contexts/AuthContext';
import { UserChatMessageApi, UserSearch } from '@/@types/users';
import { searchUsers } from '@/models/userModel';
import { createOrGetChat } from '@/models/chatModel';
import { listMessageFromChat } from '@/models/messageModel';

export function Menu() {
  const [open, setOpen] = React.useState(false);
  const [selectedUser, setSelectedUser] = React.useState<UserSearch>();
  const [users, setUsers] = React.useState<UserSearch[]>([]);
  const { user, setCurrentChat, setCurrentMessages } = React.useContext(AuthContext);
  const router = useRouter();
  const search = React.useRef<HTMLInputElement>(null);
  const [loading, setLoading] = React.useState(false);

  const handleLogout = () => {
    removeSessionData().then(() => {
      router.push('/login');
    });
  };

  const handleSearchUsers = async () => {
    const q = String(search.current?.value).trim();

    if (q.length < 3) return;

    const response = await searchUsers(q);

    setUsers(response);
  };

  const createChat = async () => {
    setLoading(true);
    const response = await createOrGetChat(String(user?.user.id), String(selectedUser?.id));

    if (response.error) {
      console.error(response.error);
      return;
    }

    const messages = await listMessageFromChat(response.id);

    setCurrentMessages(
      messages.map((message: UserChatMessageApi) => ({
        role: message.userId === user?.user.id ? 'user' : 'agent',
        content: message.message,
        createdAt: message.createdAt,
      }))
    );
    setCurrentChat(response);
    setLoading(false);
    setOpen(false);
    setSelectedUser(undefined);
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
                  setSelectedUser(undefined);
                }}
              >
                <Plus className="h-4 w-4" />
                <span className="sr-only">Nova conversa</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent sideOffset={10}>Nova conversa</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </Menubar>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="gap-0 p-0 outline-none">
          <DialogHeader className="px-4 pb-4 pt-5">
            <DialogTitle>Nova conversa</DialogTitle>
            <DialogDescription>Inicie uma conversa com seus amigos</DialogDescription>
          </DialogHeader>
          <div className="overflow-hidden rounded-t-none border-t flex h-full w-full flex-col rounded-md bg-popover text-popover-foreground">
            <input
              placeholder="Buscar por nome ou email"
              ref={search}
              onKeyUp={handleSearchUsers}
              className="px-4 flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
            />
            <div className="max-h-[300px] overflow-y-auto overflow-x-hidden">
              <div>
                {users.map((user) => (
                  <button
                    key={user.email}
                    className="w-full text-left flex items-center px-2 relative cursor-default select-none rounded-sm py-1.5 text-sm outline-none aria-selected:bg-accent aria-selected:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
                    onClick={() => {
                      if (selectedUser === user) {
                        setSelectedUser(undefined);
                      } else {
                        setSelectedUser(user);
                      }
                    }}
                  >
                    <Avatar>
                      <AvatarImage src={`/avatars/${user.avatar}`} alt="Image" />
                      <AvatarFallback>{user.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="ml-2">
                      <p className="text-sm font-medium leading-none">{user.name}</p>
                      <p className="text-sm text-muted-foreground">{user.email}</p>
                    </div>
                    {selectedUser === user ? <Check className="ml-auto flex h-5 w-5 text-primary" /> : null}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <DialogFooter className="flex items-center border-t p-4 sm:justify-between">
            {!!selectedUser ? (
              <div className="flex -space-x-2 overflow-hidde items-center">
                <Avatar key={selectedUser.email} className="inline-block border-2 border-background">
                  <AvatarImage src={`/avatars/${selectedUser.avatar}`} />
                  <AvatarFallback>{selectedUser.name[0]}</AvatarFallback>
                </Avatar>

                <div className="flex flex-col !ml-2">
                  <p className="text-sm font-medium">{selectedUser.name}</p>
                </div>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">Selecione um contato para iniciar uma conversa</p>
            )}
            <Button disabled={!selectedUser} onClick={createChat}>
              {/* {loading ? 'Carregando...' : 'Iniciar conversa'} */}
              {/* <Loader2 className="mr-2 h-4 w-4 animate-spin"  /> */}
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Carregando...
                </>
              ) : (
                'Iniciar conversa'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
