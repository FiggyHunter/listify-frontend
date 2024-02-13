import { useLocation, useNavigate } from "react-router-dom";
import DarkModeToggle from "./DarkModeToggle";
import { useEffect, useState } from "react";
import { handleScroll } from "@/utilities/HandleScroll";
import { useJwtStore, useSearchStore } from "@/stores/useUserStore";
import { useJwt } from "react-jwt";
import getInitials from "@/utilities/getInitialsFromName";
import CompanySearch from "./CompanySearch";

const Navigation = () => {
  const navigate = useNavigate();

  const { jwt, setJwt } = useJwtStore();
  const token = useJwt(jwt);
  const { searchTerm, setSearchTerm } = useSearchStore();
  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isPopUpShowed, setIsPopUpShowed] = useState(false);
  const location = useLocation();

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

  return (
    <header className="pt-4 z-30 mx-auto relative w-4/5  ">
      <nav
        className={`sm:gap-2 md:gap-0 w-4/5  justify-between gradient-border ${
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
          onClick={() => {
            navigate("/dashboard");
            setSearchTerm("");
          }}
        />
        {location.pathname === "/dashboard" && (
          <div className="sm:hidden md:hidden lg:block w-full">
            <CompanySearch />
          </div>
        )}
        <div className="flex sm:hidden md:flex lg:flex gap-2 mr-4">
          <button
            onClick={() => setIsPopUpShowed((prevValue) => !prevValue)}
            aria-label="User profile icon"
            className="bg-darkBlue hover:bg-darkBlueHover transition-colors duration-200 border-none rounded-full p-2"
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
        </div>
        <div className="w-1/3 sm:flex gap-2 md:hidden lg:hidden place-content-center justify-end mr-4  ">
          <button
            onClick={() => setIsPopUpShowed((prevValue) => !prevValue)}
            className="  bg-darkBlue hover:bg-darkBlueHover transition-colors duration-200 border-none rounded-full grid  p-2 place-items-center"
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
              {token?.decodedToken?.email}
            </p>
            <div className="w-16 h-16 text-black font-black grid place-content-center rounded-full bg-slate-50 mt-1 justify-self-center ">
              {getInitials(
                `${token?.decodedToken?.name} ${token?.decodedToken?.surname}`
              )}
            </div>
            <p className="text-white font-medium text-center">
              Hi, {token?.decodedToken?.name}
            </p>{" "}
            <button
              onClick={() => navigate("/profile")}
              className="bg-popupBtn font-medium hover:bg-darkBlueHover transition-colors duration-150 w-4/5 text-white mx-auto"
            >
              Profile Details
            </button>
            <div className="w-4/5 mx-auto flex flex-col gap-1">
              {token?.decodedToken?.isAdmin === true && (
                <button
                  onClick={() => navigate("/admin")}
                  className="bg-popupBtn font-medium hover:bg-darkBlueHover transition-colors duration-150 py-1 text-white w-full rounded-b-none"
                >
                  Admin Panel
                </button>
              )}

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
