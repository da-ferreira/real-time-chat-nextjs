'use client';

import { AuthContext } from '@/contexts/AuthContext';
import { useContext, useEffect, useState } from 'react';
import { CardsChat } from '@/components/CardsChat';
import { cn } from '@/lib/utils';

export default function Home() {
  const { currentChat, setCurrentChat } = useContext(AuthContext);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Observando a tecla ESC para fechar o chat
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setCurrentChat(null);
      }
    };

    window.addEventListener('keydown', handleEsc);

    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [setCurrentChat]);

  return (
    <div className="h-full flex items-center justify-center">
      {currentChat ? (
        <CardsChat />
      ) : (
        <p className={cn('text-4xl font-semibold text-gray-600', { hidden: isMobile })}>Inicie uma conversa</p>
      )}
    </div>
  );
}
