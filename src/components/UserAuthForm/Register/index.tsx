'use client';

import * as React from 'react';

import { cn } from '@/lib/utils';
import { Icons } from '@/components/Icons';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { registerUser } from '@/models/userModel';
import { UserCreateResponse } from '@/@types/users';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const router = useRouter();

  const name = React.useRef<HTMLInputElement>(null);
  const email = React.useRef<HTMLInputElement>(null);
  const password = React.useRef<HTMLInputElement>(null);
  const [defaultAvatar, setDefaultAvatar] = React.useState<string>('01.png');

  const handleAvatarChange = (image: string) => {
    setDefaultAvatar(image);
  };

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    setIsLoading(true);

    const response: UserCreateResponse = await registerUser({
      name: name.current?.value,
      email: email.current?.value,
      password: password.current?.value,
      avatar: defaultAvatar,
    });

    setIsLoading(false);

    if (response.message === 'Esse email já está em uso') {
      toast.error('Esse email já está em uso');
    } else if (response.message === 'Erro ao criar usuário') {
      toast.error('Erro ao criar usuário');
    } else if (response.message === 'Usuário criado com sucesso') {
      toast.success('Usuário criado com sucesso');

      router.push('/login');
    }
  }

  return (
    <div className={cn('grid gap-6', className)} {...props}>
      <form onSubmit={onSubmit}>
        <div className="grid gap-2">
          <div className="flex">
            <div className="w-4/6 mr-2">
              <Label className="sr-only" htmlFor="name">
                Nome
              </Label>
              <Input
                id="name"
                ref={name}
                placeholder="Nome"
                type="text"
                autoCapitalize="none"
                autoComplete="name"
                autoCorrect="off"
                disabled={isLoading}
                required
              />
            </div>
            <div className="w-2/6">
              <Select value={defaultAvatar} onValueChange={handleAvatarChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione um avatar" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {Array.from({ length: 5 }, (_, i) => i + 1).map((i) => (
                      <SelectItem key={i} value={`0${i}.png`}>
                        <Avatar className="w-9 h-9">
                          <AvatarImage src={`/avatars/0${i}.png`} alt="Image" />
                          <AvatarFallback>V{i}</AvatarFallback>
                        </Avatar>
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              ref={email}
              placeholder="Email"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
              required
            />
          </div>
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="password">
              Senha
            </Label>
            <Input
              id="password"
              ref={password}
              placeholder="Senha"
              type="password"
              autoCapitalize="none"
              autoComplete="current-password"
              autoCorrect="off"
              disabled={isLoading}
              required
            />
          </div>
          <Button disabled={isLoading}>
            {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
            Criar conta
          </Button>
        </div>
      </form>
    </div>
  );
}
