'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function GuestChatRedirect() {
  const router = useRouter();
  useEffect(() => {
    router?.replace('/chat/aria-sales');
  }, [router]);
  return null;
}
