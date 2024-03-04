import { useButtonLoadingStore } from "@/stores/useButtonLoadingStore";
import { useNavigate } from "react-router-dom";
import LoaderButton from "../shared/LoaderButton";

const LoginButton = ({ handleLogin }) => {
  const navigate = useNavigate();
  const { buttonLoading } = useButtonLoadingStore();
  const isLoading = buttonLoading["loginButton"] || false;
  return (
    <button
      onClick={(e) => handleLogin("loginButton", e, navigate)}
      className="px-14 focus:outline-none  rounded-lg hover:bg-crimsonHover hover:outline-0 border-none transition-all duration-250 bg-crimson font-semibold text-white"
    >
      {isLoading ? <LoaderButton /> : "LOGIN"}
    </button>
  );
};

export default LoginButton;
