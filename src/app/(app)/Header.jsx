'user client';

import { useState, useEffect } from 'react';
import { getUserInfo } from '@/app/lib/api/fakeApi';
import UserIcon from './UserIcon';

export default function Header() {



    return (
        <header className="header">
            <div className="left">
            <h1>Ember</h1>
            <div className='nav'>
                <a href="/clients">Clients</a>
                <a href="/calendar">Calendar</a>
                <a href="/billing">Billing</a>
            </div>
            </div>
            <UserIcon />
        </header>
    )
}