import Axios from "axios";
import { getCountryNameById } from "./country";
import { toast } from "react-toastify";

const notifyDeletedCompany = (companyName) =>
  toast(`You have successfully REMOVED ${companyName}.`);

export const notifyUpdatedCompany = () =>
  toast(`You have successfully updated the company.`);

async function modifyAllHq(jwt, data) {
  const modifiedData = await Promise.all(
    data.map(async (obj) => {
      const newHq = await getCountryNameById(jwt, obj.hq._id);
      return { ...obj, hq: newHq };
    })
  );
  return modifiedData;
}

export function formatExistingCompany(company) {
  const {
    name: companyName,
    description: companyDescription,
    hq,
    websiteURL: websiteUrl,
    linkedinURL: linkedinUrl,
    countries,
    group,
    categories,
  } = company;

  const locationId = countries.map((country) => country._id);

  const categoryIds = categories.map((category) => {
    return category._id;
  });

  const formattedCompany = {
    companyName: companyName,
    companyDescription: companyDescription,
    companyHQ: hq._id,
    countries: [...countries],
    areasOfExperise: ["Software Development"],
    categories: categoryIds,
    linkedinUrl: linkedinUrl,
    websiteUrl: websiteUrl,
    locationId: locationId,
    hqId: hq._id,
  };

  return formattedCompany;
}

function FormatAddCompanyRequest(companyData) {
  const categoryIds = companyData.areasOfExperise.map((category) => {
    return category._id;
  });

  return {
    name: companyData.companyName,
    description: companyData.companyDescription,
    logo: "/neki_logo.webp",
    websiteURL: companyData.websiteUrl,
    linkedinURL: companyData.linkedinUrl,
    hq: companyData.hqId,
    categories: categoryIds,
    countries: companyData.locationId,
    group: `${companyData.category}`,
  };
}

export const getAllCompanies = async (jwt, setCompanies) => {
  const uri = import.meta.env.VITE_API_ENDPOINT + "/api/company/getAll";
  try {
    const response = await Axios.get(uri, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    setCompanies(response.data?.reverse());
  } catch (error) {
    throw new Error(error.response.data);
  }
};

export const getCompanyById = async (jwt, setCompany, id) => {
  const uri = import.meta.env.VITE_API_ENDPOINT + `/api/company/getById/${id}`;
  try {
    const response = await Axios.get(uri, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    setCompany(await response.data);
  } catch (error) {
    throw new Error(error.response.data);
  }
};

export const CreateCompany = async (companyData, jwt) => {
  const formattedRequest = FormatAddCompanyRequest(companyData);
  const uri = import.meta.env.VITE_API_ENDPOINT + `/api/company/add`;
  try {
    const response = await Axios.post(uri, formattedRequest, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const deleteCompany = async (
  companyId,
  companyName,
  jwt,
  setCompanies,
  buttonId,
  setButtonLoading
) => {
  setButtonLoading(buttonId, true);
  const uri =
    import.meta.env.VITE_API_ENDPOINT + `/api/company/remove/${companyId}`;

  try {
    await Axios.delete(uri, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    notifyDeletedCompany(companyName);
    setCompanies((prevCompanies) => {
      return prevCompanies.filter(
        (prevCompany) => prevCompany._id !== companyId
      );
    });
    setButtonLoading(buttonId, false);
  } catch (error) {
    setButtonLoading(buttonId, false);
    throw error;
  }
};

export const addCompanyImage = async (
  jwt,
  companyId,
  companyImage,
  setCompanies,
  setButtonLoading,
  buttonId,
  setUploadErrors
) => {
  if (setUploadErrors) setUploadErrors(null);
  if (setButtonLoading) setButtonLoading(buttonId, true);
  const uri =
    import.meta.env.VITE_API_ENDPOINT +
    `/api/company/addImageToCompany/${companyId}`;
  try {
    const formData = new FormData();
    formData.append("image", companyImage, companyImage.name);

    await Axios.post(uri, formData, {
      headers: {
        Authorization: `Bearer ${jwt}`,
        "Content-Type": "multipart/form-data",
      },
    });
    if (setCompanies) await getAllCompanies(jwt, setCompanies);
    if (setButtonLoading) setButtonLoading(buttonId, false);
  } catch (error) {
    if (setButtonLoading) setButtonLoading(buttonId, false);
    if (error.code === "ERR_BAD_RESPONSE") {
      setUploadErrors(
        "Error trying to upload the image, please try uploading another format, image or name."
      );
    }
    throw error;
  }
};

export const getEmployeesByCompany = async (jwt, companyId, setEmployees) => {
  const uri =
    import.meta.env.VITE_API_ENDPOINT +
    `/api/company/getAllUsersInCompany/${companyId}`;
  try {
    const response = await Axios.get(uri, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    setEmployees(response.data);
  } catch (error) {
    throw error;
  }
};

export const updateCompany = async (
  jwt,
  companyData,
  setCompanies,
  setButtonLoading,
  buttonId
) => {
  setButtonLoading(buttonId, true);
  if (Object.entries(companyData).length <= 1) {
    setButtonLoading(buttonId, false);
    return;
  }

  const uri = import.meta.env.VITE_API_ENDPOINT + `/api/company/update`;
  try {
    await Axios.patch(
      uri,
      { ...companyData },
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    );
    await getAllCompanies(jwt, setCompanies);
    setButtonLoading(buttonId, false);
  } catch (error) {
    setButtonLoading(buttonId, false);
    throw error;
  }
};
