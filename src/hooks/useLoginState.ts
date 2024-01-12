import { useJwtStore } from "./../stores/useUserStore";
import { logInUser } from "@/api/loginUser";
import { LoginErrorData, LoginFormData } from "@/types/LoginForm.ts";
import loginValidation from "@/utilities/validators/LoginValidation";
import { useState } from "react";
import { NavigateFunction } from "react-router-dom";

const useLoginState = () => {
  const { jwt, setJwt } = useJwtStore();
  const [loginFormData, setLoginFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });
  const [loginErrors, setLoginErrors] = useState<LoginErrorData>({
    email: null,
    password: null,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginFormData((prevData: LoginFormData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleLogin = async (
    e: React.MouseEvent<HTMLButtonElement>,
    navigate: NavigateFunction
  ) => {
    try {
      e.preventDefault();
      // setButtonLoading(buttonId, true);
      await loginValidation(loginFormData, setLoginErrors);
      const token = await logInUser(loginFormData);
      console.log(token);
      await setJwt(token.data);
      navigate("/dashboard");
      // setButtonLoading(buttonId, false);
    } catch (e) {
      // setButtonLoading(buttonId, false);
      if (e.message === "Incorrect Credentials")
        setLoginErrors({
          email: "Invalid creditentials",
          password: "Invalid creditentials",
        });
      // setButtonLoading(false);
    }
  };

  return {
    loginFormData,
    loginErrors,
    handleInputChange,
    handleLogin,
  };
};

export default useLoginState;
