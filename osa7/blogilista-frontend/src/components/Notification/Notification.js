const Notification = ({ isError, notification }) => {
  const color = isError ? "red" : "green";
  return notification ? (
    <div
      className={isError ? "error" : ""}
      style={{
        color,
        height: 40,
        fontSize: 20,
        border: `1px solid ${color}`,
      }}
    >
      {notification}
    </div>
  ) : null;
};

export default Notification;
