import { CreateCompany, addCompanyImage } from "@/api/company";
import { useJwtStore } from "@/stores/useUserStore";
import { useState } from "react";
import CompanySchema from "@/schemas/companySchema.ts"; // Import your yup schema
import { imageSchema } from "@/schemas/imageSchema";

const useCompanyState = () => {
  const { jwt } = useJwtStore();

  const [companyData, setCompanyData] = useState({
    companyName: "",
    companyDescription: "",
    companyHQ: {},
    location: [""],
    areasOfExperise: ["Software Development"],
    category: "HIRING",
    linkedinUrl: "",
    websiteUrl: "",
    locationId: "",
    hqId: "",
  });

  const [companyImage, setCompanyImage] = useState({});

  console.log(companyImage);

  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCompanyData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCompanyCreation = async () => {
    try {
      await CompanySchema.validate(companyData, { abortEarly: false });
      await imageSchema.validate(
        { imageFile: companyImage },
        { abortEarly: false }
      );
      const response = await CreateCompany(companyData, jwt);
      console.log(response);
      const company_id = response.data.company_id;
      console.log(company_id);
      await addCompanyImage(jwt, company_id, companyImage);
      setErrors({});
    } catch (error) {
      console.log(error);
      if (
        error.response &&
        error?.response?.data?.error === "Company Already Exists"
      )
        setErrors({ companyName: "Company with that name already exists!" });
      const validationErrors = {};
      error?.inner?.forEach((err) => {
        validationErrors[err.path] = err.message;
      });
      setErrors(validationErrors);
    }
  };

  return {
    companyData,
    setCompanyData,
    handleChange,
    handleCompanyCreation,
    errors,
    setCompanyImage,
    companyImage,
  };
};

export default useCompanyState;
