import * as yup from "yup";

const requestSchema = yup
  .string()
  .required("Text can't be empty")
  .min(10, "Text must be at least 10 characters")
  .max(100, "Text must be at most 100 characters");
export default requestSchema;
