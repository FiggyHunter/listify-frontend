import { getAllCompanies } from "@/api/company";
import { getAllCountries } from "@/api/country";
import { getAllUsers } from "@/api/user";
import AccessRequest from "@/components/admin/AccessRequest";
import AdminCompany from "@/components/admin/AdminCompany";
import AddCompanyPopup from "@/components/dashboard/AddCompanyPopup";
import Navigation from "@/components/shared/Navigation";
import adminNavigationGuard from "@/hooks/adminNavigationGuard";
import { useJwtStore } from "@/stores/useUserStore";
import { useEffect, useState } from "react";
import { useJwt } from "react-jwt";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";

const Admin = () => {
  const { jwt, setJwt } = useJwtStore();
  const [users, setUsers] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [focusedTab, setFocusedTab] = useState("users");
  const { token } = adminNavigationGuard() || null;
  const [locations, setLocations] = useState([]);
  const [isAddCompanyOpen, setIsAddCompanyOpen] = useState(false);
  const [currentCompany, setCurrentCompany] = useState({});

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

  const handleAdmitUser = (userId) => {
    setUsers((prevUsers) => {
      return prevUsers.map((user) => {
        if (user._id === userId) {
          return { ...user, isAdmitted: true };
        }
        return user;
      });
    });
  };

  useEffect(() => {
    fetchUsers();
    fetchCompanies();
  }, []);
  useEffect(() => {
    getAllCountries(jwt, setLocations);
  }, [jwt]);

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />{" "}
      {isAddCompanyOpen && (
        <AddCompanyPopup
          jwt={jwt}
          locations={locations}
          setIsAddCompanyOpen={setIsAddCompanyOpen}
          currentCompany={currentCompany}
        />
      )}
      <Navigation />
      <main className="sm:w-5/5 lg:w-4/5 mx-auto min-h-96 mt-28 gap-10 grid pb-4">
        <section className="bg-bkgContrast w-4/5 mx-auto min-h-96 rounded-3xl shadow-md">
          <h2 className="text-content text-2xl w-full mx-auto sm:text-md lg:text-2xl pt-4 pb-8 px-8 font-bold flex flex-col">
            Access Requests (
            {document.getElementById("requests")?.childElementCount})
          </h2>{" "}
          <article id={"requests"} className="flex flex-col gap-4 pb-8 ">
            {users.map((user) => {
              if (!user.isAdmitted)
                return (
                  <AccessRequest
                    key={user._id}
                    jwt={jwt}
                    user={user}
                    handleAdmitUser={handleAdmitUser}
                  />
                );
            })}
          </article>{" "}
        </section>
        <section className="bg-bkgContrast w-4/5 mx-auto min-h-96 rounded-tr-xl bg-bkgContrast mb-20 ">
          <div
            className={`flex ${
              focusedTab !== "companies" ? "bg-bkgContrast" : "bg-white"
            } `}
          >
            <div className="flex justify-between w-full pb-8">
              {" "}
              <button
                onClick={() => setFocusedTab("users")}
                className={` sm:text-md lg:text-2xl p-4 font-bold whitespace-nowrap ${
                  focusedTab !== "companies"
                    ? "bg-content text-bkgContrast w-full  rounded-br-none rounded-tr-3xl "
                    : "bg-bkgContrast w-max  rounded-tr-3xl text-content  "
                }   text-left rounded-tl-none rounded-bl-none `}
              >
                List of Users
              </button>{" "}
              <button
                onClick={() => setFocusedTab("companies")}
                className={` sm:text-md lg:text-2xl min-w-max text-right ${
                  focusedTab === "companies"
                    ? "bg-content text-bkgContrast w-full rounded-tr-none rounded-br-none rounded-tl-none rounded-bl-3xl"
                    : "bg-bkgContrast w-fill text-content"
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
                  if (user.isAdmitted)
                    return (
                      <AccessRequest
                        jwt={jwt}
                        user={user}
                        handleAdmitUser={handleAdmitUser}
                      />
                    );
                })}
              {focusedTab === "companies" &&
                companies.map((company) => {
                  return (
                    <AdminCompany
                      jwt={jwt}
                      company={company}
                      setCompanies={setCompanies}
                      setIsCompanyOpen={setIsAddCompanyOpen}
                      setCurrentCompany={setCurrentCompany}
                    />
                  );
                })}
            </article>{" "}
          </article>
        </section>
      </main>
    </>
  );
};

export default Admin;
