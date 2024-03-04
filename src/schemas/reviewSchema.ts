import * as yup from "yup";

const reviewSchema = yup
  .string()
  .required("Text can't be empty")
  .min(10, "Text must be at least 10 characters")
  .max(100, "Text must be at most 200 characters");

export default reviewSchema;
