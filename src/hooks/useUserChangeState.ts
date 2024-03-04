import { updateUserData, updateUserPassword } from "@/api/user";
import { useButtonLoadingStore } from "@/stores/useButtonLoadingStore";
import { changePasswordValidation } from "@/utilities/validators/ChangePasswordValidation";
import { useState } from "react";

const useUserChangeState = () => {
  const { buttonLoading, setButtonLoading } = useButtonLoadingStore();
  const [userUpdatedData, setUserUpdatedData] = useState({
    name: "",
    surname: "",
    skills: [],
    skillsIds: [],
  });

  const [userPasswordData, setUserPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
    repeatPassword: "",
  });

  const [userDataErrors, setUserDataErrors] = useState({});

  const handleChange = (fieldName, value) => {
    if (
      fieldName === "oldPassword" ||
      fieldName === "newPassword" ||
      fieldName === "repeatPassword"
    )
      setUserPasswordData((prevData) => ({
        ...prevData,
        [fieldName]: value,
      }));
    else
      setUserUpdatedData((prevData) => ({
        ...prevData,
        [fieldName]: value,
      }));
  };

  const handleUserDataUpdate = async (
    buttonId: string,
    setButtonLoading,
    jwt,
    setJwt
  ) => {
    try {
      setButtonLoading(buttonId, true);

      await updateUserData(
        buttonId,
        setButtonLoading,
        jwt,
        userUpdatedData,
        setJwt
      );

      setButtonLoading(buttonId, false);
    } catch (e) {
      return;
    }
  };
  const handleUserPasswordUpdate = async (
    buttonId: string,
    setButtonLoading,
    jwt,
    setJwt
  ) => {
    try {
      setButtonLoading(buttonId, true);

      await changePasswordValidation(
        userPasswordData,
        setUserDataErrors,
        buttonId,
        setButtonLoading
      );

      await updateUserPassword(
        "saveProfileDetails",
        setButtonLoading,
        jwt,
        userPasswordData,
        setJwt
      );
      setButtonLoading(buttonId, false);
    } catch (e) {
      return;
    }
  };

  return {
    userUpdatedData,
    setUserUpdatedData,
    userPasswordData,
    handleUserDataUpdate,
    setUserPasswordData,
    handleChange,
    handleUserPasswordUpdate,
    userDataErrors,
  };
};

export default useUserChangeState;
