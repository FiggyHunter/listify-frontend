import { useNavigate } from "react-router-dom";
import LoginForm from "../components/login/LoginForm.tsx";
import Navigation from "@/components/shared/Navigation.tsx";
import { Autocomplete, Input, TextField } from "@mui/material";
import CompanyCard from "@/components/dashboard/CompanyCard.tsx";
import SkeletonCompanyCard from "@/components/dashboard/SkeletonCompanyCard.tsx";
import sxFormTheme from "@/themes/sxFormTheme.ts";
import { useEffect, useState } from "react";

const Dashboard = () => {
  const navigate = useNavigate();
  const top100Films = [
    { title: "The Shawshank Redemption", year: 1994 },
    { title: "The Godfather", year: 1972 },
    { title: "The Godfather: Part II", year: 1974 },
    { title: "The Dark Knight", year: 2008 },
    { title: "12 Angry Men", year: 1957 },
    { title: "Schindler's List", year: 1993 },
    { title: "Pulp Fiction", year: 1994 },
  ];
  const [isAddCompanyOpen, setIsAddCompanyOpen] = useState(false);

  useEffect(() => {
    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape") setIsAddCompanyOpen(false);
    });
  }, []);

  return (
    <>
      {isAddCompanyOpen && (
        <div
          className={`z-20 h-full w-full fixed top-0 bg-black bg-opacity-80 grid place-items-center`}
        >
          <div className="w-1/3 h-fit bg-bkgContrast grid grid-cols-2 custom-rows px-8 gap-10 rounded-2xl">
            <div className="w-full mx-auto flex justify-between mt-4 border-b-1 pb-2 border-content col-span-2 font-bold text-content">
              <p className="text-xl">ADD A NEW COMPANY</p>
              <svg
                className="fill-content cursor-pointer"
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 256 256"
                onClick={() => setIsAddCompanyOpen(!isAddCompanyOpen)}
              >
                <path d="M205.66,194.34a8,8,0,0,1-11.32,11.32L128,139.31,61.66,205.66a8,8,0,0,1-11.32-11.32L116.69,128,50.34,61.66A8,8,0,0,1,61.66,50.34L128,116.69l66.34-66.35a8,8,0,0,1,11.32,11.32L139.31,128Z"></path>
              </svg>
            </div>{" "}
            <TextField
              className="col-span-2"
              type={"password"}
              label="Password"
              name="password"
              variant="outlined"
              sx={sxFormTheme}
            />{" "}
            <TextField
              className="col-span-2"
              type={"password"}
              label="Password"
              name="password"
              variant="outlined"
              sx={sxFormTheme}
            />{" "}
            <TextField
              className="col-span-2"
              type={"password"}
              label="Password"
              name="password"
              variant="outlined"
              sx={sxFormTheme}
            />{" "}
            <TextField
              className="col-span-1"
              type={"password"}
              label="Password"
              name="password"
              variant="outlined"
              sx={sxFormTheme}
            />{" "}
            <TextField
              className="col-span-1"
              type={"password"}
              label="Password"
              name="password"
              variant="outlined"
              sx={sxFormTheme}
            />{" "}
            <TextField
              className="col-span-2"
              type={"password"}
              label="Password"
              name="password"
              variant="outlined"
              sx={sxFormTheme}
            />{" "}
            <button className="mx-auto w-full col-span-2 mb-8  my-auto bg-crimson hover:bg-crimsonHover transition-all duration-200">
              ADD A COMPANY
            </button>{" "}
          </div>
        </div>
      )}
      <Navigation />
      <main className="w-full h-my-screen bg-bkg pt-28">
        <div className="mx-auto w-4/5">
          <section className="flex flex-col gap-2 mb-6 text-content">
            <h1 className="sm:text-center sm:text-3xl md:text-5xl md:text-right font-bold">
              Good afternoon, Mike.
            </h1>
            <h2 className="sm:text-center md:text-right">
              It's 3PM on a Monday
            </h2>
          </section>
          <section className="grid sm:block md:grid lg:grid custom-cols-dash gap-8">
            <div className="sticky top-24 h-fit">
              <button
                onClick={() => setIsAddCompanyOpen(!isAddCompanyOpen)}
                className="mx-auto w-full mb-4 w-5/6 my-auto bg-crimson hover:bg-crimsonHover transition-all duration-200"
              >
                ADD A COMPANY
              </button>{" "}
              <aside className="min-h-96 h-fit bg-bkgContrast rounded-2xl flex flex-col gap-1 pt-2 sm:hidden md:flex lg:flex">
                {" "}
                <button className="mx-auto w-5/6 bg-darkBlue bg-darkBlue hover:bg-darkBlueHover transition-all duration-200">
                  HIRING
                </button>
                <button className="mx-auto w-5/6 bg-darkBlue bg-darkBlue hover:bg-darkBlueHover transition-all duration-200">
                  INTERVIEW
                </button>
                <button className="mx-auto w-5/6 bg-darkBlue bg-darkBlue hover:bg-darkBlueHover transition-all duration-200">
                  MAN IN THE MIDDLE
                </button>
                <button className="mx-auto w-5/6 bg-darkBlue hover:bg-darkBlueHover transition-all duration-200">
                  PARTNER
                </button>
                <div className="mx-auto mt-4 w-5/6  text-bkg">
                  <Autocomplete
                    multiple
                    id="tags-outlined"
                    options={top100Films}
                    getOptionLabel={(option) => option.title}
                    defaultValue={[top100Films[1]]}
                    filterSelectedOptions
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Locations"
                        placeholder="Start typing a location"
                      />
                    )}
                  />
                </div>
                <button className="mx-auto w-5/6 my-auto bg-crimson hover:bg-crimsonHover transition-all duration-200">
                  CLEAR FILTERS
                </button>{" "}
              </aside>
            </div>

            <section className="min-h-96 bg-bkgContrast rounded-2xl flex flex-col py-6 mb-6 gap-12 sm:w-full md:w-auto lg:w-auto">
              {false ? (
                <>
                  <SkeletonCompanyCard /> <SkeletonCompanyCard />{" "}
                  <SkeletonCompanyCard /> <SkeletonCompanyCard />{" "}
                  <SkeletonCompanyCard />
                </>
              ) : (
                <>
                  {" "}
                  <CompanyCard />
                  <CompanyCard />
                  <CompanyCard />
                  <CompanyCard />
                  <CompanyCard />
                  <CompanyCard />
                  <CompanyCard />
                  <CompanyCard />
                  <CompanyCard />
                  <CompanyCard />
                  <CompanyCard />
                  <CompanyCard />
                </>
              )}
            </section>
          </section>
        </div>
      </main>
    </>
  );
};

export default Dashboard;
