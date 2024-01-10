import Navigation from "@/components/shared/Navigation";
import React from "react";

const Account = () => {
  return (
    <>
      <Navigation />
      <div
        onClick={() => {
          // sign out logic
        }}
        className="grid h-screen w-screen place-content-center bg-red-400"
      >
        123
      </div>
    </>
  );
};

export default Account;
