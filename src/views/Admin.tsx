import Navigation from "@/components/shared/Navigation";
import { useJwtStore } from "@/stores/useUserStore";
import React from "react";

const Admin = () => {
  const { jwt, setJwt } = useJwtStore();

  return (
    <>
      <Navigation />
      <main className=" w-4/5 mx-auto min-h-96 mt-28 gap-10 grid pb-4">
        <section className=" bg-bkgContrast w-4/5 mx-auto min-h-96 ">
          <h2 className="text-content sm:text-md lg:text-2xl  p-4 font-bold">
            Access Requests
          </h2>
        </section>
        <section className=" bg-bkgContrast w-4/5 mx-auto min-h-96 rounded-tr-xl bg-gray-300 ">
          <div className="flex bg-gray-300">
            <h3 className="text-content sm:text-md lg:text-2xl p-4 font-bold w-full bg-bkgContrast rounded-tr-3xl">
              List of Users
            </h3>{" "}
            <h3 className="text-content sm:text-md lg:text-2xl min-w-max  bg-gray-300 rounded-tr-3xl p-4 font-bold relative overflow-hidden ">
              List of Companies
            </h3>
          </div>
          <article className="min-h-full bg-bkgContrast rounded-tr-2xl "></article>
        </section>
      </main>
    </>
  );
};

export default Admin;
