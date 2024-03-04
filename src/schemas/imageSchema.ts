import { object, shape, mixed, test, required } from "yup";

export const imageSchema = object().shape({
  imageFile: mixed()
    .test(
      "fileType",
      "Invalid file format. Only PNG, JPEG, and WEBP images are allowed.",
      (value) => {
        if (!value) return true;
        const supportedFormats = ["image/png", "image/jpeg", "image/webp"];
        return supportedFormats.includes(value.type);
      }
    )
    .required("Please select an image file."),
});
