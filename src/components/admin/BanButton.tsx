import { banUser, unbanUser } from "@/api/user";

const BanButton = ({ jwt, user, fetchUsers }) => {
  return (
    <button
      onClick={() => {
        user?.isBanned
          ? unbanUser(jwt, user._id, fetchUsers)
          : banUser(jwt, user._id, fetchUsers);
      }}
      className="bg-darkBlue w-fit hover:bg-darkBlueHover transition-all duration-150 font-bold"
    >
      {user?.isBanned ? "UNBAN USER" : "BAN USER"}
    </button>
  );
};

export default BanButton;
