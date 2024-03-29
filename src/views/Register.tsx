import { useNavigate } from "react-router-dom";
import RegisterForm from "../components/register/RegisterForm.tsx";
import { useEffect } from "react";
import { useJwtStore } from "@/stores/useUserStore.ts";
import { useJwt } from "react-jwt";
import "react-toastify/dist/ReactToastify.css";
import authorisedNavigationGuard from "@/hooks/authorisedNavigationGuard.ts";

const Register = () => {
  const { jwt, setJwt } = useJwtStore();
  const { token } = authorisedNavigationGuard();
  const navigate = useNavigate();
  document.title = "Listify | Register";
  return (
    <>
      <main className="h-screen w-screen grid items-center bg-bkg">
        <img
          className="place-self-center sm:w-36 md:w-44 lg:w-64"
          src="/logo.svg"
          alt="logo for the app"
        />
        <RegisterForm navigate={navigate} />
        <section className="flex flex-row items-center gap-2 justify-center ">
          <p className="text-content w-max ">Powered by </p>
          <a target="_blank" href="https://skim.ba/">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="21"
              viewBox="0 0 28 21"
              fill="none"
            >
              <rect
                x="16.764"
                y="15.6779"
                width="11.2359"
                height="4.49436"
                className="fill-content"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12.9085 10.2495L3.24874 0.589722L0.0707485 3.76772L6.62758 10.3245L0.0707397 16.8814L3.24873 20.0594L12.9085 10.3996L12.8335 10.3246L12.9085 10.2495Z"
                className="fill-content"
              />
            </svg>
          </a>
        </section>
      </main>
    </>
  );
};

export default Register;
