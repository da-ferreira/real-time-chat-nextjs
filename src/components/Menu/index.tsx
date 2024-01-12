import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from '@/components/ui/menubar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export function Menu() {
  return (
    <Menubar className="rounded-none border-b border-none mx-4 mt-4 mb-2">
      <MenubarMenu>
        <MenubarTrigger className="font-bold pl-1 pr-4 w-full">
          <div className="flex flex-row items-center">
            <div className="flex items-center space-x-4">
              <Avatar>
                <AvatarImage src="/avatars/02.png" alt="Image" />
                <AvatarFallback>OM</AvatarFallback>
              </Avatar>
              <div className="text-left">
                <p className="text-sm font-medium leading-none">David Ferreira</p>
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
          <MenubarItem>Sair</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
}
