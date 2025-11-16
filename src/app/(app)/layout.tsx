'use client';

import { Toaster } from 'sonner';
// import { getUserInfo } from '@/app/lib/api/fakeApi';
import { useState, useEffect } from 'react';
import Header from './Header';
import './app.css';
import { userInfo } from 'os';
import { get } from 'http';

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <div>
      <Header />
      {children}
      <Toaster
        position="bottom-right"
        richColors
        visibleToasts={1}
        />
    </div>
  );
}