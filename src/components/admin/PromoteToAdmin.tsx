import { promoteUser } from "@/api/user";

const PromoteToAdmin = ({ jwt, userId, fetchUsers }) => {
  return (
    <button
      onClick={() => {
        promoteUser(jwt, userId, fetchUsers);
      }}
      className="focus:outline-none  rounded-lg hover:bg-crimsonHover hover:outline-0 border-none transition-all duration-250 bg-crimson font-semibold text-white"
    >
      Promote to Admin
    </button>
  );
};

export default PromoteToAdmin;
