import { useContext } from "react";
import { NotificationContext } from "../Context/NotificationContext";

export function useNotification() {
  const context = useContext(NotificationContext);

  if (!context) {
    throw new Error("useNotification is not inside NotificationProvider");
  }
  
  return context;
}