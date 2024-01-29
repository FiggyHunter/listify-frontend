import Axios from "axios";
export const AddReview = async (reviewData, jwt) => {
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
  console.log(reviewData);
  const uri = import.meta.env.VITE_API_ENDPOINT + `/api/review/add`;
  try {
    const response = await Axios.post(uri, reviewData, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
  } catch (error) {
    throw error;
  }
};

export const getAllReviewsByCompany = async (companyId, jwt) => {
  const uri =
    import.meta.env.VITE_API_ENDPOINT + `/api/review/getByCompany/${companyId}`;
  try {
    const response = await Axios.get(uri, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    return response.data.reverse();
  } catch (error) {
    throw error;
  }
};
