import { ValidationError } from "yup";
import { imageSchema } from "@/schemas/imageSchema";

const imageValidation = async (image: File, setCompanyImage, setImageError) => {
  setImageError("");
  try {
    await imageSchema.validate(
      { imageFile: image },
      {
        abortEarly: false,
      }
    );
    await setCompanyImage(image);
  } catch (errors) {
    if (errors instanceof ValidationError) {
      errors.inner.forEach((error) => {
        console.log(error.message);
        setImageError(error.message);
      });
    }
  }
};

export default imageValidation;
