import { passwordUpdateSchema } from "@/schemas/userSchema";
import { ValidationError } from "yup";

export const changePasswordValidation = async (
  userData,
  setUserDataErrors,
  buttonId,
  setButtonLoading
) => {
  try {
    setUserDataErrors(null);
    setButtonLoading(buttonId, true);
    await passwordUpdateSchema.validate(userData, {
      abortEarly: false,
    });
    setButtonLoading(buttonId, false);
  } catch (errors) {
    console.log(errors);
    setButtonLoading(buttonId, false);
    if (errors instanceof ValidationError) {
      console.log(errors);
      errors.inner.forEach((error) => {
        console.log(error.path);

        setUserDataErrors((prevErrors) => ({
          ...prevErrors,
          [error.path]: error.message,
        }));
      });
    }
  }
};
