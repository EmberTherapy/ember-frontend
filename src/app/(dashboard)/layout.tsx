'use client';
import { useState, useEffect } from 'react';
import { useRouter } from "next/navigation";
import { Toaster } from 'sonner';
import { ContextProvider } from '@/app/(dashboard)/contextProvider';
import Header from '@/app/globalComponents/Header';
import ModalHost from "@/app/(dashboard)/Modals/ModalHost";
import DeleteHost from "@/app/(dashboard)/Modals/DeleteHost";
import { validateSession} from '@/app/lib/api/auth';
import '@/app/globalComponents/header.css';

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const router = useRouter();

  useEffect(() => {
    const check = async () => {
      const res = await validateSession();

      if (res.status !== "success") {
        console.log("No valid session, redirecting to login.");
        router.replace("/login");
      }

      else if (res.role == "client") {
        router.replace("/chat");
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