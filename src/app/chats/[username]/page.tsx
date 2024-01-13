'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function ChatPage() {
  const params = useParams();

  return (
    <div className="h-full">
      <div className="h-full flex items-center justify-center">
        <p className="text-4xl font-semibold text-gray-600">Chat with {params.username}</p>
        <Link href="/">back to home</Link>
      </div>
    </div>
  );
}
