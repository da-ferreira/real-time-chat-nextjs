import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import AppWrapper from './AppWrapper';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Real Time Chat',
  description: 'Chat em tempo real com Next.js, Socket.io e Tailwind CSS',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className={inter.className} suppressHydrationWarning={true}>
        <AppWrapper>{children}</AppWrapper>
      </body>
    </html>
  );
}
