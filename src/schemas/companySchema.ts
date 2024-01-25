import * as yup from "yup";

const CompanySchema = yup.object({
  companyName: yup.string().required("Company name is required"),
  companyDescription: yup.string().required("Company description is required"),
  companyHQ: yup.string().required("Company HQ is required"),
  location: yup
    .array(yup.string())
    .test({
      test: (value) => value.length > 0,
      message: "At least one location is required",
    })
    .required("At least one location is required"),
  areasOfExperise: yup
    .array(yup.string())
    .test({
      test: (value) => value.length > 0,
      message: "At least one location is required",
    })
    .required("At least one expertise is required"),
  category: yup.string().required("Category is required"),
  linkedinUrl: yup
    .string()
    .url("Invalid LinkedIn URL")
    .required("LinkedIn URL is required"),
  websiteUrl: yup
    .string()
    .url("Invalid website URL")
    .required("Website URL is required"),
});

export default CompanySchema;
