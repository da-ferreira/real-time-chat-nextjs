'use client';

import * as React from 'react';
import { Send, ChevronLeft } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';

import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import Link from 'next/link';
import { AuthContext } from '@/contexts/AuthContext';

export function CardsChat() {
  const [messages, setMessages] = React.useState([
    {
      role: 'agent',
      content: 'Hi, how can I help you today?',
    },
    {
      role: 'user',
      content: "Hey, I'm having trouble with my account.",
    },
    {
      role: 'agent',
      content: 'What seems to be the problem?',
    },
    {
      role: 'user',
      content: "I can't log in.",
    },
    {
      role: 'agent',
      content: 'Hi, how can I help you today?',
    },
    {
      role: 'user',
      content: "Hey, I'm having trouble with my account.",
    },
    {
      role: 'agent',
      content: 'What seems to be the problem?',
    },
    {
      role: 'user',
      content: "I can't log in.",
    },
    {
      role: 'agent',
      content: 'Hi, how can I help you today?',
    },
    {
      role: 'user',
      content: "Hey, I'm having trouble with my account.",
    },
    {
      role: 'agent',
      content: 'What seems to be the problem?',
    },
    {
      role: 'user',
      content: "I can't log in.",
    },
    {
      role: 'agent',
      content: 'Hi, how can I help you today?',
    },
    {
      role: 'user',
      content: "Hey, I'm having trouble with my account.",
    },
    {
      role: 'agent',
      content: 'What seems to be the problem?',
    },
    {
      role: 'user',
      content: "I can't log in.",
    },
    {
      role: 'agent',
      content: 'Hi, how can I help you today?',
    },
    {
      role: 'user',
      content: "Hey, I'm having trouble with my account.",
    },
    {
      role: 'agent',
      content: 'What seems to be the problem?',
    },
    {
      role: 'user',
      content: "I can't log in.",
    },
    {
      role: 'agent',
      content: 'Hi, how can I help you today?',
    },
    {
      role: 'user',
      content: "Hey, I'm having trouble with my account.",
    },
    {
      role: 'agent',
      content: 'What seems to be the problem?',
    },
    {
      role: 'user',
      content: "I can't log in.",
    },
  ]);
  const [input, setInput] = React.useState('');
  const inputLength = input.trim().length;
  const [isMobile, setIsMobile] = React.useState(false);
  const { setCurrentChat } = React.useContext(AuthContext);

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
              <button onClick={() => setCurrentChat(null)} >
                <ChevronLeft className="h-6 w-6" />
              </button>
            )}

            <Avatar>
              <AvatarImage src="/avatars/01.png" alt="Image" />
              <AvatarFallback>OM</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium leading-none">Sofia Davis</p>
              <p className="text-sm text-muted-foreground">m@example.com</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="flex-1">
          <div className="h-[calc(100vh-13rem)]">
            <ScrollArea className="h-full pr-6">
              <div className="space-y-4">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={cn(
                      'flex w-max max-w-[75%] flex-col gap-2 rounded-lg px-3 py-2 text-sm',
                      message.role === 'user' ? 'ml-auto bg-primary text-primary-foreground' : 'bg-muted'
                    )}
                  >
                    {message.content}
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
              setMessages([
                ...messages,
                {
                  role: 'user',
                  content: input,
                },
              ]);
              setInput('');
            }}
            className="flex w-full items-center space-x-2"
          >
            <Input
              id="message"
              placeholder="Type your message..."
              className="flex-1"
              autoComplete="off"
              value={input}
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
