import { useDarkModeStore } from "@/stores/useUserStore";
import { useNavigate } from "react-router-dom";
import DarkModeToggle from "./DarkModeToggle";
import { useEffect, useState } from "react";
import { handleScroll } from "@/utilities/HandleScroll";

const Navigation = () => {
  const navigate = useNavigate();

  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const handleScrollListener = () =>
    handleScroll(setShow, lastScrollY, setLastScrollY);

  useEffect(() => {
    window.addEventListener("scroll", handleScrollListener);
    return () => {
      window.removeEventListener("scroll", handleScrollListener);
    };
  }, [lastScrollY]);

  return (
    <header className="pt-4 mx-auto w-4/5 ">
      <nav
        className={`sm:gap-2 md:gap-0 w-4/5 ${
          !show ? "-top-16" : "top-3"
        }  fixed  rounded-xl bg-bkgContrast py-2 flex items-center `}
      >
        <img
          className="sm:hidden md:block lg:block ml-4 w-36 cursor-pointer"
          src="/logo.svg"
          alt=""
          onClick={() => navigate("/dashboard")}
        />
        <img
          className="sm:block md:hidden lg:hidden ml-4 w-8 cursor-pointer"
          src="/logo-small.svg"
          alt=""
          onClick={() => navigate("/dashboard")}
        />
        <div className="h-full md:ml-auto lg:ml-auto sm:w-full  md:w-1/3  items-center md:mr-4 lg:mr-4 flex flex-row border-darkBlue border-3 rounded-lg bg-transparent overflow-hidden gap-1 focus-within:border-crimsonHover  transition-all duration-250">
          <img className="w-4 ml-2 " src="/magnifying-glass.svg" alt="" />
          <input
            className="inline-block text-black w-full text-md placeholder:font-normal sm:placeholder:text-xsm placeholder:text-sm py-1.5 focus:outline-none bg-bkgContrast "
            placeholder="Search a company here..."
            type="text"
          />
        </div>
        <div className="flex sm:hidden md:flex lg:flex gap-2 mr-4">
          <button
            onClick={() => navigate("/account")}
            className="flex items-center gap-1 bg-darkBlue hover:bg-darkBlueHover transition-colors duration-200 border-none  "
          >
            <svg
              className="fill-white"
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 256 256"
            >
              <path d="M230.92,212c-15.23-26.33-38.7-45.21-66.09-54.16a72,72,0,1,0-73.66,0C63.78,166.78,40.31,185.66,25.08,212a8,8,0,1,0,13.85,8c18.84-32.56,52.14-52,89.07-52s70.23,19.44,89.07,52a8,8,0,1,0,13.85-8ZM72,96a56,56,0,1,1,56,56A56.06,56.06,0,0,1,72,96Z"></path>
            </svg>
            Account
          </button>
          <DarkModeToggle />
        </div>
        <div className="grid-cols-2 w-1/3 sm:grid md:hidden lg:hidden place-items-center  ">
          <svg
            className="fill-black"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 256 256"
            onClick={() => navigate("/account")}
          >
            <path d="M230.92,212c-15.23-26.33-38.7-45.21-66.09-54.16a72,72,0,1,0-73.66,0C63.78,166.78,40.31,185.66,25.08,212a8,8,0,1,0,13.85,8c18.84-32.56,52.14-52,89.07-52s70.23,19.44,89.07,52a8,8,0,1,0,13.85-8ZM72,96a56,56,0,1,1,56,56A56.06,56.06,0,0,1,72,96Z"></path>
          </svg>
          <DarkModeToggle />
        </div>
      </nav>
    </header>
  );
};

export default Navigation;
