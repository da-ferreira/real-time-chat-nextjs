import { Metadata } from 'next';
import Link from 'next/link';
import { Icons } from '@/components/Icons';
import { UserAuthForm } from '@/components/UserAuthForm/Login';

export const metadata: Metadata = {
  title: 'Login | NonStopTalk Chat',
  description: 'Faça login no NonStopTalk Chat e converse com seus amigos.',
};

export default function LoginPage() {
  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <Icons.logo className="mx-auto h-6 w-6" />
          <h1 className="text-2xl font-semibold tracking-tight">Bem-vindo de volta</h1>
          <p className="text-sm text-muted-foreground">Preencha os campos abaixo para fazer login.</p>
        </div>
        <UserAuthForm />
        <p className="px-8 text-center text-sm text-muted-foreground">
          <Link href="/register" className="hover:text-brand underline underline-offset-4">
            Não tem uma conta? Crie uma
          </Link>
        </p>
      </div>
    </div>
  );
}
