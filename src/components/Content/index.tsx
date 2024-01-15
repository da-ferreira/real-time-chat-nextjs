'use client';

import { Sidebar } from '@/components/Sidebar';
import { contacts } from '@/data/contacts';
import { cn } from '@/lib/utils';
import React from 'react';

export default function Content({ children }: { children: React.ReactNode }) {
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <div className="h-full w-full">
        <div className="border-t h-screen">
          <div className="bg-background h-full">
            <div className="grid lg:grid-cols-5 h-full">
              <Sidebar contacts={contacts} className="h-full w-screen lg:w-full" />
              <div className="col-span-3 lg:col-span-4 lg:border-l h-full">
                <div className={cn('h-full px-4 py-3 lg:px-4', { 'p-0': isMobile })}>{children}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
