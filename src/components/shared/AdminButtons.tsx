import { useButtonLoadingStore } from "@/stores/useButtonLoadingStore";
import LoaderButton from "../shared/LoaderButton";
import { changeAdmitted } from "@/api/user";

const AdminButton = ({
  buttonId,
  jwt,
  text,
  userId,
  handleAdmitUser,
  fullName,
}) => {
  const { buttonLoading, setButtonLoading } = useButtonLoadingStore();
  const isLoading = buttonLoading[buttonId] || false;
  return (
    <button
      onClick={() =>
        changeAdmitted(
          buttonId,
          setButtonLoading,
          jwt,
          userId,
          handleAdmitUser,
          fullName
        )
      }
      className="focus:outline-none  rounded-lg hover:bg-crimsonHover hover:outline-0 border-none transition-all duration-250 bg-crimson font-semibold text-white"
    >
      {isLoading ? <LoaderButton /> : text}
    </button>
  );
};

export default AdminButton;
