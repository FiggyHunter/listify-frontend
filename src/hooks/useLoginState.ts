import { LoginErrorData, LoginFormData } from "@/types/LoginForm.ts";
import { useState } from "react";

const useLoginState = () => {
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

  setLoginErrors({
    email: null,
    password: null,
  });

  // const handleLogin = async (
  //   e: React.MouseEvent<HTMLButtonElement>,
  //   navigate: Function,
  //   buttonId: String
  // ) => {
  //   try {
  //     e.preventDefault();
  //     setButtonLoading(buttonId, true);
  //     await loginValidation(loginFormData, setLoginErrors);
  //     const token = await logInUser(loginFormData);
  //     await setJwt(token.data);
  //     navigate("/dashboard");
  //     setButtonLoading(buttonId, false);
  //   } catch (e) {
  //     setButtonLoading(buttonId, false);
  //     if (e.message === "Incorrect Credentials")
  //       setLoginErrors({
  //         email: "Invalid creditentials",
  //         password: "Invalid creditentials",
  //       });
  //     setButtonLoading(false);
  //   }
  // };

  return {
    loginFormData,
    loginErrors,
    handleInputChange,
  };
};

export default useLoginState;
