import Navigation from "@/components/shared/Navigation";
import { useJwtStore } from "@/stores/useUserStore";
import React from "react";

const Account = () => {
  const { jwt, setJwt } = useJwtStore();
  return (
    <>
      <Navigation />
      <div
        onClick={() => {
          setJwt("");
        }}
        className="grid h-screen w-screen place-content-center bg-red-400"
      >
        123
      </div>
    </>
  );
};

export default Account;
