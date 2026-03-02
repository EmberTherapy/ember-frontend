'use client';
import { useState, useEffect } from 'react';
import { useRouter } from "next/navigation";
import { Toaster } from 'sonner';
import { ContextProvider } from '@/app/lib/contextProvider';
import Header from './components/Header';
import ModalHost from "@/app/(app)/components/ModalHost";
import DeleteHost from "@/app/(app)/components/DeleteHost";
import { validateSession} from '@/app/lib/api/auth';
import './app.css';

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const router = useRouter();

  useEffect(() => {
    const check = async () => {
      const res = await validateSession();

      if (!res) {
        console.log("No valid session, redirecting to login.");
        router.replace("/login");
      }
    }

    check();
  }, []);

  return (
    <ContextProvider>
      <Header/>
      {children}
      <ModalHost />
      <DeleteHost />
      <Toaster
        position="bottom-right"
        richColors
        visibleToasts={1}
        />
    </ContextProvider>
  );
}