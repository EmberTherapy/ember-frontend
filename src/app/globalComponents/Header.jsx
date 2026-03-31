'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import UserIcon from '@/app/globalComponents/UserIcon';

export default function Header() {
  const pathname = usePathname();

  const isActive = (path) => pathname.startsWith(path);

  return (
    <header className="header">
      <div className="left">
        <h1>Ember</h1>
        <nav className="nav">
          {/* <Link
            href="/calendar"
            className={isActive('/calendar') ? 'nav-item active' : 'nav-item'}
          >
            Calendar
          </Link>
          
          <Link
            href="/clients"
            className={isActive('/clients') ? 'nav-item active' : 'nav-item'}
          >
            Clients
          </Link>

          <Link
            href="/billing"
            className={isActive('/billing') ? 'nav-item active' : 'nav-item'}
          >
            Billing
          </Link> */}
          
        </nav>
      </div>
      <UserIcon />
    </header>
  );
}
