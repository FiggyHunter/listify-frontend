import reviewSchema from "@/schemas/reviewSchema";
import { ValidationError } from "yup";

const reviewValidation = async (reviewText, setReviewError) => {
  try {
    setReviewError(null);
    await reviewSchema.validate(reviewText, {
      abortEarly: false,
    });
  } catch (errors) {
    if (errors instanceof ValidationError) {
      errors.inner.forEach((error) => {
        if (error.value !== "" || error.value === "") {
          setReviewError(error.message);
          return;
        }
      });
    }
  }
};

export default reviewValidation;
