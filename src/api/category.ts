import Axios from "axios";

export const getAllCategories = async (jwt, setCategories) => {
  const uri = import.meta.env.VITE_API_ENDPOINT + "/api/category/getAll";
  try {
    const response = await Axios.get(uri, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    await setCategories(response.data);
  } catch (error) {
    throw new Error(error.response.data);
  }
};
