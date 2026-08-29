import { useNotification } from "../../Hooks/useNotification";

export default function NotificationToast() {
  const { notifications} = useNotification();

  if (!notifications || notifications.length === 0) return null;

  return (
    <div className="notification-container">
      {notifications.map((notification) => (
        <div key={notification.id} className="notification-toast">
          <span>{notification.message}</span>
        </div>
      ))}
    </div>
  );
}