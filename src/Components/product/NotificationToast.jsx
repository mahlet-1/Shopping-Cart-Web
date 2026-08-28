import { useNotification } from "../../Hooks/useNotification";

export default function NotificationToast() {
  const { notifications, removeNotification } = useNotification();

  if (!notifications || notifications.length === 0) return null;

  return (
    <div className="notification-container">
      {notifications.map((notification) => (
        <div key={notification.id} className="notification-toast">
          <span>{notification.message}</span>
          <button onClick={() => removeNotification(notification.id)}> remove </button>
        </div>
      ))}
    </div>
  );
}