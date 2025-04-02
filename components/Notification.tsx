import '../app/app.css';
import React, { useEffect } from 'react';

interface NotificationProps {
  message: string;
  isSuccess: boolean;
  isVisible: boolean;
  onClose: () => void;
}

const Notification: React.FC<NotificationProps> = ({ message, isSuccess, isVisible, onClose }) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 5000); // Auto-close after 5 seconds
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null; // Hide if not visible

  return (
    <div className="notification">
      <div className={isSuccess ? "success" : "error"}>
        <h2>{isSuccess ? "Success!" : "Error!"}</h2>
        <p>{message}</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default Notification;
