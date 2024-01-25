import { CreateCompany } from "@/api/company";
import { useJwtStore } from "@/stores/useUserStore";
import { useState } from "react";
import CompanySchema from "@/schemas/companySchema.ts"; // Import your yup schema

const useCompanyState = () => {
  const { jwt } = useJwtStore();

  const [companyData, setCompanyData] = useState({
    companyName: "",
    companyDescription: "",
    companyHQ: "",
    location: [""],
    areasOfExperise: ["Software Development"],
    category: "HIRING",
    linkedinUrl: "",
    websiteUrl: "",
    locationId: "",
    hqId: "",
  });

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
      await CreateCompany(companyData, jwt);
      setErrors({});
    } catch (error) {
      console.log(error.response.data.error);
      if (
        error.code === "ERR_BAD_REQUEST" &&
        error.response.data.error === "Company Already Exists"
      )
        setErrors({ companyName: "Company with that name already exists!" });
      const validationErrors = {};
      error.inner.forEach((err) => {
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
  };
};

export default useCompanyState;
