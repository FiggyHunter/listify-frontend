import { useNavigate } from "react-router-dom";
import Navigation from "@/components/shared/Navigation.tsx";
import { Autocomplete, Input, TextField } from "@mui/material";
import CompanyCard from "@/components/dashboard/CompanyCard.tsx";
import SkeletonCompanyCard from "@/components/dashboard/SkeletonCompanyCard.tsx";
import { useEffect, useState } from "react";
import { useJwtStore } from "@/stores/useUserStore.ts";
import { useJwt } from "react-jwt";
import { getAllCompanies } from "@/api/company";
import AddCompanyPopup from "@/components/dashboard/AddCompanyPopup.tsx";
import CompanyFilters from "@/components/dashboard/CompanyFilters.tsx";
import { getAllCountries } from "@/api/country.ts";

const Dashboard = () => {
  const navigate = useNavigate();

  const [isAddCompanyOpen, setIsAddCompanyOpen] = useState(false);
  const { jwt, setJwt } = useJwtStore();
  const token = useJwt(jwt) || null;
  const [companies, setCompanies] = useState([]);
  const [displayedCompanies, setDisplayedCompanies] = useState(companies);
  const [locations, setLocations] = useState([]);
  const [filters, setFilters] = useState({ category: null, location: null });

  function getCurrentDay() {
    const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const currentDate = new Date();
    const dayIndex = currentDate.getDay();

    return daysOfWeek[dayIndex];
  }

  const currentDay = getCurrentDay();

  useEffect(() => {
    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape") setIsAddCompanyOpen(false);
    });
  }, []);

  useEffect(() => {
    getAllCompanies(jwt, setCompanies);
    getAllCountries(jwt, setLocations);
  }, [jwt]);

  useEffect(() => {
    setDisplayedCompanies(companies);
  }, [companies]);

  useEffect(() => {
    if (!filters.category && !filters.location)
      setDisplayedCompanies(companies);
    if (!filters.category && filters.location)
      setDisplayedCompanies(() =>
        companies?.filter((company) => filters.location.includes(company.hq))
      );
    if (filters.category && !filters.location) {
      setDisplayedCompanies(() =>
        companies?.filter((company) => company.group === filters.category)
      );
    }
    if (filters.category && filters.location) {
      setDisplayedCompanies(() =>
        companies
          ?.filter((company) => company.group === filters.category)
          .filter((company) => filters.location.includes(company.hq))
      );
    }
  }, [filters]);

  if (!jwt || jwt === "" || jwt === "noToken" || token.isExpired) {
    navigate("/login");
    return;
  }

  return (
    <>
      {isAddCompanyOpen && (
        <AddCompanyPopup
          locations={locations}
          setIsAddCompanyOpen={setIsAddCompanyOpen}
          jwt={jwt}
        />
      )}
      <Navigation />
      <main className="w-full h-my-screen bg-bkg pt-28">
        <div
          onClick={() => setIsAddCompanyOpen(!isAddCompanyOpen)}
          className="bg-red-500 fixed bottom-4 right-4 text-white grid place-content-center text-3xl rounded-3xl h-12 w-12 md:hidden"
        >
          +
        </div>
        <div className="mx-auto w-4/5">
          <section className="flex flex-col gap-2 mb-6 text-content">
            <h1 className="sm:text-center sm:text-3xl md:text-5xl md:text-right font-bold">
              Good afternoon {token.decodedToken ? token.decodedToken.name : ""}
              .
            </h1>
            <h2 className="sm:text-center md:text-right">
              It's{" "}
              {`${new Date().getHours()}:${
                new Date().getMinutes() > 0 && new Date().getMinutes() < 10
                  ? `0${new Date().getMinutes()}`
                  : new Date().getMinutes()
              }`}{" "}
              on a {currentDay}
            </h2>
            <div className="flex flex-col gap-2 sm:flex md:hidden lg:hidden">
              <Autocomplete
                multiple
                id="tags-outlined"
                options={locations}
                getOptionLabel={(option) => option}
                filterSelectedOptions
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Category"
                    placeholder="Start typing a location"
                  />
                )}
              />
              <Autocomplete
                multiple
                id="tags-outlined"
                options={locations}
                getOptionLabel={(option) => option}
                filterSelectedOptions
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Locations"
                    placeholder="Start typing a location"
                  />
                )}
              />{" "}
              <button className="mx-auto w-full my-auto bg-crimson font-bold hover:bg-crimsonHover transition-all duration-200">
                CLEAR FILTERS
              </button>{" "}
            </div>
          </section>
          <section className="grid sm:block md:grid lg:grid custom-cols-dash gap-8">
            <div className="sticky top-24 h-fit">
              <button
                onClick={() => setIsAddCompanyOpen(!isAddCompanyOpen)}
                className="mx-auto w-full mb-4 w-5/6 my-auto bg-crimson hover:bg-crimsonHover transition-all duration-200 sm:hidden md:block lg:block"
              >
                ADD A COMPANY
              </button>{" "}
              <CompanyFilters setFilters={setFilters} locations={locations} />
            </div>

            <section className="min-h-96 bg-bkgContrast rounded-2xl flex flex-col py-6 mb-6 gap-12 sm:w-full md:w-auto lg:w-auto">
              {Object.entries(companies).length === 0 ? (
                <>
                  <SkeletonCompanyCard /> <SkeletonCompanyCard />{" "}
                  <SkeletonCompanyCard /> <SkeletonCompanyCard />{" "}
                  <SkeletonCompanyCard />
                </>
              ) : (
                displayedCompanies?.map((company) => (
                  <CompanyCard navigate={navigate} company={company} />
                ))
              )}
            </section>
          </section>
        </div>
      </main>
    </>
  );
};

export default Dashboard;
