'use client';

import { Toaster } from 'sonner';
import { useState, useEffect } from 'react';
import { ModalContextProvider } from '@/app/lib/contextProvider';
import Header from './components/Header';
import ModalHost from "@/app/(app)/components/ModalHost";
import DeleteHost from "@/app/(app)/components/DeleteHost";
import './app.css';

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <ModalContextProvider>
      <Header/>
      {children}
      <ModalHost />
      <DeleteHost />
      <Toaster
        position="bottom-right"
        richColors
        visibleToasts={1}
        />
    </ModalContextProvider>
  );
}