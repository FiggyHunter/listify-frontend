import requestSchema from "@/schemas/requestSchema";
import { ValidationError } from "yup";

export const companyRequestValidation = async (userData, setRequestErrors) => {
  try {
    setRequestErrors(null);
    await requestSchema.validate(userData, {
      abortEarly: false,
    });
  } catch (errors) {
    if (errors instanceof ValidationError) {
      errors.inner.forEach((error) => {
        setRequestErrors(error.message);
        throw new Error("Validation Error.");
      });
    }
  }
};
