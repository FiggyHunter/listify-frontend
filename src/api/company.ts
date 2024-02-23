import Axios from "axios";
import { getCountryNameById } from "./country";
import { toast } from "react-toastify";

const notifyDeletedCompany = (companyName) =>
  toast(`You have successfully REMOVED ${companyName}.`);

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
  console.log(company);
  // Extracting necessary fields from the company object
  const {
    name: companyName,
    description: companyDescription,
    hq,
    websiteURL: websiteUrl,
    linkedinURL: linkedinUrl,
    countries,
    group,
  } = company;

  const locationId = countries.map((country) => country._id);

  const formattedCompany = {
    companyName: companyName,
    companyDescription: companyDescription,
    companyHQ: hq._id,
    countries: [...countries],
    areasOfExperise: ["Software Development"],
    category: group,
    linkedinUrl: linkedinUrl,
    websiteUrl: websiteUrl,
    locationId: locationId,
    hqId: hq._id,
  };

  console.log(formattedCompany);

  return formattedCompany;
}

function FormatAddCompanyRequest(companyData) {
  console.log(companyData);
  //   {
  //     "name": "Tech Innovators Ltd",
  //     "description": "Tech Innovators is a cutting-edge technology company focused on creating groundbreaking solutions to meet the evolving needs of businesses globally.",
  //     "logo" : "neki link za url",
  //     "websiteURL": "http://www.techinnovators.com",
  //     "linkedinURL": "http://www.linkedin.com/techinnovators",
  //     "hq": "6598a2509c886391d35e406e",
  //     "categories" : ["neki ID"],
  //     "countries": ["6598a2509c886391d35e406e"],
  //     "group": "HIRING"
  // }
  return {
    name: companyData.companyName,
    description: companyData.companyDescription,
    logo: "/neki_logo.webp",
    websiteURL: companyData.websiteUrl,
    linkedinURL: companyData.linkedinUrl,
    hq: companyData.hqId,
    categories: ["neki ID"],
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

    console.log(response.data);
    setCompanies(response.data?.reverse());
  } catch (error) {
    console.log(error);
    throw new Error(error.response.data);
  }
};

export const getCompanyById = async (jwt, setCompany, id) => {
  console.log(id);
  const uri = import.meta.env.VITE_API_ENDPOINT + `/api/company/getById/${id}`;
  try {
    const response = await Axios.get(uri, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    console.log(response.data);
    setCompany(await response.data);
  } catch (error) {
    throw new Error(error.response.data);
  }
};

export const CreateCompany = async (companyData, jwt) => {
  /* 

{
    "name": "Tech Innovators Ltd",
    "description": "Tech Innovators is a cutting-edge technology company focused on creating groundbreaking solutions to meet the evolving needs of businesses globally.",
    "logo" : "neki link za url",
    "websiteURL": "http://www.techinnovators.com",
    "linkedinURL": "http://www.linkedin.com/techinnovators",
    "hq": "6598a2509c886391d35e406e",
    "categories" : ["neki ID"],
    "countries": ["6598a2509c886391d35e406e"],
    "group": "HIRING"
}

  */

  console.log(jwt);
  console.log(companyData);
  const formattedRequest = FormatAddCompanyRequest(companyData);
  console.log(formattedRequest);
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
  setCompanies
) => {
  const uri =
    import.meta.env.VITE_API_ENDPOINT + `/api/company/remove/${companyId}`;
  console.log(uri);
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
  } catch (error) {
    throw error;
  }
};

export const addCompanyImage = async (jwt, companyId, companyImage) => {
  const uri =
    import.meta.env.VITE_API_ENDPOINT +
    `/api/company/addImageToCompany/${companyId}`;
  console.log(companyImage);
  try {
    const formData = new FormData();
    formData.append("image", companyImage, companyImage.name);
    console.log(formData);
    console.log(
      await Axios.post(uri, formData, {
        headers: {
          Authorization: `Bearer ${jwt}`,
          "Content-Type": "multipart/form-data",
        },
      })
    );
  } catch (error) {
    console.log(error);
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
    console.log(response.data);
    setEmployees(response.data);
  } catch (error) {
    console.log(error);
    throw error;
  }
};
