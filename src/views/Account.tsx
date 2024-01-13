import Navigation from "@/components/shared/Navigation";
import { useJwtStore } from "@/stores/useUserStore";
import React from "react";
import { useJwt } from "react-jwt";
import { useNavigate } from "react-router-dom";

const Account = () => {
  const navigate = useNavigate();
  const { jwt, setJwt } = useJwtStore();
  const token = useJwt(jwt) || null;
  if (!jwt || jwt === "" || jwt === "noToken") {
    navigate("/login");
    return;
  }
  return (
    <>
      <Navigation />
      <div
        onClick={() => {
          setJwt("");
        }}
        className="-mt-4 grid h-screen w-screen place-content-center bg-red-400"
      >
        123
      </div>
    </>
  );
};

export default Account;
