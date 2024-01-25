import { registerUser } from "@/api/registerUser";
import { RegisterErrorData, RegisterFormData } from "@/types/RegisterForm";
import { handleResponseError } from "@/utilities/ResponseErrors";
import registerValidation from "@/utilities/validators/RegisterValidation";
import { useState } from "react";
import { NavigateFunction } from "react-router-dom";
import { toast } from "react-toastify";

const useRegisterState = () => {
  const notify = () =>
    toast(
      `User account ${registerFormData.email} is registered successfully. Proceed to login!`
    );
  const [registerFormData, setRegisterFormData] = useState<RegisterFormData>({
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    repeatPassword: "",
  });
  const [registerErrors, setRegisterErrors] = useState<RegisterErrorData>({
    email: null,
    firstName: null,
    lastName: null,
    password: null,
    repeatPassword: null,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRegisterFormData((prevData: RegisterFormData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleRegister = async (
    e: React.MouseEvent<HTMLButtonElement>,
    navigate: NavigateFunction
  ) => {
    e.preventDefault();
    try {
      // setButtonLoading(buttonId, true);
      await registerValidation(registerFormData, setRegisterErrors);
      await registerUser(
        {
          email: registerFormData.email,
          name: registerFormData.firstName,
          surname: registerFormData.lastName,
          password: registerFormData.password,
          confirmPassword: registerFormData.repeatPassword,
        },
        setRegisterErrors
      );
      // setButtonLoading(buttonId, false);
      await setRegisterFormData({
        email: "",
        firstName: "",
        lastName: "",
        password: "",
        repeatPassword: "",
      });

      await notify();
    } catch (error) {
      console.log(error);
      if (error.message === "400")
        handleResponseError("Register", setRegisterErrors);
      // setButtonLoading(buttonId, false);
    }

    return;
  };

  return {
    registerFormData,
    registerErrors,
    handleInputChange,
    handleRegister,
    setRegisterErrors,
  };
};

export default useRegisterState;
