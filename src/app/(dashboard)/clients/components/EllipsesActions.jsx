import { useEffect, useRef, useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';

import { useContextProvider } from "@/app/(dashboard)/contextProvider";


export default function EllipsesActions({ recordId }) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  const { openDeleteRecord, openEditRecordModal} = useContextProvider();

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
    openEditRecordModal(recordId);
    setIsOpen(false);
  }

  function handleDelete() {
    openDeleteRecord(recordId);
    setIsOpen(false);
  }

  return (
    <div className="actions-menu" ref={menuRef}>
      <button
        type="button"
        className={`actions-ellipsis-button ${isOpen ? 'active' : ''}`}
        onClick={() => setIsOpen(prev => !prev)}
      >
        <FontAwesomeIcon icon={faEllipsisVertical} />
      </button>

      {isOpen && (
        <div className="actions-menu-dropdown">
          <div className='actions-menu-item' onClick={handleEdit}>Edit</div>
          <div className='actions-menu-item delete' onClick={handleDelete}>Delete</div>
        </div>
      )}
    </div>
  );
}
