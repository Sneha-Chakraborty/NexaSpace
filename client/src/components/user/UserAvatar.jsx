const getInitials = (user) => {
  if (!user) return "?";
  if (user.name) return user.name.charAt(0).toUpperCase();
  if (user.username) return user.username.charAt(0).toUpperCase();
  if (user.email) return user.email.charAt(0).toUpperCase();
  return "?";
};

const UserAvatar = ({ user, size = 40 }) => {
  const style = {
    width: size,
    height: size
  };

  if (user?.avatarUrl) {
    return (
      <img
        src={user.avatarUrl}
        alt={user?.username || "Avatar"}
        style={style}
        className="rounded-full object-cover border border-white/60"
      />
    );
  }

  return (
    <div
      style={style}
      className="rounded-full bg-nexablue/80 text-black flex items-center justify-center text-sm font-semibold border border-white/70"
    >
      {getInitials(user)}
    </div>
  );
};

export default UserAvatar;
