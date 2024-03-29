import { LoginFormData } from "@/types/LoginForm";
import Axios from "axios";

export const logInUser = async (userData: LoginFormData) => {
  const uri = import.meta.env.VITE_AUTH_ENDPOINT + "/login";
  try {
    const response = await Axios.post(uri, userData);
    return response?.data?.token;
  } catch (error) {
    throw new Error(error.response.status);
  }
};
