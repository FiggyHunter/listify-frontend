import reviewValidation from "@/utilities/validators/ReviewValidation";
import Axios from "axios";
import { toast } from "react-toastify";
const notifyAddedReview = () =>
  toast(`You have added a review for the company.`);
export const AddReview = async (
  reviewData,
  jwt,
  setReviews,
  buttonId,
  setButtonLoading,
  setReviewError
) => {
  const uri = import.meta.env.VITE_API_ENDPOINT + `/api/review/add`;
  try {
    setButtonLoading(buttonId, true);
    await reviewValidation(reviewData.text, setReviewError);
    await Axios.post(uri, reviewData, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    setReviews(await getAllReviewsByCompany(reviewData.companyId, jwt));
    notifyAddedReview();
    setButtonLoading(buttonId, false);
  } catch (error) {
    setButtonLoading(buttonId, false);
    throw error;
  }
};

export const getAllReviewsByCompany = async (companyId, jwt) => {
  const uri =
    import.meta.env.VITE_API_ENDPOINT + `/api/review/getByCompany/${companyId}`;
  try {
    const response = await Axios.get(uri, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    return response.data.reverse();
  } catch (error) {
    throw error;
  }
};

export const getReviewsByUserId = async (jwt, userId) => {
  const uri =
    import.meta.env.VITE_API_ENDPOINT + `/api/review/getByUserId/${userId}`;
  try {
    const response = await Axios.get(uri, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
