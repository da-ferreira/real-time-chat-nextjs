import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

import { Sidebar } from '@/components/Sidebar';
import { contacts } from '@/data/contacts';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Real Time Chat',
  description: 'Chat em tempo real com Next.js, Socket.io e Tailwind CSS',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <main className="flex min-h-screen flex-col items-center justify-between">
          <div className="h-full w-full">
            <div className="border-t h-screen">
              <div className="bg-background h-full">
                <div className="grid lg:grid-cols-5 h-full">
                  <Sidebar contacts={contacts} className="h-full w-screen lg:w-full" />
                  <div className="col-span-3 lg:col-span-4 lg:border-l h-full">
                    <div className="h-full px-4 py-3 lg:px-4">{children}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </body>
    </html>
  );
}
