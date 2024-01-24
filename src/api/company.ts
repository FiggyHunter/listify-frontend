import Axios from "axios";
import { getCountryNameById } from "./country";

async function modifyAllHq(jwt, data) {
  const modifiedData = await Promise.all(
    data.map(async (obj) => {
      const newHq = await getCountryNameById(jwt, obj.hq._id);
      return { ...obj, hq: newHq };
    })
  );
  return modifiedData;
}

function FormatAddCompanyRequest(companyData) {
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
    group: companyData.category,
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
    const modifiedResponse = await modifyAllHq(jwt, response.data);
    setCompanies(modifiedResponse?.reverse());
  } catch (error) {
    console.log(error);
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
    response.data.hq = await getCountryNameById(jwt, response.data.hq._id);
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
  } catch (error) {
    throw error;
  }
};
