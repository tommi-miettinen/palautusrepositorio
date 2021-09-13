const Notification = ({ isError, notification }) => {
  const color = isError ? "red" : "green";
  return (
    <div
      style={{
        color,
        height: 40,
        fontSize: 20,
        border: `1px solid ${color}`,
      }}
    >
      {notification}
    </div>
  );
};

export default Notification;
