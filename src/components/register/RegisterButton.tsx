import { useButtonLoadingStore } from "@/stores/useButtonLoadingStore";
import { useNavigate } from "react-router-dom";
import LoaderButton from "../shared/LoaderButton";

const RegisterButton = ({ handleRegister }) => {
  const buttonId = "registerButton";
  const navigate = useNavigate();
  const { buttonLoading } = useButtonLoadingStore();
  const isLoading = buttonLoading[buttonId] || false;
  return (
    <button
      onClick={(e) => handleRegister(buttonId, e, navigate)}
      className="px-12 rounded-lg bg-darkBlue transition-all duration-250 font-semibold hover:outline-0 border-none hover:bg-darkBlueHover font-inter text-white "
    >
      {isLoading ? <LoaderButton /> : "REGISTER"}
    </button>
  );
};

export default RegisterButton;
