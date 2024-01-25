import { useLocation, useNavigate } from "react-router-dom";
import DarkModeToggle from "./DarkModeToggle";
import { useEffect, useState } from "react";
import { handleScroll } from "@/utilities/HandleScroll";
import { useJwtStore, useSearchStore } from "@/stores/useUserStore";
import { useJwt } from "react-jwt";

const Navigation = () => {
  const navigate = useNavigate();

  const { jwt, setJwt } = useJwtStore();
  const token = useJwt(jwt);

  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isPopUpShowed, setIsPopUpShowed] = useState(false);
  const location = useLocation();

  const { searchTerm, setSearchTerm } = useSearchStore();

  const handleScrollListener = () =>
    handleScroll(setShow, lastScrollY, setLastScrollY);

  useEffect(() => {
    window.addEventListener("scroll", handleScrollListener);
    return () => {
      window.removeEventListener("scroll", handleScrollListener);
    };
  }, [lastScrollY]);

  useEffect(() => {
    const hidePopup = window.addEventListener("keydown", (e) => {
      if (e.key === "Escape") setIsPopUpShowed(false);
    });
    return () => {
      window.removeEventListener("keydown", hidePopup);
    };
  }, []);

  const handleSearch = (userSearch) => {
    setSearchTerm(userSearch);
  };

  return (
    <header className="pt-4 z-30 mx-auto relative w-4/5  ">
      <nav
        className={`sm:gap-2 md:gap-0 w-4/5 rounded-br-none justify-between ${
          !show ? "-top-96" : "top-3"
        }  fixed  rounded-xl bg-bkgContrast py-2 flex items-center z-30 `}
      >
        <img
          className="sm:hidden md:block lg:block ml-4 w-36 cursor-pointer"
          src="/logo.svg"
          alt=""
          onClick={() => {
            setSearchTerm("");
            navigate("/dashboard");
          }}
        />
        <img
          className="sm:block md:hidden lg:hidden ml-4 w-8 cursor-pointer"
          src="/logo-small.svg"
          alt=""
          onClick={() => navigate("/dashboard")}
        />{" "}
        {location.pathname === "/dashboard" && (
          <div className="h-full md:ml-auto lg:ml-auto sm:w-full  md:w-1/3  items-center md:mr-4 lg:mr-4 flex flex-row border-content border-1 rounded-2xl bg-transparent overflow-hidden gap-1 focus-within:border-crimsonHover  transition-all duration-250">
            <svg
              className="fill-content ml-3"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 256 256"
            >
              <path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"></path>
            </svg>

            <input
              className="inline-block text-black w-full text-md placeholder:font-medium sm:placeholder:text-xsm placeholder:text-sm py-1.5 focus:outline-none bg-bkgContrast "
              placeholder="Search a company here..."
              type="text"
              value={searchTerm}
              onChange={(e) => {
                handleSearch(e.target.value);
              }}
            />
          </div>
        )}
        <div className="flex sm:hidden md:flex lg:flex gap-2 mr-4">
          <button
            onClick={() => setIsPopUpShowed((prevValue) => !prevValue)}
            className=" gap-1 bg-darkBlue hover:bg-darkBlueHover transition-colors duration-200 border-none rounded-full p-2  "
          >
            <svg
              className="fill-white"
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 256 256"
            >
              <path d="M230.92,212c-15.23-26.33-38.7-45.21-66.09-54.16a72,72,0,1,0-73.66,0C63.78,166.78,40.31,185.66,25.08,212a8,8,0,1,0,13.85,8c18.84-32.56,52.14-52,89.07-52s70.23,19.44,89.07,52a8,8,0,1,0,13.85-8ZM72,96a56,56,0,1,1,56,56A56.06,56.06,0,0,1,72,96Z"></path>
            </svg>
          </button>{" "}
          <DarkModeToggle />
        </div>
        <div className="grid-cols-2 w-1/3 sm:grid md:hidden lg:hidden place-items-center  ">
          <button
            onClick={() => setIsPopUpShowed((prevValue) => !prevValue)}
            className=" gap-1  bg-darkBlue hover:bg-darkBlueHover transition-colors duration-200 border-none rounded-full p-2  "
          >
            <svg
              className="fill-white"
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 256 256"
            >
              <path d="M230.92,212c-15.23-26.33-38.7-45.21-66.09-54.16a72,72,0,1,0-73.66,0C63.78,166.78,40.31,185.66,25.08,212a8,8,0,1,0,13.85,8c18.84-32.56,52.14-52,89.07-52s70.23,19.44,89.07,52a8,8,0,1,0,13.85-8ZM72,96a56,56,0,1,1,56,56A56.06,56.06,0,0,1,72,96Z"></path>
            </svg>
          </button>

          <DarkModeToggle />
        </div>{" "}
        {isPopUpShowed && (
          <div
            className={`absolute overflow-hidden -bottom-40 right-0 w-64 h-fit custom-animation bg-popupBkg  rounded-2xl grid custom-rows-2 gap-3 pb-5 ${
              !show ? "-top-36" : "top-14"
            }`}
          >
            <button
              onClick={() => {
                setIsPopUpShowed(false);
              }}
              className="w-max absolute right-0 top-0 px-2 py-1 rounded-bl-xl outline-none focus:outline-none bg-black hover:bg-gray-800 transition-colors duration-150 rounded-br-none rounded-tl-none"
            >
              x
            </button>{" "}
            <p className="text-white font-light mt-4 text-center ">
              leo@test.com
            </p>
            <div className="w-16 h-16 rounded-full bg-slate-50 mt-1 justify-self-center "></div>
            <p className="text-white font-medium text-center">
              Hi, {token?.decodedToken?.name}
            </p>{" "}
            <button className="bg-popupBtn font-medium hover:bg-darkBlueHover transition-colors duration-150 w-4/5 text-white mx-auto">
              Profile Details
            </button>
            <div className="w-4/5 mx-auto flex flex-col gap-1">
              <button className="bg-popupBtn font-medium hover:bg-darkBlueHover transition-colors duration-150 py-1 text-white w-full rounded-b-none">
                Admin Panel
              </button>
              <button
                onClick={() => setJwt("")}
                className="bg-popupBtn font-medium hover:bg-crimsonHover transition-colors duration-150 py-1 text-white w-full rounded-t-none"
              >
                Sign Out
              </button>
            </div>
          </div>
        )}
      </nav>{" "}
    </header>
  );
};

export default Navigation;
