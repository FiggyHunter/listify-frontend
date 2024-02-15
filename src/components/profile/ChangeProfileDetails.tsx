import { getAllCategories } from "@/api/category";
import { updateUser, updateUserPassword } from "@/api/user";
import useUserChangeState from "@/hooks/useUserChangeState";
import { useButtonLoadingStore } from "@/stores/useButtonLoadingStore";
import FormTheme from "@/themes/FormTheme";
import InputTheme from "@/themes/InputTheme";
import { Autocomplete, Input, TextField } from "@mui/material";
import { useEffect, useState } from "react";

const ChangeProfileDetails = ({ setIsChangeModalOpen, jwt, setJwt }) => {
  const [currentTab, setCurrentTab] = useState("profile");
  const [categories, setCategories] = useState([]);
  const {
    userUpdatedData,
    setUserUpdatedData,
    userPasswordData,
    handleChange,
    handleUserDataUpdate,
  } = useUserChangeState();
  const { buttonLoading, setButtonLoading } = useButtonLoadingStore();
  const isLoading = buttonLoading["saveProfileDetails"] || false;

  useEffect(() => {
    getAllCategories(jwt, setCategories);
    const escEvt = window.addEventListener("keydown", (e) => {
      if (e.key === "Escape") setIsChangeModalOpen(false);
    });
    return () => {
      window.removeEventListener("keydown", escEvt);
    };
  }, []);

  return (
    <div
      onClick={() => setIsChangeModalOpen(false)}
      className="grid place-items-center h-my-screen min-w-96 w-full fixed top-0 bg-black bg-opacity-20 z-30"
    >
      <section
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="bg-gray-500 sm:w-5/6  lg:w-1/2 mx-auto rounded-2xl overflow-hidden "
      >
        <div className="flex flex-row">
          <button
            onClick={() => setCurrentTab("profile")}
            className={`${
              currentTab === "profile" ? "bg-white" : "bg-transparent"
            } flex rounded-none   items-center w-1/2 pl-8 rounded-tr-3xl py-3 gap-4`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              fill="#000000"
              viewBox="0 0 256 256"
            >
              <path d="M144,80a8,8,0,0,1,8-8h96a8,8,0,0,1,0,16H152A8,8,0,0,1,144,80Zm104,40H152a8,8,0,0,0,0,16h96a8,8,0,0,0,0-16Zm0,48H176a8,8,0,0,0,0,16h72a8,8,0,0,0,0-16Zm-96.25,22a8,8,0,0,1-5.76,9.74,7.55,7.55,0,0,1-2,.26,8,8,0,0,1-7.75-6c-6.16-23.94-30.34-42-56.25-42s-50.09,18.05-56.25,42a8,8,0,0,1-15.5-4c5.59-21.71,21.84-39.29,42.46-48a48,48,0,1,1,58.58,0C129.91,150.71,146.16,168.29,151.75,190ZM80,136a32,32,0,1,0-32-32A32,32,0,0,0,80,136Z"></path>
            </svg>
            <div className="text-content">Profile Settings</div>
          </button>

          <button
            onClick={() => setCurrentTab("password")}
            className={`${
              currentTab === "password"
                ? "bg-white rounded-bl-3xl"
                : "bg-transparent"
            } w-1/2 bg-transparent rounded-none pl-4 py-3 rounded-bl-2xl  flex items-center gap-3"
            `}
          >
            <div className="">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                fill="#000000"
                viewBox="0 0 256 256"
              >
                <path d="M128,112a28,28,0,0,0-8,54.83V184a8,8,0,0,0,16,0V166.83A28,28,0,0,0,128,112Zm0,40a12,12,0,1,1,12-12A12,12,0,0,1,128,152Zm80-72H176V56a48,48,0,0,0-96,0V80H48A16,16,0,0,0,32,96V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V96A16,16,0,0,0,208,80ZM96,56a32,32,0,0,1,64,0V80H96ZM208,208H48V96H208V208Z"></path>
              </svg>
            </div>
            <div className="text-content">Password Change</div>
          </button>
        </div>
        <div
          className={`${
            currentTab === "password" ? "rounded-tr-none " : "bg-transparent"
          } flex flex-col min-h-48 bg-white rounded-tr-2xl`}
        >
          {currentTab === "profile" && (
            <div className="w-5/6 mx-auto flex flex-col gap-4 py-8 ">
              <TextField
                sx={InputTheme}
                value={userUpdatedData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                fullWidth
                label={"First Name"}
              />
              <TextField
                sx={InputTheme}
                value={userUpdatedData.surname}
                onChange={(e) => handleChange("surname", e.target.value)}
                fullWidth
                label={"Last Name"}
              />
              <Autocomplete
                multiple
                id="tags-outlined"
                options={categories}
                getOptionLabel={(option) => option.name}
                onChange={(_, selectedOptions) => {
                  console.log(selectedOptions);
                  const selectedSkills = selectedOptions.map(
                    (location) => location.name
                  );
                  const selectedSkillsIds = selectedOptions.map(
                    (skill) => skill._id
                  );

                  console.log(selectedSkills);

                  setUserUpdatedData((prevValue) => ({
                    ...prevValue,
                    skills: selectedSkills,
                    skillsIds: selectedSkillsIds,
                  }));
                }}
                value={categories.filter((skill) =>
                  userUpdatedData?.skills?.includes(skill.name)
                )}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Skills"
                    placeholder="Start typing a skill"
                  />
                )}
              />
            </div>
          )}

          {currentTab === "password" && (
            <div className={`w-5/6 mx-auto flex flex-col gap-4 py-8 `}>
              <TextField
                sx={InputTheme}
                type="password"
                fullWidth
                label={"Current Password"}
                onChange={(e) => handleChange("oldPassword", e.target.value)}
              />
              <TextField
                sx={InputTheme}
                type="password"
                fullWidth
                label={"New Password"}
                onChange={(e) => handleChange("newPassword", e.target.value)}
              />
              <TextField
                sx={InputTheme}
                type="password"
                fullWidth
                label={"Repeat Password"}
                onChange={(e) => handleChange("repeatPassword", e.target.value)}
              />
            </div>
          )}
        </div>
        <div className=" pb-4 bg-white gap-3 ">
          <div className="w-5/6 mx-auto flex flex-row pt-4 gap-3">
            {currentTab === "profile" && (
              <button
                onClick={() =>
                  handleUserDataUpdate(
                    "saveProfileDetails",
                    setButtonLoading,
                    jwt,
                    setJwt
                  )
                }
                className="w-full bg-darkBlue hover:bg-darkBlueHover transition-all duration-150"
              >
                {isLoading ? "Loading" : "SAVE"}
              </button>
            )}

            {currentTab === "password" && (
              <button
                onClick={() =>
                  updateUserPassword(
                    "saveProfileDetails",
                    setButtonLoading,
                    jwt,
                    userPasswordData,
                    setJwt
                  )
                }
                className="w-full bg-darkBlue hover:bg-darkBlueHover transition-all duration-150"
              >
                {isLoading ? "Loading" : "SAVE"}
              </button>
            )}

            <button
              onClick={() => setIsChangeModalOpen(false)}
              className="px-6 text-xl bg-transparent text-content border-3 border-content hover:bg-crimsonHover transition-all duration-200"
            >
              X
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ChangeProfileDetails;
