import { disbandUser } from "@/api/user";
import { useButtonLoadingStore } from "@/stores/useButtonLoadingStore";
import LoaderButton from "../shared/LoaderButton";

const DisbandButton = ({ jwt, userId, fetchUsers }) => {
  const { buttonLoading, setButtonLoading } = useButtonLoadingStore();
  const isLoading = buttonLoading[`btn-del${userId}`] || false;
  return (
    <button
      onClick={() => {
        disbandUser(
          `btn-del${userId}`,
          setButtonLoading,
          jwt,
          userId,
          fetchUsers
        );
      }}
      className="bg-darkBlue w-fit"
    >
      {isLoading ? <LoaderButton /> : "DISBAND"}
    </button>
  );
};

export default DisbandButton;
