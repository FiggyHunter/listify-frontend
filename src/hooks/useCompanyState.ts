import { CreateCompany, addCompanyImage, getAllCompanies } from "@/api/company";
import { useJwtStore } from "@/stores/useUserStore";
import { useState } from "react";
import CompanySchema from "@/schemas/companySchema.ts";
import { imageSchema } from "@/schemas/imageSchema";
import { toast } from "react-toastify";

const useCompanyState = () => {
  const notifyCreatedCompany = () =>
    toast(`You have successfully added a new company.`);
  const { jwt } = useJwtStore();

  const [companyData, setCompanyData] = useState({
    companyName: "",
    companyDescription: "",
    companyHQ: {},
    location: [""],
    areasOfExperise: [],
    category: "HIRING",
    linkedinUrl: "",
    websiteUrl: "",
    locationId: "",
    hqId: "",
  });

  const [companyImage, setCompanyImage] = useState({});

  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCompanyData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCompanyCreation = async (
    buttonId,
    setButtonLoading,
    setUploadErrors
  ) => {
    try {
      setButtonLoading(buttonId, true);
      await CompanySchema.validate(companyData, { abortEarly: false });
      await imageSchema.validate(
        { imageFile: companyImage },
        { abortEarly: false }
      );
      const response = await CreateCompany(companyData, jwt);
      const company_id = response.data.company_id;
      await addCompanyImage(
        jwt,
        company_id,
        companyImage,
        null,
        null,
        null,
        setUploadErrors
      );
      setButtonLoading(buttonId, false);
      notifyCreatedCompany();
    } catch (error) {
      setButtonLoading(buttonId, false);
      if (error?.response?.data?.error === "Company Already Exists") {
        setErrors({ companyName: "Company with that name already exists!" });
        return;
      }

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
