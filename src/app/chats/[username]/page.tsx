'use client';

import { useParams } from 'next/navigation';

export default function ChatPage() {
  const params = useParams();

  return (
    <div>
      <h1>Chat with {params.username}</h1>
    </div>
  );
}
