import { useEffect, useCallback, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useAlert } from "../contexts/AlertContext";

const IdleTimer = ({ timeout = 300000 }) => {
  const { logout, user } = useAuth();
  const { showAlert } = useAlert();
  const navigate = useNavigate();
  const location = useLocation();
  const timerRef = useRef(null);

  const handleLogout = useCallback(() => {
    if (user) {
      logout(); 
      navigate("/");
      showAlert("Session expired due to inactivity.");
    }
  }, [logout, navigate, user, showAlert]);

  const resetTimer = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(handleLogout, timeout);
  }, [handleLogout, timeout]);

  useEffect(() => {
    const events = [
      "mousedown",
      "mousemove",
      "keypress",
      "scroll",
      "touchstart",
    ];

    if (user) {
      resetTimer();
      events.forEach((event) => document.addEventListener(event, resetTimer));
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      events.forEach((event) =>
        document.removeEventListener(event, resetTimer)
      );
    };
  }, [user, resetTimer, location.pathname]);
  
  return null;
};

export default IdleTimer;