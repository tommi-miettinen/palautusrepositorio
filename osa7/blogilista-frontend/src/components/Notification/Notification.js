import { useSelector } from "react-redux";
const Notification = () => {
  const notification = useSelector((state) => state.notification);

  console.log(notification);

  if (!notification) return null;

  const color = notification.error ? "red" : "green";
  return (
    <div
      style={{
        color,
        height: 40,
        fontSize: 20,
        margin: "20px 0px",
        border: `1px solid ${color}`,
      }}
    >
      {notification.content}
    </div>
  );
};

export default Notification;
