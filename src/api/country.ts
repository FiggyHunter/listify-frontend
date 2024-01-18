import Axios from "axios";

export const getCountryNameById = async (jwt, countryId) => {
  const uri =
    import.meta.env.VITE_API_ENDPOINT + `/api/country/getById/${countryId}`;
  try {
    const response = await Axios.get(uri, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    return response.data[0].name;
  } catch (error) {
    throw new Error(error.response.data);
  }
};

export const getAllCountries = async (jwt, setLocations) => {
  const uri = import.meta.env.VITE_API_ENDPOINT + `/api/country/getAll`;
  try {
    const response = await Axios.get(uri, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });

    const modifiedResponse = response.data.map((country) => ({
      id: country._id,
      country: country.name,
    }));

    setLocations(modifiedResponse);
  } catch (error) {
    throw new Error(error.response.data);
  }
};
