'use client';
import { useState, useEffect } from 'react';
import { useRouter } from "next/navigation";
import { ContextProvider } from '@/app/lib/contextProvider';
import Header from '@/app/globalComponents/Header';
import { validateSession} from '@/app/lib/api/auth';
import '@/app/globalComponents/app.css';

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const router = useRouter();

  useEffect(() => {
    const check = async () => {
      const res = await validateSession();

      if (res.status !== "success") {
        router.replace("/login");
      }

      else if (res.role == "therapist") {
        router.replace("/clients");
      }
    }

    check();
  }, []);

  return (
    <ContextProvider>
      <Header/>
      {children}
    </ContextProvider>
  );
}