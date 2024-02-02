import Axios from "axios";

export const getUserById = async (userId, jwt) => {
  const uri =
    import.meta.env.VITE_API_ENDPOINT + `/api/users/getById/${userId}`;
  try {
    const response = await Axios.get(uri, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    console.log(response);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getAllUsers = async (jwt) => {
  const uri = import.meta.env.VITE_API_ENDPOINT + `/api/users/getAll`;
  try {
    const response = await Axios.get(uri, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    console.log(response);
    return response.data;
  } catch (error) {
    throw error;
  }
};
