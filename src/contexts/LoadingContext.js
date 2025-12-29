import React, { createContext, useState, useContext, useEffect } from 'react';
import { createPortal } from 'react-dom';
import '../components/Loading/Loading.css';

const LoadingContext = createContext();

export const LoadingProvider = ({ children }) => {
  const [loading, setLoading] = useState({ active: false, text: "" });

  const showLoading = (text = "Loading...") => setLoading({ active: true, text });
  const hideLoading = () => setLoading({ active: false, text: "" });

  useEffect(() => {
    if (loading.active) {
      document.body.style.overflow = 'hidden';
      document.body.style.touchAction = 'none';
    } else {
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
    }
  }, [loading.active]);

  return (
    <LoadingContext.Provider value={{ showLoading, hideLoading }}>
      {children}
      {loading.active && createPortal(
        <div className="loading-overlay">
          <div className="spinner"></div>
          {loading.text && <p className="txt-color-ternary">{loading.text}</p>}
        </div>,
        document.body
      )}
    </LoadingContext.Provider>
  );
};

export const useLoading = () => useContext(LoadingContext);