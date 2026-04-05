'use client';
import { useState, useEffect } from 'react';
import { useRouter } from "next/navigation";
import { ContextProvider } from '@/app/lib/contextProvider';
import Header from '@/app/globalComponents/Header';
import { validateSession} from '@/app/lib/api/auth';
import '@/app/globalComponents/header.css';
import { Toaster } from 'sonner';

export default function AdminLayout({
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

      else if (res.role != "admin") {
        router.replace("/login");
      }
    }

    check();
  }, []);

  return (
    <ContextProvider>
      <Header isAdmin={true} />
      {children}
      <Toaster
        position="bottom-right"
        richColors
        visibleToasts={1}
      />
    </ContextProvider>
  );
}