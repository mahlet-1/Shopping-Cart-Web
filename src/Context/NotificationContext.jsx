import { createContext, useState } from "react";
import "../Styles/Notification.css"; 

export const NotificationContext = createContext();
export function NotificationProvider({ children }) {
  const [notifications, setNotifications] = useState([]);

  const removeNotification = (id) => {
    setNotifications((prev) => prev.filter((notification) => notification.id !== id));
  };

  const addNotification = (message) => {
    const id = Date.now(); 
    setNotifications((prev) => [...prev, { id, message }]);

    setTimeout(() => {
      removeNotification(id);
    }, 3000);
  };

  return (
    <NotificationContext.Provider value={{ notifications, addNotification, removeNotification }}>
      {children}
    </NotificationContext.Provider>
  );
}