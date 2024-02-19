import Axios from "axios";
import { toast } from "react-toastify";

const notify = () => toast(`You have saved the updates to your user account.`);

const notifyApprovedUser = (userFullName) =>
  toast(`You have successfully approved the request for ${userFullName}.`);

const notifyDisbandedRequest = () =>
  toast(`You have successfully DISBANDED the request to join.`);

export const getUserById = async (userId, jwt) => {
  const uri =
    import.meta.env.VITE_API_ENDPOINT + `/api/users/getById/${userId}`;
  try {
    const response = await Axios.get(uri, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getAllUsers = async (jwt) => {
  const uri = import.meta.env.VITE_API_ENDPOINT + `/api/users/getAll`;
  try {
    const response = await Axios.get(uri, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateUserData = async (
  buttonId,
  setButtonLoading,
  jwt,
  updateUserData,
  setJwt
) => {
  console.log(jwt);
  console.log(updateUserData);
  // if (Object.keys(updateUserData).length === 0) {
  //   console.log("usao");
  //   throw new Error("Please Input Details");
  // }
  setButtonLoading(buttonId, true);
  const formattedUserData = { ...updateUserData };

  if (formattedUserData.name === "") delete formattedUserData.name;
  if (formattedUserData.surname === "") delete formattedUserData.surname;
  if (formattedUserData.skills.length === 0) {
    delete formattedUserData.skills;
    delete formattedUserData.skillsIds;
  }
  // if (oldPassword)
  //   if (newPassword) if (repeatPassword)
  // console.log(formattedUserData);

  const uri = import.meta.env.VITE_API_ENDPOINT + `/api/users/update`;
  try {
    const response = await Axios.patch(uri, formattedUserData, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    setJwt(response.data);
    setButtonLoading(buttonId, false);
    notify();
    return response.data;
  } catch (error) {
    console.log(error);
    setButtonLoading(buttonId, false);
    throw error;
  }
};

export const updateUserPassword = async (
  buttonId,
  setButtonLoading,
  jwt,
  userPasswordData,
  setJwt
) => {
  console.log(jwt);
  console.log(userPasswordData);

  setButtonLoading(buttonId, true);
  const formattedUserData = { ...userPasswordData };

  const uri = import.meta.env.VITE_API_ENDPOINT + `/api/users/changePassword`;
  console.log(uri);
  try {
    const response = await Axios.patch(uri, formattedUserData, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    console.log(response);

    setButtonLoading(buttonId, false);
    console.log(jwt);
    notify();
    return response.data;
  } catch (error) {
    console.log(error);
    setButtonLoading(buttonId, false);
    throw error;
  }
};

export const changeAdmitted = async (
  buttonId,
  setButtonLoading,
  jwt,
  userId,
  handleAdmitUser,
  fullName
) => {
  const uri = import.meta.env.VITE_AUTH_ENDPOINT + `/approveNewUser/${userId}`;
  console.log(uri);
  try {
    setButtonLoading(buttonId, true);
    const response = await Axios.patch(
      uri,
      {},
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    );
    setButtonLoading(buttonId, false);
    handleAdmitUser(userId);
    notifyApprovedUser(fullName);
    return response.data;
  } catch (error) {
    setButtonLoading(buttonId, false);
    console.log(error);
    throw error;
  }
};

export const joinCompany = async (jwt, userId, companyId, fetchEmployees) => {
  const uri = import.meta.env.VITE_AUTH_ENDPOINT + `/joinCompany/`;
  console.log(uri);
  try {
    const response = await Axios.patch(
      uri,
      { user_id: userId, company_id: companyId },
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    );
    fetchEmployees();
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const leaveCompany = async (jwt, userId, fetchEmployees) => {
  const uri = import.meta.env.VITE_AUTH_ENDPOINT + `/leaveCompany/${userId}`;
  console.log(uri);
  try {
    const response = await Axios.patch(
      uri,
      { userId },
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    );
    fetchEmployees();
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const disbandUser = async (
  buttonId,
  setButtonLoading,
  jwt,
  userId,
  fetchUsers
) => {
  setButtonLoading(buttonId, true);
  const uri = import.meta.env.VITE_AUTH_ENDPOINT + `/disband/${userId}`;
  console.log(uri);
  try {
    await Axios.patch(
      uri,
      {},
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    );
    setButtonLoading(buttonId, false);
    notifyDisbandedRequest();
    fetchUsers();
  } catch (error) {
    setButtonLoading(buttonId, false);
    console.log(error);
    throw error;
  }
};

export const banUser = async (jwt, userId, fetchUsers) => {
  const uri = import.meta.env.VITE_AUTH_ENDPOINT + `/banUser/${userId}`;
  try {
    await Axios.patch(
      uri,
      {},
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    );
    fetchUsers();
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const unbanUser = async (jwt, userId, fetchUsers) => {
  console.log(userId);
  const uri = import.meta.env.VITE_AUTH_ENDPOINT + `/unBanUser/${userId}`;
  try {
    await Axios.patch(
      uri,
      {},
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    );
    fetchUsers();
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const promoteUser = async (jwt, userId, fetchUsers) => {
  const uri = import.meta.env.VITE_AUTH_ENDPOINT + `/promoteToAdmin/${userId}`;
  try {
    await Axios.patch(
      uri,
      {},
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    );
    fetchUsers();
  } catch (error) {
    console.log(error);
    throw error;
  }
};
