import Axios from "axios";
export const sendResetPassword = async (email: string) => {
  const uri =
    import.meta.env.VITE_AUTH_ENDPOINT + "/sendAcceptanceMail/" + email;
  try {
    const response = await Axios.get(uri);
    return response?.data?.token;
  } catch (error) {
    throw new Error(error.response.status);
  }
};
