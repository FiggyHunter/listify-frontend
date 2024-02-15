import Axios from "axios";
export const getAllCategories = async (jwt, setCategories) => {
  const uri = import.meta.env.VITE_API_ENDPOINT + "/api/category/getAll";
  try {
    const response = await Axios.get(uri, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });

    console.log(response.data);
    await setCategories(response.data);
  } catch (error) {
    console.log(error);

    console.log(error);
    throw new Error(error.response.data);
  }
};
