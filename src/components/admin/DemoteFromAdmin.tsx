import { demoteUser } from "@/api/user";

const DemoteFromAdmin = ({ jwt, userId, fetchUsers }) => {
  return (
    <button
      onClick={() => {
        demoteUser(jwt, userId, fetchUsers);
      }}
      className="focus:outline-none  rounded-lg hover:bg-crimsonHover hover:outline-0 border-none transition-all duration-250 bg-crimson font-semibold text-white"
    >
      Demote from Admin
    </button>
  );
};

export default DemoteFromAdmin;
