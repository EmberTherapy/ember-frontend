'use client';

import { Toaster } from 'sonner';
import { getUserInitials } from '@/app/lib/api/fakeApi';
import { useState, useEffect } from 'react';

import './app.css';

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const [userInitials, setUserInitials] = useState("");

  useEffect(() => {
    const initials = getUserInitials();
    setUserInitials(initials);
  }, []);


  return (
    <div>
      <header className="header">
        <div className="left">
          <h1>Ember</h1>
          <div className='nav'>
            <a href="/clients">Clients</a>
            <a href="/calendar">Calendar</a>
            <a href="/billing">Billing</a>
          </div>
        </div>
        <div className='user-menu'>
          <span className="user">{userInitials}</span>
        </div>
      </header>
      {children}
      <Toaster
        position="bottom-right"
        richColors
        visibleToasts={1}
        />
    </div>
  );
}