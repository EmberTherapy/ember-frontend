'use client';

import { Toaster } from 'sonner';
import { getUserInfo } from '@/app/lib/api/fakeApi';
import { useState, useEffect } from 'react';

import './app.css';
import { userInfo } from 'os';
import { get } from 'http';

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const [userInitials, setUserInitials] = useState("");
  const [userName, setUserName] = useState("");


  function getUserInitials(firstName: string, lastName: string) {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  }
  useEffect(() => {
    const userInfo = getUserInfo();
    setUserInitials(getUserInitials(userInfo.first_name, userInfo.last_name));
    setUserName(`${userInfo.first_name} ${userInfo.last_name}`);
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