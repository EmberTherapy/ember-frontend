import { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import DeletePrompt from './DeletePrompt';
import { on } from 'events';

export default function EllipsesActions({ onEdit, recordId, onDeleteRecord }) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

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
          <div className='actions-menu-item delete' onClick={() => { onDeleteRecord(recordId); setIsOpen(false); }}>Delete</div>
        </div>
      )}
    </div>
  );
}
