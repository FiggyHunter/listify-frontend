import Axios from "axios";
import { toast } from "react-toastify";

const notify = () => toast(`You have saved the updates to your user account.`);

const notifyApprovedUser = (userFullName) =>
  toast(`You have successfully approved the request for ${userFullName}.`);

const notifyDisbandedRequest = () =>
  toast(`You have successfully DISBANDED the request to join.`);

const notifyBannedUser = async (fullName) => {
  toast(`You have BANNED the user ${fullName}`);
};
const notifyUnbannedUser = async (fullName) => {
  toast(`You have UNBANNED the user ${fullName}`);
};

const notifyPromotedUser = async (fullName) => {
  toast(`You have PROMOTED the USER ${fullName} to ADMIN `);
};

const notifyDemotedUser = async (fullName) => {
  toast(`You have DEMOTED the ADMIN ${fullName} to USER `);
};

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
  setButtonLoading(buttonId, true);
  const formattedUserData = { ...updateUserData };

  if (formattedUserData.name === "") delete formattedUserData.name;
  if (formattedUserData.surname === "") delete formattedUserData.surname;
  if (formattedUserData.skills.length === 0) {
    delete formattedUserData.skills;
    delete formattedUserData.skillsIds;
  }

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
  setButtonLoading(buttonId, true);
  const formattedUserData = { ...userPasswordData };

  const uri = import.meta.env.VITE_API_ENDPOINT + `/api/users/changePassword`;
  try {
    const response = await Axios.patch(uri, formattedUserData, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    setButtonLoading(buttonId, false);
    notify();
    return response.data;
  } catch (error) {
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
    throw error;
  }
};

export const joinCompany = async (jwt, userId, companyId, fetchEmployees) => {
  const uri = import.meta.env.VITE_AUTH_ENDPOINT + `/joinCompany/`;
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
    throw error;
  }
};

export const leaveCompany = async (jwt, userId, fetchEmployees) => {
  const uri = import.meta.env.VITE_AUTH_ENDPOINT + `/leaveCompany/${userId}`;
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
    await fetchUsers();
  } catch (error) {
    setButtonLoading(buttonId, false);
    throw error;
  }
};

export const banUser = async (
  jwt,
  userId,
  fetchUsers,
  buttonId,
  setButtonLoading
) => {
  const uri = import.meta.env.VITE_AUTH_ENDPOINT + `/banUser/${userId}`;
  setButtonLoading(buttonId, true);
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
    await fetchUsers();
    const { name, surname } = await getUserById(userId, jwt);
    await notifyBannedUser(`${name} ${surname}`);
    setButtonLoading(buttonId, false);
  } catch (error) {
    setButtonLoading(buttonId, false);
    throw error;
  }
};

export const unbanUser = async (
  jwt,
  userId,
  fetchUsers,
  buttonId,
  setButtonLoading
) => {
  setButtonLoading(buttonId, true);
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
    await fetchUsers();
    const { name, surname } = await getUserById(userId, jwt);
    await notifyUnbannedUser(`${name} ${surname}`);
    setButtonLoading(buttonId, false);
  } catch (error) {
    setButtonLoading(buttonId, false);
    throw error;
  }
};

export const promoteUser = async (
  jwt,
  userId,
  fetchUsers,
  buttonId,
  setButtonLoading
) => {
  setButtonLoading(buttonId, true);
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
    await fetchUsers();
    const { name, surname } = await getUserById(userId, jwt);
    notifyPromotedUser(`${name} ${surname}`);
    setButtonLoading(buttonId, false);
  } catch (error) {
    setButtonLoading(buttonId, false);
    throw error;
  }
};

export const demoteUser = async (
  jwt,
  userId,
  fetchUsers,
  buttonId,
  setButtonLoading
) => {
  const uri = import.meta.env.VITE_AUTH_ENDPOINT + `/demoteFromAdmin/${userId}`;
  setButtonLoading(buttonId, true);
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
    await fetchUsers();
    const { name, surname } = await getUserById(userId, jwt);
    notifyDemotedUser(`${name} ${surname}`);
    setButtonLoading(buttonId, false);
  } catch (error) {
    setButtonLoading(buttonId, false);
    throw error;
  }
};
