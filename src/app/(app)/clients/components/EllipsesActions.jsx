import { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import DeletePrompt from './DeletePrompt';

export default function EllipsesActions({ onEdit, onDelete, recordId }) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  // Close on outside click
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

  function handleDelete() {
    <DeletePrompt onDelete={onDelete} onContinue={() => {}} />;
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
