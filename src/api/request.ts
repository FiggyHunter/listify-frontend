import { companyRequestValidation } from "@/utilities/validators/CompanyRequestValidation";
import Axios from "axios";
export const addRequest = async (
  jwt,
  companyId,
  userId,
  requestText,
  setRequestErrors,
  buttonId,
  setButtonLoading
) => {
  const uri = import.meta.env.VITE_API_ENDPOINT + `/api/request/add`;
  setButtonLoading(buttonId, true);
  try {
    companyRequestValidation(requestText, setRequestErrors);
    console.log("dalje");
    const response = await Axios.post(
      uri,
      { userId, companyId, text: requestText, type: "CATEGORISATION" },
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    );
    setButtonLoading(buttonId, false);
  } catch (error) {
    console.log(error);
    setButtonLoading(buttonId, false);
    throw error;
  }
};

export const getAllRequests = async (jwt, setRequests) => {
  const uri = import.meta.env.VITE_API_ENDPOINT + `/api/request/getAll`;
  try {
    const response = await Axios.get(uri, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });

    await setRequests(response.data);
  } catch (error) {
    throw error;
  }
};

export const deleteRequest = async (jwt, id, setRequests) => {
  const uri = import.meta.env.VITE_API_ENDPOINT + `/api/request/remove/${id}`;
  try {
    const response = await Axios.delete(uri, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    await getAllRequests(jwt, setRequests);
  } catch (error) {
    throw error;
  }
};
