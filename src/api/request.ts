import { companyRequestValidation } from "@/utilities/validators/CompanyRequestValidation";
import Axios from "axios";

import { toast } from "react-toastify";

const notifyRequestAdded = () =>
  toast(`You have successfully submited request for the review.`);

const notifyRequestCompleted = () =>
  toast(`You have successfully marked this request as completed.`);

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

    const response = await Axios.post(
      uri,
      { userId, companyId, text: requestText, type: "CATEGORISATION" },
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    );
    notifyRequestAdded();
    setButtonLoading(buttonId, false);
  } catch (error) {
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

export const deleteRequest = async (
  jwt,
  id,
  setRequests,
  buttonId,
  setButtonLoading
) => {
  setButtonLoading(buttonId, true);
  const uri = import.meta.env.VITE_API_ENDPOINT + `/api/request/remove/${id}`;
  try {
    const response = await Axios.delete(uri, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    await getAllRequests(jwt, setRequests);
    notifyRequestCompleted();
    setButtonLoading(buttonId, false);
  } catch (error) {
    setButtonLoading(buttonId, false);
    throw error;
  }
};
