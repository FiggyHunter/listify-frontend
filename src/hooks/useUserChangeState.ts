import { updateUserData } from "@/api/user";
import { useButtonLoadingStore } from "@/stores/useButtonLoadingStore";
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
      // await loginValidation(loginFormData, setLoginErrors);
      // const token = await logInUser(loginFormData);
      // await setJwt(token);
      // navigate("/dashboard");
      setButtonLoading(buttonId, false);
    } catch (e) {
      // MOZDA BUDE TREBALO KADA BUDEM CHECKIRAO DA LI JE DOBAR PASSWORD USERU
      //if (e.message === "Validation failed") {
      //   setButtonLoading(buttonId, false);
      // setLoginErrors({
      //     email: "Invalid creditentials",
      //     password: "Invalid creditentials",
      //   });
      //   return;
      // }
    }
  };
  const handleUserPasswordUpdate = async (
    buttonId: string,
    e: React.MouseEvent<HTMLButtonElement>,
    jwt,
    setJwt
  ) => {
    try {
      e.preventDefault();
      setButtonLoading(buttonId, true);
      await updateUser(
        "saveProfileDetails",
        setButtonLoading,
        jwt,
        userUpdatedData,
        setJwt
      );
      // await loginValidation(loginFormData, setLoginErrors);
      // const token = await logInUser(loginFormData);
      // await setJwt(token);
      // navigate("/dashboard");
      setButtonLoading(buttonId, false);
    } catch (e) {
      // MOZDA BUDE TREBALO KADA BUDEM CHECKIRAO DA LI JE DOBAR PASSWORD USERU
      //if (e.message === "Validation failed") {
      //   setButtonLoading(buttonId, false);
      // setLoginErrors({
      //     email: "Invalid creditentials",
      //     password: "Invalid creditentials",
      //   });
      //   return;
      // }
    }
  };

  return {
    userUpdatedData,
    setUserUpdatedData,
    userPasswordData,
    handleUserDataUpdate,
    setUserPasswordData,
    handleChange,
  };
};

export default useUserChangeState;
