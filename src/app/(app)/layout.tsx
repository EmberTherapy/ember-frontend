'use client';

import { Toaster } from 'sonner';
import { useState, useEffect } from 'react';
import Header from './Header';
import './app.css';

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <div>
      <Header/>
      {children}
      <Toaster
        position="bottom-right"
        richColors
        visibleToasts={1}
        />
    </div>
  );
}