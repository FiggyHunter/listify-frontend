import { promoteUser } from "@/api/user";

const PromoteToAdmin = ({ jwt, userId, fetchUsers }) => {
  return (
    <button
      onClick={() => {
        promoteUser(jwt, userId, fetchUsers);
      }}
      className="focus:outline-none  rounded-lg hover:outline-0 border-none duration-250 bg-crimson  text-white hover:bg-crimsonHover transition-all duration-150 font-bold"
    >
      Promote to Admin
    </button>
  );
};

export default PromoteToAdmin;
