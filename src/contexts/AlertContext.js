import React, { createContext, useState, useContext } from 'react';
import AlertModal from '../components/AlertModal/AlertModal';

const AlertContext = createContext();

export const AlertProvider = ({ children }) => {
  const [alert, setAlert] = useState({ show: false, msg: "" });

  const showAlert = (msg) => setAlert({ show: true, msg });
  const hideAlert = () => setAlert({ show: false, msg: "" });

  return (
    <AlertContext.Provider value={{ showAlert }}>
      {children}
      <AlertModal 
        isOpen={alert.show} 
        message={alert.msg} 
        onClose={hideAlert} 
      />
    </AlertContext.Provider>
  );
};

export const useAlert = () => useContext(AlertContext);