'use client';

import * as React from 'react';
import { Send, ChevronLeft } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';

import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { AuthContext } from '@/contexts/AuthContext';
import { UserChat } from '@/@types/users';
import { sendMessageToChat } from '@/models/messageModel';
import { ChatContext } from '@/contexts/ChatContext';

export function CardsChat() {
  const [input, setInput] = React.useState('');
  const inputLength = input.trim().length;
  const [isMobile, setIsMobile] = React.useState(false);
  const { setCurrentChat, currentChat, user, currentMessages, setCurrentMessages } = React.useContext(AuthContext);
  const { socket } = React.useContext(ChatContext);
  const [loading, setLoading] = React.useState(false);

  console.log('currentChat', currentChat);

  const handleChatAvatar = (chat: UserChat | null) => {
    if (!chat) return '/avatars/01.png';

    if (chat.user1Id === user?.user.id) {
      return `/avatars/${chat.user2Avatar}`;
    }

    return `/avatars/${chat.user1Avatar}`;
  };

  const handleChatName = (chat: UserChat | null) => {
    if (!chat) return 'Chat';

    if (chat.user1Id === user?.user.id) {
      return chat.user2Name;
    }

    return chat.user1Name;
  };

  const handleChatFallback = (chat: UserChat | null) => {
    if (!chat) return 'C';

    if (chat.user1Id === user?.user.id) {
      return chat.user2Name.charAt(0);
    }

    return chat.user1Name.charAt(0);
  };

  const sendMessage = async (message: string) => {
    setLoading(true);
    const response = await sendMessageToChat(String(currentChat?.id), String(user?.user.id), message);
    setLoading(false);

    if (response.error) {
      console.error(response.error);
      return;
    }

    setCurrentMessages([
      ...currentMessages,
      {
        role: 'user',
        content: message,
        createdAt: new Date().toISOString(),
      },
    ]);
    
    socket.emit('update chat', currentChat?.id, user?.user.id, currentChat?.user1Id === user?.user.id ? currentChat?.user2Id : currentChat?.user1Id);
  };

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
    <>
      <Card className={cn('h-full flex-col', { 'border-none': isMobile })}>
        <CardHeader className="flex flex-row items-center">
          <div className="flex items-center space-x-4">
            {isMobile && (
              <button onClick={() => setCurrentChat(null)}>
                <ChevronLeft className="h-6 w-6" />
              </button>
            )}

            <Avatar>
              <AvatarImage src={handleChatAvatar(currentChat)} alt="Image" />
              <AvatarFallback>{handleChatFallback(currentChat)}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium leading-none">{handleChatName(currentChat)}</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="flex-1">
          <div className="h-[calc(100vh-13rem)]">
            <ScrollArea className="h-full pr-6">
              <div className="space-y-4">
                {currentMessages.map((message, index) => (
                  <div
                    key={index}
                    className={cn(
                      'flex w-max max-w-[75%] flex-col gap-2 rounded-lg px-3 py-2 text-sm',
                      message.role === 'user' ? 'ml-auto bg-primary text-primary-foreground' : 'bg-muted'
                    )}
                  >
                    <div className="flex items-center space-x-2">
                      <span>{message.content}</span>
                      <span
                        className={cn(
                          message.role === 'user' ? 'text-primary-foreground' : 'text-muted-foreground'
                        )}
                        style={{ fontSize: '0.7rem' }}
                      >
                        {new Date(message.createdAt).toLocaleString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
        </CardContent>
        <CardFooter>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              if (inputLength === 0) return;
              sendMessage(input);
              setInput('');
            }}
            className="flex w-full items-center space-x-2"
          >
            <Input
              id="message"
              placeholder="Escreva uma mensagem..."
              className="flex-1"
              autoComplete="off"
              value={input}
              disabled={loading}
              onChange={(event) => setInput(event.target.value)}
            />
            <Button type="submit" size="icon" disabled={inputLength === 0}>
              <Send className="h-4 w-4" />
              <span className="sr-only">Send</span>
            </Button>
          </form>
        </CardFooter>
      </Card>
    </>
  );
}
