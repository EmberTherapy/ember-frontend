import { useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight, faPlus} from '@fortawesome/free-solid-svg-icons';

import { useModalContext } from "@/app/lib/ModalContextProvider";

export default function Toolbar(toolbar_props) {
  const [selectedView, setSelectedView] = useState(toolbar_props.view);
  const { label, onNavigate, onView, view } = toolbar_props;

  const { modalState, setModalState } = useModalContext();

  return (
    <div className="toolbar">

      <div className="btn-group">
        <button className="tool-button arrow" onClick={() => onNavigate('PREV')}><FontAwesomeIcon icon={faChevronLeft} /></button>
        <button className="tool-button text" onClick={() => onNavigate('TODAY')}>Today</button>
        <button className="tool-button arrow" onClick={() => onNavigate('NEXT')}><FontAwesomeIcon icon={faChevronRight} /></button>
      </div>

      <div className="btn-group">
        <button className={`tool-button text${selectedView === 'day' ? ' selected-view' : ''}`} onClick={() => { onView('day'); setSelectedView('day'); }}>Day</button>
        <button className={`tool-button text${selectedView === 'week' ? ' selected-view' : ''}`} onClick={() => { onView('week'); setSelectedView('week'); }}>Week</button>
        <button className={`tool-button text${selectedView === 'month' ? ' selected-view' : ''}`} onClick={() => { onView('month'); setSelectedView('month'); }}>Month</button>
        <button className="new-event-button" onClick={() => setModalState({ visible: true, mode: 'new', type: 'event' })}>
          New Event <FontAwesomeIcon icon={faPlus} />
        </button>
      </div>

    </div>
  );
}