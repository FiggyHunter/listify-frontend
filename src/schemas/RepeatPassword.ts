import * as yup from "yup";

export const resetPassword = yup
  .string()
  .required("No email provided.")
  .email("Email needs to be in the correct format!")
  .min(5, "Email is too short - minimum of 5 characters.");
