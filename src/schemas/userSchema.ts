import { object, string, ref } from "yup";

const userRegisterSchema = object({
  email: string()
    .required("No email provided.")
    .email("Email needs to be in the correct format!")
    .min(5, "Email is too short - minimum of 5 charachters."),
  firstName: string().required("You didn't input your frist name."),
  lastName: string().required("You didn't input your last name."),
  password: string()
    .required("No password provided.")
    .min(8, "Password is too short - minimum of 8 charachters.")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).+$/,
      "Password must contain at least one lowercase letter, one uppercase letter, and one special character."
    ),
  repeatPassword: string()
    .required("You must confirm your password.")
    .oneOf([ref("password")], "Passwords must match."),
});
const userLoginSchema = object({
  email: string()
    .required("No email provided.")
    .email("Email needs to be in the correct format!")
    .min(5, "Email is too short - minimum of 5 charachters."),
  password: string()
    .required("No password provided.")
    .min(5, "Password is too short - minimum of 8 charachters."),
});

const onBoardingName = string()
  .required("You didn't provide your name.")
  .min(3, "Name is too short!")
  .matches(/^[aA-zZ\s]+$/, "Name should have only letters.");

const passwordUpdateSchema = object({
  oldPassword: string()
    .required("Old password is required")
    .min(8, "Old password must be at least 8 characters"),
  newPassword: string()
    .required("New password is required")
    .min(8, "New password must be at least 8 characters")
    .oneOf([ref("repeatPassword")], "New password must match repeat password"),
  repeatPassword: string()
    .required("Repeat password is required")
    .oneOf([ref("newPassword")], "Repeat password must match new password"),
});

export {
  userRegisterSchema,
  userLoginSchema,
  onBoardingName,
  passwordUpdateSchema,
};
