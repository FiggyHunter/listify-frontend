import * as yup from "yup";

const expertiseSchema = yup.object().shape({
  _id: yup.string().required(),
  name: yup.string().required(),
});

const areasOfExpertiseSchema = yup.array().of(expertiseSchema);

const editCompanySchema = yup.object({
  name: yup
    .string()
    .required("Company name is required")
    .min(2, "Company name should have at least 2 chars"),
  description: yup
    .string()
    .required("Company description is required")
    .min(40, "Description should have min 40 chars"),
  websiteURL: yup
    .string()
    .url("Invalid website URL")
    .required("Website URL is required"),
  linkedinURL: yup
    .string()
    .url("Invalid LinkedIn URL")
    .required("LinkedIn URL is required"),
  hq: yup
    .object({
      _id: yup.string().required(),
      name: yup.string().required("HQ name is required"),
    })
    .required("HQ details are required"),
  countries: yup
    .array()
    .of(
      yup.object({
        _id: yup.string().required(),
        name: yup.string().required("Country name is required"),
      })
    )
    .min(1, "At least one country is required"),
  categories: yup
    .array()
    .of(
      yup.object({
        _id: yup.string().required(),
        name: yup.string().required("Category name is required"),
      })
    )
    .min(1, "At least one category is required"),
  group: yup.string().required("Group is required"),
  createdAt: yup.date().required("Creation date is required"),
  __v: yup.number().required(),
});

export default editCompanySchema;
