import { demoteUser } from "@/api/user";
import { useButtonLoadingStore } from "@/stores/useButtonLoadingStore";
import LoaderButton from "../shared/LoaderButton";

const DemoteFromAdmin = ({ jwt, userId, fetchUsers }) => {
  const { buttonLoading, setButtonLoading } = useButtonLoadingStore();
  const isLoading = buttonLoading[`btn-demote${userId}`] || false;
  return (
    <>
      <button
        onClick={() => {
          demoteUser(
            jwt,
            userId,
            fetchUsers,
            `btn-demote${userId}`,
            setButtonLoading
          );
        }}
        className="focus:outline-none  rounded-lg hover:bg-crimsonHover hover:outline-0 border-none transition-all duration-250 bg-crimson font-semibold text-white"
      >
        {isLoading ? <LoaderButton /> : "Demote from Admin"}
      </button>
    </>
  );
};

export default DemoteFromAdmin;
