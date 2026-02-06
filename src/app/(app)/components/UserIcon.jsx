import { useEffect, useRef, useState } from 'react';
import { useRouter } from "next/navigation";
import { getUserInfo } from '@/app/lib/api/user';
import { logoutUser } from '@/app/lib/api/auth';

export default function UserIcon() {
  const router = useRouter();
  
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  const [userInitials, setUserInitials] = useState(null);
  const [userName, setUserName] = useState(null);

  function getUserInitials(firstName, lastName) {
      return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  }

  useEffect(() => {
      getUserInfo().then(userInfo => {
          setUserInitials(getUserInitials(userInfo.first_name, userInfo.last_name));
          setUserName(`${userInfo.first_name} ${userInfo.last_name}`);
      }).catch(console.error);
  }, []);

  useEffect(() => {
    function handleClickOutside(e) {
      if (!menuRef.current) return;
      if (!menuRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  function handleEdit() {
    onEdit();
    setIsOpen(false);
  }


  return (
    
    <div className="user-menu" ref={menuRef}>
      <span className="user" onClick={() => setIsOpen(prev => !prev)}>
        {userInitials}
      </span>

      {isOpen && (
        <div className="user-menu-dropdown">
          <div className='user-menu-name'>{userName}</div>
          <a className='user-menu-item' href="/settings">User Settings</a>
          <a className='user-menu-item logout' onClick={() => { logoutUser(); router.replace("/login"); }}>Log Out</a>
        </div>
      )}
    </div>
  );
}
