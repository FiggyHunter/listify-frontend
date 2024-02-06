import { getAllCompanies } from "@/api/company";
import { getAllUsers } from "@/api/user";
import AccessRequest from "@/components/admin/AccessRequest";
import AdminCompany from "@/components/admin/AdminCompany";
import Navigation from "@/components/shared/Navigation";
import adminNavigationGuard from "@/hooks/adminNavigationGuard";
import { useJwtStore } from "@/stores/useUserStore";
import { useEffect, useState } from "react";
import { useJwt } from "react-jwt";
import { useNavigate } from "react-router-dom";

const Admin = () => {
  const { jwt, setJwt } = useJwtStore();
  const [users, setUsers] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [focusedTab, setFocusedTab] = useState("users");
  const { token } = adminNavigationGuard() || null;
  console.log(token);
  const fetchUsers = async () => {
    try {
      const userData = await getAllUsers(jwt);
      setUsers(userData);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const fetchCompanies = async () => {
    try {
      await getAllCompanies(jwt, setCompanies);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchCompanies();
  }, [jwt]);

  return (
    <>
      <Navigation />

      <main className="sm:w-5/5 lg:w-4/5 mx-auto min-h-96 mt-28 gap-10 grid pb-4">
        <section className="bg-bkgContrast w-4/5 mx-auto min-h-96 rounded-3xl shadow-md">
          <h2 className="text-content text-2xl w-full mx-auto sm:text-md lg:text-2xl pt-4 pb-8 px-8 font-bold flex flex-col">
            Access Requests
          </h2>{" "}
          <article className="flex flex-col gap-4 pb-8 ">
            {users.map((user) => {
              if (!user.isAdmitted) return <AccessRequest user={user} />;
            })}
          </article>{" "}
        </section>
        <section className="bg-bkgContrast w-4/5 mx-auto min-h-96 rounded-tr-xl bg-gray-300 mb-20 ">
          <div
            className={`flex ${
              focusedTab !== "companies" ? "bg-gray-300" : "bg-white"
            } `}
          >
            <div className="flex justify-between w-full">
              {" "}
              <button
                onClick={() => setFocusedTab("users")}
                className={`text-content sm:text-md lg:text-2xl p-4 font-bold whitespace-nowrap ${
                  focusedTab !== "companies"
                    ? "bg-white w-full  rounded-br-none rounded-tr-3xl "
                    : "bg-gray-300 w-max  rounded-tr-3xl  "
                }  bg-bkgContrast text-left rounded-tl-none rounded-bl-none `}
              >
                List of Users
              </button>{" "}
              <button
                onClick={() => setFocusedTab("companies")}
                className={`text-content sm:text-md lg:text-2xl min-w-max text-right ${
                  focusedTab === "companies"
                    ? "bg-white w-full rounded-tr-none rounded-br-none rounded-tl-none rounded-bl-3xl"
                    : "bg-gray-300 w-fill"
                }  rounded-tr-3xl p-4 font-bold relative overflow-hidden`}
              >
                List of Companies
              </button>
            </div>
          </div>
          <article
            className={`bg-bkgContrast ${
              focusedTab !== "companies" ? "rounded-tr-2xl" : ""
            }`}
          >
            {" "}
            <article className="flex flex-col gap-4 pb-8">
              {focusedTab === "users" &&
                users.map((user) => {
                  if (user.isAdmitted) return <AccessRequest user={user} />;
                })}
              {focusedTab === "companies" &&
                companies.map((company) => {
                  return <AdminCompany company={company} />;
                })}
            </article>{" "}
          </article>
        </section>
      </main>
    </>
  );
};

export default Admin;
