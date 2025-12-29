import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import "./AlertModal.css";

const AlertModal = ({ isOpen, message, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      // Lock scrolling and touch events
      document.body.style.overflow = "hidden";
      document.body.style.touchAction = "none";
    }

    return () => {
      // Restore interaction
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return createPortal(
    <div className="ModalOverlay">
      <div className="AlertPopup" role="alertdialog" aria-modal="true">
        <p className="AlertDescription p1 txt-color-ternary">{message}</p>
        <button className="button-ternary-fill" onClick={onClose}>
          OK
        </button>
      </div>
    </div>,
    document.body
  );
};

export default AlertModal;
