import { useState } from "react";
import { useModalContext } from "@/app/lib/ModalContextProvider";

export default function ModalHost() {

  const { modalMode, setModalMode } = useModalContext();

  const modal = 
      <div className="modal-overlay">
          <div className="modal"> 
              <p> woohoo!</p>
          </div>
      </div>

  if (modalMode == "newEvent") {
    return modal
  }
  
  return (
      null
  );
}