'use client';

import { Toaster } from 'sonner';
import { useState, useEffect } from 'react';
import { ModalContextProvider } from '@/app/lib/ModalContextProvider';
import Header from './components/Header';
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
      <Toaster
        position="bottom-right"
        richColors
        visibleToasts={1}
        />
    </ModalContextProvider>
  );
}