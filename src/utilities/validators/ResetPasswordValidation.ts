import { resetPassword } from "@/schemas/RepeatPassword";
import { sendResetPassword } from "@/api/resetPassword";
import { ValidationError } from "yup";
import { toast } from "react-toastify";
import { useButtonLoadingStore } from "@/stores/useButtonLoadingStore";

const resetPasswordValidation = async (
  email: string,
  setEmailError,
  buttonId,
  setButtonLoading
) => {
  const notify = () =>
    toast(`Sent an email to ${email}, please follow the instructions.`);
  try {
    setEmailError(null);
    setButtonLoading(buttonId, true);
    await resetPassword.validate(email, {
      abortEarly: false,
    });
    await sendResetPassword(email);
    await notify();
    setButtonLoading(buttonId, false);
  } catch (errors) {
    setButtonLoading(buttonId, false);
    if (errors instanceof ValidationError) {
      errors.inner.forEach((error) => {
        if (error.value !== "" || error.value === "") {
          setEmailError(error.message);
          return;
        }
      });
    }
  }
};

export default resetPasswordValidation;
