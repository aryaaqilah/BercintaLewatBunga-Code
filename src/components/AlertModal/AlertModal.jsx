import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import "./AlertModal.css";

const AlertModal = ({ isOpen, message, confirmText, cancelText, onConfirm, onCancel }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.body.style.touchAction = "none";
    }
    return () => {
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return createPortal(
    <div className="ModalOverlay">
      <div className="AlertPopup" role="alertdialog" aria-modal="true">
        <p className="AlertDescription p1 txt-color-ternary">{message}</p>
        <div className="ModalActions">
          {cancelText && (
            <button className="button-ternary" onClick={onCancel}>
              {cancelText}
            </button>
          )}
          <button className={cancelText ? "button-primary" : "button-ternary-fill"} onClick={onConfirm}>
            {confirmText}
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default AlertModal;