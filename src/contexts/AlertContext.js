import React, { createContext, useState, useContext } from 'react';
import AlertModal from '../components/AlertModal/AlertModal';

const AlertContext = createContext();

export const AlertProvider = ({ children }) => {
  const initialState = {
    show: false,
    msg: "",
    confirmText: "OK",
    cancelText: "",
    onConfirm: null,
    onCancel: null,
  };

  const [alert, setAlert] = useState(initialState);

  const showAlert = (options) => {
    if (typeof options === 'string') {
      setAlert({ ...initialState, show: true, msg: options });
    } else {
      setAlert({ ...initialState, ...options, show: true });
    }
  };

  const hideAlert = () => setAlert(initialState);

  const handleConfirm = () => {
    if (alert.onConfirm) alert.onConfirm();
    hideAlert();
  };

  const handleCancel = () => {
    if (alert.onCancel) alert.onCancel();
    hideAlert();
  };

  return (
    <AlertContext.Provider value={{ showAlert }}>
      {children}
      <AlertModal 
        isOpen={alert.show} 
        message={alert.msg} 
        confirmText={alert.confirmText}
        cancelText={alert.cancelText}
        onConfirm={handleConfirm} 
        onCancel={handleCancel}
      />
    </AlertContext.Provider>
  );
};

export const useAlert = () => useContext(AlertContext);