import { RegisterErrorData, RegisterFormData } from "@/types/RegisterForm";
import { useState } from "react";

const useRegisterState = () => {
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

  return {
    registerFormData,
    registerErrors,
    handleInputChange,
  };
};

export default useRegisterState;
