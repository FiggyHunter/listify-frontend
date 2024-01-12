import { RegisterErrorData, RegisterFormDataAPI } from "@/types/RegisterForm";
import Axios from "axios";

export const registerUser = async (
  formData: RegisterFormDataAPI,
  setRegisterError: Function
) => {
  const uri = import.meta.env.VITE_AUTH_ENDPOINT + "/register";
  try {
    await Axios.post(`${uri}`, formData);
  } catch (error: any) {
    if (error.response.data === "User already exists!")
      setRegisterError((prevData: RegisterErrorData) => {
        return { ...prevData, email: "Email Already Exists" };
      });
    console.log(error);
    throw new Error(error.message);
  }
};
