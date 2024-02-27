import { banUser, unbanUser } from "@/api/user";
import LoaderButton from "../shared/LoaderButton";
import { useState } from "react";
import { useButtonLoadingStore } from "@/stores/useButtonLoadingStore";

const BanButton = ({ jwt, user, fetchUsers }) => {
  const { buttonLoading, setButtonLoading } = useButtonLoadingStore();
  const isLoading = buttonLoading[`btn-uban${user._id}`] || false;

  return (
    <button
      onClick={() => {
        user?.isBanned
          ? unbanUser(
              jwt,
              user._id,
              fetchUsers,
              `btn-uban${user._id}`,
              setButtonLoading
            )
          : banUser(
              jwt,
              user._id,
              fetchUsers,
              `btn-uban${user._id}`,
              setButtonLoading
            );
      }}
      className="bg-darkBlue w-fit hover:bg-darkBlueHover transition-all duration-150 font-bold"
    >
      {isLoading ? (
        <LoaderButton />
      ) : user?.isBanned ? (
        "UNBAN USER"
      ) : (
        "BAN USER"
      )}
    </button>
  );
};

export default BanButton;
