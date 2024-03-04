import { promoteUser } from "@/api/user";
import { useButtonLoadingStore } from "@/stores/useButtonLoadingStore";
import LoaderButton from "../shared/LoaderButton";

const PromoteToAdmin = ({ jwt, userId, fetchUsers }) => {
  const { buttonLoading, setButtonLoading } = useButtonLoadingStore();
  const isLoading = buttonLoading[`btn-promote${userId}`] || false;
  return (
    <button
      onClick={() => {
        promoteUser(
          jwt,
          userId,
          fetchUsers,
          `btn-promote${userId}`,
          setButtonLoading
        );
      }}
      className="focus:outline-none  rounded-lg hover:outline-0 border-none duration-250 bg-crimson  text-white hover:bg-crimsonHover transition-all duration-150 font-bold"
    >
      {isLoading ? <LoaderButton /> : "Promote to Admin"}
    </button>
  );
};

export default PromoteToAdmin;
